import React, { useState } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(9, 'Le nom doit comporter au moins 9 caractères avec "-" ou "/" entre les années')
        .max(9, 'Le nom doit comporter 9 caractères avec "-" ou "/" entre les années')
        .matches(/^\d{4}([-/])\d{4}$/, 'L\'attribution de l\'année scolaire est du type AAAA/AAAA ou AAAA-AAAA' )
        .required('Le nom est requis'),
    dateStart: Yup.date()
        .required('La date de début est requise'),
    dateEnd: Yup.date()
        .required('La date de début est requise'),
    budget: Yup.string()
        .required('Le budget est requis')
});
export default function CreateYear () {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        dateStart: '',
        dateEnd: '',
        budget: ''
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
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMembers([...members, formData]);
        setFormData({
            name: '',
            dateStart: '',
            dateEnd: '',
            budget: '',
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
            member.dateStart.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.dateEnd.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="flex items-center justify-center h-screen">
            <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
                onClick={() => setIsOpen(true)}
            >
                Ajouter une année scolaire
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center overflow-auto">
                <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Ajouter une année scolaire</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
                                Nom :
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500`}
                                placeholder="Spécifiez l'année scolaire"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        <div>
                        <label htmlFor="dateStart" className="block text-gray-700 font-semibold mb-1">
                            Date de début :
                        </label>
                        <input
                            type="date"
                            name="dateStart"
                            id="dateStart"
                            value={formData.dateStart}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border ${errors.dateStart ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500`}
                        />
                        {errors.dateStart && <p className="text-red-500 text-sm">{errors.dateStart}</p>}
                        </div>

                        <div>
                        <label htmlFor="dateEnd" className="block text-gray-700 font-semibold mb-1">
                            Date de fin :
                        </label>
                        <input
                            type="date"
                            name="dateEnd"
                            id="dateEnd"
                            value={formData.dateEnd}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border ${errors.dateEnd ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500`}
                        />
                        {errors.dateEnd && <p className="text-red-500 text-sm">{errors.dateEnd}</p>}
                    </div>

                    <div>
                            <label htmlFor="budget" className="block text-gray-700 font-semibold mb-1">
                                Budget :
                            </label>
                            <input
                                type="text"
                                name="budget"
                                id="budget"
                                value={formData.budget}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border ${errors.budget ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500`}
                                placeholder="Entrez le budget"
                            />
                            {errors.budget && <p className="text-red-500 text-sm">{errors.budget}</p>}
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
                        placeholder="Rechercher par nom, date de début, date de fin ou selon le budget annuel prévu"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg w-full"
                    />
                </div>

                <table className="table-auto w-full mt-6 bg-white shadow-md rounded-lg">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-center">Nom</th>
                        <th className="px-4 py-2 text-center">Date de début</th>
                        <th className="px-4 py-2 text-center">Date de fin</th>
                        <th className="px-4 py-2 text-center">Budget annuel (en Fcfa)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredMembers.length > 0 ? (
                        filteredMembers.map((member, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-4 py-2 text-center">{member.name}</td>
                                <td className="px-4 py-2 text-center">{member.dateStart}</td>
                                <td className="px-4 py-2 text-center">{member.dateEnd}</td>
                                <td className="px-4 py-2 text-center">{member.budget}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="px-4 py-2 text-center">
                                Aucune année scolaire trouvée pour l'instant ...
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </main>
    )

}