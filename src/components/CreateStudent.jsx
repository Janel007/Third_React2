import React, { useState } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(3, 'Le prénom doit comporter au moins 3 caractères')
        .matches(/^[a-zA-Z ]+$/, 'Les lettres seules sont demandées')
        .required('Le prénom est requis'),
    lastName: Yup.string()
        .min(3, 'Le nom doit comporter au moins 3 caractères')
        .matches(/^[a-zA-Z ]+$/, 'Les lettres seules sont demandées')
        .required('Le nom est requis'),
    gender: Yup.string()
        .oneOf(['male', 'female', 'other'], 'Le sexe de l\'enfant est obligatoire pour continuer'),
    classe: Yup.string()
        .oneOf(['Petite section', 'Moyenne section', 'Grande section', 'SIL', 'CP', 'CE1', 'CE2', 'CM1', 'CM2',
                'Nursery 1', 'Nursery 2', 'Class 1', 'Class 2', 'Class 3', 'Class 4','Class 5', 'Class 6'],
            'La classe de l\'élève est obligatoire pour continuer'),
    parent: Yup.string()
        .oneOf(['parentx', 'parenty', 'parentz'], 'Le parent de l\'élève est requis pour la suite'),
    birthDate: Yup.date()
        .required('La date de naissance de l\'élève est requise'),
    residence: Yup.string()
        .required('L\'adresse du parent est requise'),
    photo: Yup.mixed()
        .required('Le logo de l\'école est requis')
        .test('fileSize', 'La taille du fichier doit être inférieure à 3MB', value => {
            return value && value.size <= 3145728; // 3MB en octets
        })
});

