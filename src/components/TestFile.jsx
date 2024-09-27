import React, { useState } from 'react';

export default function TestFile () {
  const [matricule, setMatricule] = useState('');
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  // Fonction pour générer un matricule unique
  const generateMatricule = () => {
    const randomMatricule = `ELV-${Math.floor(100000 + Math.random() * 900000)}`; // Format ELV-123456
    setMatricule(randomMatricule);
  };

  // Fonction de gestion du paiement
  const handlePayment = (event) => {
    event.preventDefault();
    const { nom, montant } = event.target.elements;

    if (!matricule) {
      setPaymentStatus("L'élève doit d'abord être inscrit.");
      return;
    }

    const paymentData = {
      nom: nom.value,
      matricule: matricule,
      montant: montant.value,
      date: new Date().toLocaleDateString(),
    };

    // Enregistrer les données du paiement dans le tableau
    setPayments([...payments, paymentData]);

    // Réinitialiser le formulaire
    nom.value = '';
    montant.value = '';
    setMatricule('');
    setPaymentStatus('Paiement réussi et enregistré.');
  };

  // Fonction de filtrage par barre de recherche
  const filteredPayments = payments.filter((payment) =>
    payment.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.matricule.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Paiement de la Pension</h2>

        <form onSubmit={handlePayment} className="space-y-4">
          {/* Champ de Nom */}
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom de l'élève</label>
            <input
              id="nom"
              name="nom"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Bouton pour générer un matricule */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Élève déjà inscrit ?</label>
            <button
              type="button"
              onClick={generateMatricule}
              className="mt-1 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none"
            >
              Générer un matricule
            </button>
            {matricule && (
              <p className="text-green-600 mt-2">Matricule généré : <strong>{matricule}</strong></p>
            )}
          </div>

          {/* Champ de Montant */}
          <div>
            <label htmlFor="montant" className="block text-sm font-medium text-gray-700">Montant de la pension (en FCFA)</label>
            <input
              id="montant"
              name="montant"
              type="number"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none"
          >
            Payer la pension
          </button>
        </form>

        {/* Message de statut du paiement */}
        {paymentStatus && (
          <p className={`mt-4 text-center text-sm ${paymentStatus.includes('réussi') ? 'text-green-600' : 'text-red-600'}`}>
            {paymentStatus}
          </p>
        )}
      </div>

      {/* Barre de recherche */}
      <div className="mt-8">
        <input
          type="text"
          placeholder="Rechercher par nom ou matricule"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Tableau des paiements */}
      <div className="mt-4">
        {filteredPayments.length > 0 ? (
          <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left text-gray-600 font-medium">Nom</th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium">Matricule</th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium">Montant (FCFA)</th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{payment.nom}</td>
                  <td className="px-4 py-2">{payment.matricule}</td>
                  <td className="px-4 py-2">{payment.montant}</td>
                  <td className="px-4 py-2">{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 mt-4">Aucun paiement trouvé.</p>
        )}
      </div>
    </div>
  );
};

