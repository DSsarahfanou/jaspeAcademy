import SidebarFormateur from "/src/components/dashboard/animateur/Sidebar_ani";

export default function AnimateurLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <SidebarFormateur/>
      <main className="flex-1 p-4 bg-gray-100">{children}</main>
    </div>
  );
}
