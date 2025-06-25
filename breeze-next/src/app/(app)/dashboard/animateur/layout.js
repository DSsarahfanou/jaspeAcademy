import SidebarFormateur from "/src/components/dashboard/animateur/Sidebar_ani";

export default function AnimateurLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <div className="sticky top-0 flex flex-col max-h-screen space-y-4 overflow-y-auto shadow p-4ounded">
        <SidebarFormateur/>
      </div>

      <main className="flex-1 p-4 bg-gray-100 mt-24">{children}</main>
    </div>
  );
}
