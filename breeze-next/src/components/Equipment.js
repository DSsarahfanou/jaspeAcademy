  // File: src/components/Equipment.js
  import Link from 'next/link'

  const Equipment = ({ equipment }) => {
    return (
      <div className="p-4 border rounded shadow">
        <h2 className="mb-2 text-xl font-bold">{equipment.name}</h2>
        <p>{equipment.status ? 'Disponible' : 'Indisponible'}</p>
        <Link href={`/equipments/${equipment.id}`} className="inline-block mt-2 text-blue-500 underline">
          Lire plus
        </Link>
      </div>
    );
  }

  export default Equipment