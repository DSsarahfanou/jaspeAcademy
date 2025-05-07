import CardStat from "/src/components/dashboard/CardStat";

export const metadata = {
    title: 'Laravel - Dashboard',
}

const Dashboard = () => {
    return (
        <>
                <h1 className="mb-6 text-2xl font-semibold text-gray-800">Tableau de bord</h1>

                {/* Exemple de composants statistiques */}
                <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
                    <CardStat title="Revenus" value="34 152€" growth="+2.65%" />
                    <CardStat title="Commandes" value="5 643" growth="-0.82%" />
                    <CardStat title="Clients" value="45 254" growth="-6.24%" />
                    <CardStat title="Croissance" value="+12.58%" growth="+10.51%" />
                </div>
        </>
    )
}

export default Dashboard