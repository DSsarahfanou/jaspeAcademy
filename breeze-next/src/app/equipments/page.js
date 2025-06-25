// src/app/equipments/page.js
import Equipment from '/src/components/Equipment';

async function getEquipments() {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!baseUrl) {
    throw new Error('Base URL non définie. Vérifie ton fichier .env.local');
  }

  const res = await fetch(`${baseUrl}/api/equipments`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Erreur lors de la récupération : ${res.status}`);
  }

  const data = await res.json();
  return data.data;
}

export default async function EquipmentsPage() {
  const equipments = await getEquipments();

  return (
    <div >
      <h1 className="mb-6 text-2xl font-bold">Liste des équipements</h1>
      <div className="grid gap-6">
        {equipments.map((equipment) => (
          <Equipment key={equipment.id} equipment={equipment} />
        ))}
      </div>
    </div>
  );
}
