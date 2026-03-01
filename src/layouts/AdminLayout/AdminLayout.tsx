import { SideBar } from "@/components/SideBar/SideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminDashboard } from "@/pages/AdminDashboard/AdminDashboard";
import { Route, Routes } from "react-router-dom";

export function AdminLayout() {
    return (
      <SidebarProvider>
        <SideBar />
        <main>
          <SidebarTrigger />
        </main>
        <main className="w-full h-screen">
            <Routes>
                <Route index element={<AdminDashboard />} />
            </Routes>
        </main>
      </SidebarProvider>
    );
}