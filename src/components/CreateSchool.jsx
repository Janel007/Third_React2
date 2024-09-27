import React, { useState } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    schoolName: Yup.string()
        .min(3, 'Le nom doit comporter au moins 3 caractères')
        .matches(/^[A-Z ]+$/, 'Les lettres doivent être majuscules')
        .required('Le nom est requis'),
    location: Yup.string()
        .required('La localisation est requise'),
    phoneNumber: Yup.string()
        .min(9, 'Le numéro doit contenir 9 chiffres')
        .max(9, 'Le numero doit contenir au maximun 9 chiffres')
        .required('Le numéro est requis')
        .matches(/^([26]\d+)$/, 'Le numero doit commencer par 2 ou par 6 et ne doit pas contenir d\'espace'),
    logo: Yup.mixed()
        .required('Le logo de l\'école est requis')
        .test('fileSize', 'La taille du fichier doit être inférieure à 3MB', value => {
            return value && value.size <= 3145728; // 3MB en octets
        })
});
export default function CreateSchool() {
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState({
    schoolName: '',
    location: '',
    phoneNumber: '',
    logo: null,
    Motto: '',
});

const [members, setMembers] = useState([]);
const [searchTerm, setSearchTerm] = useState('');

const [errors, setErrors] = useState({});

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};

const handleFileChange = (e) => {
    setFormData({
        ...formData,
        logo: e.target.files[0],
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.logo) {
        const newMember = {
            ...formData,
            logoURL: URL.createObjectURL(formData.logo),
        };
        setMembers([...members, newMember]);
        setFormData({
            SchoolName: '',
            location: '',
            phoneNumber: '',
            Motto: '',
            logo: null,
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
            member.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.Motto.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.phoneNumber.includes(searchTerm)
    );

return (
    <main className="flex items-center justify-center h-screen">
        <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
            onClick={() => setIsOpen(true)}
        >
            Ajouter une école
        </button>

        {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center overflow-auto">
                <div className="max-w-md mx-auto bg-white p-6 mt-10 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Ajouter une école...</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="schoolName" className="block text-gray-700 font-semibold mb-1">
                                Nom d'école
                            </label>
                            <input
                                type="text"
                                id="schoolName"
                                name="schoolName"
                                value={formData.schoolName}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border ${errors.schoolName ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500`} 
                                placeholder="Entrez le nom de l'école ! (en majuscule)"
                            />
                            {errors.schoolName && <p className="text-red-500 text-sm">{errors.schoolName}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="location" className="block text-gray-700 font-semibold mb-1">
                                Localisation
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500`}
                                placeholder="Entrez sa localisation !"
                            />
                            {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="phoneNumber" className="block text-gray-700 font-semibold mb-1">
                                Téléphone
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500`}
                                placeholder='Entrez un numéro de téléphone !'
                            />
                            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="logo" className="block text-gray-700 font-semibold mb-1">
                                Logo 
                            </label>
                            <input
                                type="file"
                                id="logo"
                                name="logo"
                                onChange={handleFileChange}
                                className={`w-full px-3 py-2 border ${errors.Logo ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500`}
                                accept="image/*"
                            />
                            {errors.Logo && <p className="text-red-500 text-sm">{errors.Logo}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="Motto" className="block text-gray-700 font-semibold mb-1">
                                Devise
                            </label>
                            <input
                                type="text"
                                id="Motto"
                                name="Motto"
                                value={formData.Motto}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder='Facultative'
                            />
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

        <div className="ms-16">
            <div className="mt-8">
                <input
                    type="text"
                    placeholder="Rechercher par nom, local ou téléphone"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg w-full"
                />
            </div>

            <table className="table-auto w-full mt-6 bg-white shadow-md rounded-lg">
                <thead>
                <tr className="bg-gray-200">
                    <th className="px-4 py-2 text-center">Nom</th>
                    <th className="px-4 py-2 text-center">Localisation</th>
                    <th className="px-4 py-2 text-center">Numéro de téléphone</th>
                    <th className="px-4 py-2 text-center">Devise</th>
                    <th className="px-4 py-2 text-center">Logo</th>
                </tr>
                </thead>
                <tbody>
                {filteredMembers.length > 0 ? (
                    filteredMembers.map((member, index) => (
                        <tr key={index} className="border-t">
                            <td className="px-4 py-2 text-center">{member.schoolName}</td>
                            <td className="px-4 py-2 text-center">{member.location}</td>
                            <td className="px-4 py-2 text-center">{member.phoneNumber}</td>
                            <td className="px-4 py-2 text-center">{member.Motto}</td>
                            <td className="px-4 py-2 text-center">
                                <img
                                    src={member.logoURL}
                                    alt="Profile"
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="px-4 py-2 text-center">
                            Aucune école trouvée pour l'instant ...
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    
    </main>
    )
}