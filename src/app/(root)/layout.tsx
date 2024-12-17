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
        <div className="flex h-[calc(100vh-60px)]">
          <Sidebar />
          <div>{children}</div>
        </div>
      </SidebarStateProvider>
    </div>
  );
}
