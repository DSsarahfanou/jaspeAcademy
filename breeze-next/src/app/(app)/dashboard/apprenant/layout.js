import SidebarApprenant from "/src/components/dashboard/apprenant/Sidebar_app";


export default function ApprenantLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <SidebarApprenant />
      <main className="flex-1 p-4 bg-gray-100">{children}</main>
    </div>
  );
}