export default function StudentForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        gender: '',
        residence: '',
        classe: '',
        parent: '',
        photo: null,
    });

    const [members, setMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.photo) {
            const newMember = {
                ...formData,
                photoURL: URL.createObjectURL(formData.photo),
            };
            setMembers([...members, newMember]);
            setFormData({
                firstName: '',
                lastName: '',
                birthDate: '',
                gender: '',
                classe: '',
                residence: '',
                parent: '',
                photo: null,
            });
        }
        try {
            // Validate form data using Yup
            await validationSchema.validate(formData, { abortEarly: false });
            setErrors({}); // Clear errors if validation is successful
            alert('Formulaire soumis avec succès!');
            // Handle form submission (e.g., send data to backend)
        } catch (err) {
            const newErrors = {};
            err.inner.forEach((error) => {
            newErrors[error.path] = error.message;
            });
            setErrors(newErrors); // Set validation errors
        } 
        
        /*
            if (validationSchema === false) {
                setIsOpen(false);
            }
        */
    };

    const filteredMembers = members.filter(
        (member) =>
            member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.residence.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.classe.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.gender.includes(searchTerm)
    );

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <main className="flex items-center justify-center h-screen">
            <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
                onClick={() => setIsOpen(true)}
            >
                Ajouter un élève
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center overflow-auto">
                    <div className="max-w-2xl mx-auto mt-72 p-6 bg-white shadow-lg rounded-lg">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Ajouter un élève</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-1">
                                    Nom :
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500`}
                                    placeholder="Entrez le nom"
                                />
                                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                            </div>

                            <div>
                                <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-1">
                                    Prénom :
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500`}
                                    placeholder="Entrez le prénom"
                                />
                                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                            </div>

                            <div>
                                <label htmlFor="birthDate" className="block text-gray-700 font-semibold mb-1">
                                    Date de naissance :
                                </label>
                                <input
                                    type="date"
                                    name="birthDate"
                                    id="birthDate"
                                    value={formData.birthDate}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border ${errors.birthDate ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500`}
                                />
                                {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate}</p>}
                            </div>

                            <div>
                                <label htmlFor="gender" className="block text-gray-700 font-medium mb-1">
                                    Sexe :
                                </label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500`}
                                >
                                    <option value="">Sélectionnez le sexe</option>
                                    <option value="male">Masculin</option>
                                    <option value="female">Féminin</option>
                                    <option value="other">Autre</option>
                                </select>
                                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                            </div>

                            <div>
                                <label htmlFor="classe" className="block text-gray-700 font-semibold mb-1">
                                    Classe :
                                </label>
                                <select
                                    name="classe"
                                    id="classe"
                                    value={formData.classe}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border ${errors.classe ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500`}
                                >
                                    <optgroup label="Section Francophone"></optgroup>
                                    <option value="Petite section">Petite section</option>
                                    <option value="Moyenne section">Moyenne section</option>
                                    <option value="Grande section">Grande section</option>
                                    <option value="SIL">Sil</option>
                                    <option value="CP">CP</option>
                                    <option value="CE1">CE1</option>
                                    <option value="CE2">CE2</option>
                                    <option value="CM1">CM1</option>
                                    <option value="CM2">CM2</option>
                                    <optgroup label="Section Anglophone"></optgroup>
                                    <option value="Nursery 1">Nursery 1</option>
                                    <option value="Nursery 2">Nursery 2</option>
                                    <option value="Class 1">Class 1</option>
                                    <option value="Class 2">Class 2</option>
                                    <option value="Class 3">Class 3</option>
                                    <option value="Class 4">Class 4</option>
                                    <option value="Class 5">Class 5</option>
                                    <option value="Class 6">Class 6</option>
                                    {/* Options dynamiques basées sur les parents enregistrés */}

                                </select>
                                {errors.classe && <p className="text-red-500 text-sm">{errors.classe}</p>}
                            </div>

                            <div>
                                <label htmlFor="residence" className="block text-gray-700 font-semibold mb-1">
                                    Lieu de résidence :
                                </label>
                                <input
                                    type="text"
                                    name="residence"
                                    id="residence"
                                    value={formData.residence}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border ${errors.residence ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500`}
                                    placeholder="Entrez la résidence"
                                />
                                {errors.residence && <p className="text-red-500 text-sm">{errors.residence}</p>}
                            </div>

                            <div>
                                <p className="block text-gray-700 font-semibold mb-1">Condition physique</p>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="option1"
                                        name="options"
                                        value="Option 1"
                                        checked={selectedOption === 'Option 1'}
                                        onChange={handleOptionChange}
                                        className="form-radio h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                    />
                                    <label htmlFor="option1" className="ml-2 text-gray-700">
                                        Apte
                                    </label>
                                </div>
                                
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="option2"
                                        name="options"
                                        value="Option 2"
                                        checked={selectedOption === 'Option 2'}
                                        onChange={handleOptionChange}
                                        className="form-radio h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                    />
                                    <label htmlFor="option2" className="ml-2 text-gray-700">
                                        Inapte
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="parent" className="block text-gray-700 font-semibold mb-1">
                                    Parent :
                                </label>
                                <select
                                    name="parent"
                                    id="parent"
                                    value={formData.parent}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border ${errors.parent ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500`}
                                >
                                    <option value="">Sélectionnez un parent</option>
                                    <option value="parentx">Parent X</option>
                                    <option value="parenty">Parent Y</option>
                                    <option value="parentz">Parent Z</option>
                                    {/* Options dynamiques basées sur les parents enregistrés */}
                                </select>
                                {errors.parent && <p className="text-red-500 text-sm">{errors.parent}</p>}
                            </div>

                            <div>
                                <label htmlFor="photo" className="block text-gray-700 font-semibold mb-1">
                                    Photo de l'élève :
                                </label>
                                <input
                                    type="file"
                                    name="photo"
                                    id="photo"
                                    onChange={handleFileChange}
                                    className={`w-full px-3 py-2 border ${errors.photo ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500`}
                                    accept="image/*"
                                />
                                {errors.photo && <p className="text-red-500 text-sm">{errors.photo}</p>}
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg mr-2 hover:bg-gray-300 hover:text-gray-600 focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-12 py-2 rounded-lg font-semibold shadow-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                >
                                    Ajouter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="ms-9">
                <div className="mt-8">
                    <input
                        type="text"
                        placeholder="Rechercher par nom, prénom, email, classe, local ou téléphone"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg w-full"
                    />
                </div>

                <table className="table-auto w-full mt-6 bg-white shadow-md rounded-lg">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-center">Nom</th>
                        <th className="px-4 py-2 text-center">Prénom</th>
                        <th className="px-4 py-2 text-center">Sexe</th>
                        <th className="px-4 py-2 text-center">Date de naissance</th>
                        <th className="px-4 py-2 text-center">Classe</th>
                        <th className="px-4 py-2 text-center">Résidence</th>
                        <th className="px-4 py-2 text-center">Profil</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredMembers.length > 0 ? (
                        filteredMembers.map((member, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-4 py-2 text-center">{member.lastName}</td>
                                <td className="px-4 py-2 text-center">{member.firstName}</td>
                                <td className="px-4 py-2 text-center">{member.gender}</td>
                                <td className="px-4 py-2 text-center">{member.birthDate}</td>
                                <td className="px-4 py-2 text-center">{member.classe}</td>
                                <td className="px-4 py-2 text-center">{member.residence}</td>
                                <td className="px-4 py-2 text-center">
                                    <img
                                        src={member.photoURL}
                                        alt="Profile"
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="px-4 py-2 text-center">
                                Aucun enseignant trouvé pour l'instant ...
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
