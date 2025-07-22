export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-red-600">Accès non autorisé</h1>
      <p className="mt-4">Vous n’avez pas la permission d’accéder à cette page.</p>
    </div>
  );
}
