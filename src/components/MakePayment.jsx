// PaymentForm.js
import React, { useState } from 'react';

export default function MakePayment({ students }) {
    const [paymentData, setPaymentData] = useState({
        student: '',
        amount: '',
    });

    // Gérer le changement des entrées du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData({ ...paymentData, [name]: value });
    };

    // Gérer la soumission du formulaire de paiement
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!students.some((student) => student.name === paymentData.student)) {
            alert('Veuillez inscrire cet élève avant de procéder au paiement.');
            return;
        }
        alert(`Paiement de ${paymentData.amount} pour ${paymentData.student} effectué avec succès !`);
        setPaymentData({
            student: '',
            amount: '',
        });
    };

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Paiement de la pension</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Élève</label>
                    <select
                        name="student"
                        value={paymentData.student}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                    >
                        <option value="">Sélectionnez un élève</option>
                        {students.map((student, index) => (
                            <option key={index} value={student.name}>
                                {student.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Montant</label>
                    <input
                        type="number"
                        name="amount"
                        value={paymentData.amount}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
                >
                    Payer la pension
                </button>
            </form>
        </div>
    );
};
