export default function CardStat({ title, value, icon, growth, trend }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
      <div className="p-4 bg-gray-100 rounded-full">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-extrabold text-gray-900">{value}</p>

        {/* Affiche la growth SEULEMENT si fournie */}
        {typeof growth === "string" && growth.trim() !== "" && (
          <p
            className={`text-sm mt-1 ${
              trend === "up"
                ? "text-green-600"
                : trend === "down"
                ? "text-red-600"
                : "text-gray-500"
            }`}
          >
            {growth}
          </p>
        )}
      </div>
    </div>
  );
}
