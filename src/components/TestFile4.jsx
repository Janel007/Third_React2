import React, { useState } from 'react';

const Paiement = ({ students }) => {
  const [matricule, setMatricule] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Gestion du paiement
  const handlePayment = (event) => {
    event.preventDefault();
    const { montant } = event.target.elements;

    const student = students.find((s) => s.matricule === matricule);

    if (!student) {
      setPaymentStatus("L'élève n'est pas inscrit.");
      return;
    }

    const newPayment = {
      nom: student.name,
      matricule: student.matricule,
      montant: montant.value,
      date: new Date().toLocaleDateString(),
    };

    setPayments([...payments, newPayment]);
    setPaymentStatus('Paiement réussi.');
    montant.value = ''; // Réinitialiser le montant
  };

  // Filtrage des paiements en fonction de la recherche
  const filteredPayments = payments.filter((payment) =>
    payment.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.matricule.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Paiement de la Pension</h2>

      <form onSubmit={handlePayment} className="space-y-4">
        <div>
          <label htmlFor="matricule" className="block text-sm font-medium text-gray-700">Matricule de l'élève</label>
          <input
            id="matricule"
            name="matricule"
            type="text"
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

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

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none"
        >
          Payer la pension
        </button>
      </form>

      {paymentStatus && (
        <p className={`mt-4 text-center text-sm ${paymentStatus.includes('réussi') ? 'text-green-600' : 'text-red-600'}`}>
          {paymentStatus}
        </p>
      )}

      <div className="mt-8">
        <input
          type="text"
          placeholder="Rechercher par nom ou matricule"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {filteredPayments.length > 0 ? (
        <div className="mt-4">
          <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left text-gray-600 font-medium">Nom</th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium">Matricule</th>
                <th className="px-4 py-2 text-left text-gray-600 font-medium">Montant</th>
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
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">Aucun paiement trouvé.</p>
      )}
    </div>
  );
};

export default Paiement;
