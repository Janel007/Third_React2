import React, {useState} from 'react';
import './style.css'

import MakeRegistration from "./components/MakeRegistration.jsx";
import MakePayment from "./components/MakePayment.jsx";
import TestFile from "./components/TestFile.jsx";

import TestFile3 from "./components/TestFile3.jsx";
import TestFile4 from "./components/TestFile4.jsx";

export default function App() {

    /*
    const [students, setStudents] = useState([]);

    // Fonction pour ajouter un élève
    const addStudent = (newStudent) => {
        setStudents([...students, newStudent]);
    };
    */
    

    
    const [students, setStudents] = useState([]);

  // Ajouter un nouvel élève inscrit à la liste
    const addStudent = (student) => {
        setStudents([...students, student]);
    };
    

  return (
    <> 
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Gestion des élèves et paiement des pensions</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Formulaire d'inscription d'un élève */}
                <MakeRegistration addStudent={addStudent} />

                {/* Formulaire de paiement de la pension */}
                <MakePayment students={students} />
            </div>

            {/* Liste des élèves inscrits */}
            <div className="mt-8">                    
                <h2 className="text-2xl font-semibold mb-4">Élèves inscrits</h2>
                <table className="table-auto w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Nom</th>
                            <th className="px-4 py-2">Âge</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map((student, index) => (
                                <tr key={index} className="border-t">
                                    <td className="px-4 py-2">{student.name}</td>
                                    <td className="px-4 py-2">{student.age}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="px-4 py-2 text-center">
                                    Aucun élève inscrit
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

        <TestFile />

        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold text-center mb-8">Gestion des Inscriptions et Paiements</h1>

            {/* Composant Inscription */}
            <TestFile3 addStudent={addStudent} />

            {/* Composant Paiement */}
            <TestFile4 students={students} />
        </div>
    </>
  );
}
