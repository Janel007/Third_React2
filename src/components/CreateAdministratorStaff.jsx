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
    residence: Yup.string()
        .required('La localisation est requise'),
    phoneNumber: Yup.string()
        .min(9, 'Le numéro doit contenir 9 chiffres')
        .max(9, 'Le numero doit contenir au maximun 9 chiffres')
        .required('Le numéro est requis')
        .matches(/^([26]\d+)$/, 'Le numero doit commencer par 2 ou par 6 et ne doit pas contenir d\'espace'),
    email: Yup.string()
        .required('L\'adresse du parent est requise')
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'L\'adresse mail entrée n\'est pas conforme'),
    role: Yup.string()
        .oneOf(['Secrétaire', 'Libraire', 'Chauffeur', 'Gardien', 'Infirmière'],'Sélectionnez un rôle d\'utilisateur'),
    photo: Yup.mixed()
        .required('Le logo de l\'école est requis')
        .test('fileSize', 'La taille du fichier doit être inférieure à 3MB', value => {
            return value && value.size <= 3145728; // 3MB en octets
        })
});
export default function CreateAdministratorStaff() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        residence: '',
        phoneNumber: '',
        email: '',
        role: '',
        photo: null
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
                residence: '',
                email: '',
                phoneNumber: '',
                role: '',
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
            member.phoneNumber.includes(searchTerm) ||
            member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

return (
    <main className='flex items-center justify-center h-screen'>
        <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
            onClick={() => setIsOpen(true)}
        >
            Ajouter un membre du personnel administratif
        </button>

        {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center overflow-auto">
                <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-56">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Ajouter un membre du personnel administratif</h2>
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
                            <label htmlFor="role" className="block text-gray-700 font-semibold mb-1">
                                Rôle :
                            </label>
                            <select
                                name="role"
                                id="role"
                                value={formData.role}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.role ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500`}
                            >
                                <option value="">Spécifier le rôle de cet utilisateur</option>
                                <option value="Secrétaire">Secrétaire</option>
                                <option value="Libraire">Libraire</option>
                                <option value="Chauffeur">Chauffeur</option>
                                <option value="Gardien">Gardien</option>
                                <option value="Infirmière">Infirmière</option>
                            </select>
                            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
                                Email :
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500`}
                                placeholder="Entrez son adresse mail"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
                                placeholder="Entrez son lieu de résidence"
                            />
                            {errors.residence && <p className="text-red-500 text-sm">{errors.residence}</p>}
                        </div>

                        <div>
                            <label htmlFor="phoneNumber" className="block text-gray-700 font-semibold mb-1">
                                Numéro de téléphone :
                            </label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                id="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500`}
                                placeholder="Entrez son numéro mobile"
                            />
                            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                        </div>

                        <div>
                            <label htmlFor="photo" className="block text-gray-700 font-semibold mb-1">
                                Photo du personnel :
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
                    placeholder="Rechercher par nom, prénom, email, rôle, local ou téléphone"
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
                    <th className="px-4 py-2 text-center">Email</th>
                    <th className="px-4 py-2 text-center">Rôle</th>
                    <th className="px-4 py-2 text-center">Résidence</th>
                    <th className="px-4 py-2 text-center">Téléphone</th>
                    <th className="px-4 py-2 text-center">Profil</th>
                </tr>
                </thead>
                <tbody>
                {filteredMembers.length > 0 ? (
                    filteredMembers.map((member, index) => (
                        <tr key={index} className="border-t">
                            <td className="px-4 py-2 text-center">{member.lastName}</td>
                            <td className="px-4 py-2 text-center">{member.firstName}</td>
                            <td className="px-4 py-2 text-center">{member.email}</td>
                            <td className="px-4 py-2 text-center">{member.role}</td>
                            <td className="px-4 py-2 text-center">{member.residence}</td>
                            <td className="px-4 py-2 text-center">{member.phoneNumber}</td>
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
                            Aucun personnel trouvé pour l'instant ...
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    </main>
    );
}
