import Navbar from "@/components/shared/navbar";
import Sidebar, { SidebarStateProvider } from "@/components/shared/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full">
      <SidebarStateProvider>
        <Navbar />
        <div className="flex h-[calc(100vh-57px)]">
          <Sidebar />
          <div className="w-full overflow-y-auto px-2 sm:px-8 py-4 ">
            {children}
          </div>
        </div>
      </SidebarStateProvider>
    </div>
  );
}
