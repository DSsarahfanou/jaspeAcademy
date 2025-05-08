export default function CardStat({ title, value, growth }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      <p className="text-sm text-green-600">{growth} depuis la semaine dernière</p>
    </div>
  );
}
