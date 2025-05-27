export default function LatestTransactions() {
    const transactions = [
      { name: "Jean Dupont", amount: "234€", status: "Succès" },
      { name: "Marie Curie", amount: "154€", status: "En attente" },
      { name: "Albert Camus", amount: "99€", status: "Échoué" },
    ];
  
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Dernières transactions</h2>
        <ul className="divide-y">
          {transactions.map((t, i) => (
            <li key={i} className="flex justify-between py-2">
              <span>{t.name}</span>
              <span className="font-medium">{t.amount}</span>
              <span className={`text-sm ${
                t.status === "Succès"
                  ? "text-green-600"
                  : t.status === "En attente"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}>{t.status}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }