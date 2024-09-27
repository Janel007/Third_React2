import React, { useState } from 'react';

const TestFile4 = ({ addStudent }) => {
  const [name, setName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fonction pour générer un matricule unique
  const generateMatricule = () => {
    return `ELV-${Math.floor(100000 + Math.random() * 900000)}`; // Format ELV-123456
  };

  // Gestion de l'inscription
  const handleInscription = (event) => {
    event.preventDefault();

    if (name) {
      const newStudent = {
        name,
        matricule: generateMatricule(),
      };
      addStudent(newStudent);
      setSuccessMessage(`L'élève ${name} a été inscrit avec succès !`);
      setName('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Inscription Élève</h2>
      <form onSubmit={handleInscription} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nom de l'élève
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Inscrire l'élève
        </button>
      </form>

      {successMessage && (
        <p className="mt-4 text-center text-green-600">{successMessage}</p>
      )}
    </div>
  );
};

export default TestFile4;
