'use client';

import Link from 'next/link';

const formations = [
  { id: 1, titre: 'Formation Réseaux', description: 'Apprenez les fondamentaux des réseaux informatiques.' },
  { id: 2, titre: 'Formation Sécurité', description: 'Maîtrisez les bases de la cybersécurité.' },
  { id: 3, titre: 'Formation Linux', description: 'Découvrez l’administration système Linux.' },
];

export default function MesFormationsAnimateur() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-purple-700">Mes Formations</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {formations.map((formation) => (
          <div
            key={formation.id}
            className="bg-white shadow rounded-lg p-5 border-l-4 border-purple-600"
          >
            <h2 className="text-xl font-semibold text-gray-800">{formation.titre}</h2>
            <p className="text-gray-600 mt-2">{formation.description}</p>
            <Link
              href={`/dashboard/animateur/formation/${formation.id}`}
              className="mt-4 inline-block text-purple-700 font-medium hover:underline"
            >
              Voir détails →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
