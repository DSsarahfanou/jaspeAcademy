'use client';

import Link from 'next/link';
import Image from 'next/image';

const formations = [
  {
    id: '1',
    titre: 'Introduction aux Réseaux',
    image: '/formations/reseaux.jpg',
    description: 'Découvrez les bases des réseaux informatiques...',
  },
  {
    id: '2',
    titre: 'Sécurité Informatique',
    image: '/formations/securite.jpg',
    description: 'Apprenez à protéger vos systèmes et données...',
  },
  {
    id: '3',
    titre: 'Cloud Computing',
    image: '/formations/cloud.jpg',
    description: 'Comprenez les fondements du cloud computing...',
  },
];

export default function CataloguePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Catalogue de Formations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formations.map((formation) => (
          <div key={formation.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src={formation.image}
              alt={formation.titre}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{formation.titre}</h2>
              <p className="text-gray-600 mb-4">{formation.description}</p>
              <Link
                href={`/dashboard/apprenant/mes-formations/${formation.id}`}
                className="text-blue-600 hover:underline"
              >
                Voir plus
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
