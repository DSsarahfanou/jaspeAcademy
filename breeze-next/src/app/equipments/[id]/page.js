import EquipmentDetails from '/src/components/EquipmentDetails';

export default function EquipmentPage({ params }) {
  return (
    <div>
      <EquipmentDetails id={params.id} />
    </div>
  );
}
