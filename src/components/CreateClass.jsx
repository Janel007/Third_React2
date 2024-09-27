import React, { useState } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Le nom d\'une classe est obligatoire pour sa création'),
    level: Yup.string()
        .oneOf(['primary', 'secondary'],'Le niveau d\'enseignement de cette classe est requis'),
    option: Yup.string()
        .oneOf(['french', 'english'],'La section de la classe est obligatoire'),
})
export default function CreateYear () {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        level: '',
        option: ''
    });

    const [members, setMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMembers([...members, formData]);
        setFormData({
            name: '',
            level: '',
            option: '',
        });
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
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="flex items-center justify-center h-screen">
            <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
            onClick={() => setIsOpen(true)}
        >
            Ajouter une classe
        </button>
            {isOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center overflow-auto">
                        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Ajouter une classe</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                
                                <div>
                                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
                                        Nom de la classe:
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500`}
                                        placeholder="Attribuez une classe"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="level" className="block text-gray-700 font-medium mb-1">
                                        Niveau d'enseignement :
                                    </label>
                                    <select
                                        id="level"
                                        name="level"
                                        value={formData.level}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 border ${errors.level ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500`}
                                    >
                                        <option value="">Sélectionnez le niveau</option>
                                        <option value="primary">Maternel</option>
                                        <option value="secondary">Primaire</option>
                                    </select>
                                    {errors.level && <p className="text-red-500 text-sm">{errors.level}</p>}
                                </div>

                                <div>
                                    <label htmlFor="option" className="block text-gray-700 font-medium mb-1">
                                        Option :
                                    </label>
                                    <select
                                        id="option"
                                        name="option"
                                        value={formData.option}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 border ${errors.option ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500`}
                                    >
                                        <option value="">Spécifez la section</option>
                                        <option value="french">Francophone</option>
                                        <option value="english">Anglophone</option>
                                    </select>
                                    {errors.option && <p className="text-red-500 text-sm">{errors.option}</p>}
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
                        placeholder="Rechercher une classe par nom, niveau ou section"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg w-full"
                    />
                </div>

                <table className="table-auto w-full mt-6 bg-white shadow-md rounded-lg">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-center">Nom</th>
                        <th className="px-4 py-2 text-center">Niveau d'enseignement</th>
                        <th className="px-4 py-2 text-center">Option</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredMembers.length > 0 ? (
                        filteredMembers.map((member, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-4 py-2 text-center">{member.name}</td>
                                <td className="px-4 py-2 text-center">{member.level}</td>
                                <td className="px-4 py-2 text-center">{member.option}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="px-4 py-2 text-center">
                                Aucune classe trouvée pour l'instant ...
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </main>
    )

}