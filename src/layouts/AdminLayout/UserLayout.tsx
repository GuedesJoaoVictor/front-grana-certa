import { SideBar } from "@/components/SideBar/SideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Dashboard } from "@/pages/Dashboard/Dasboard";
import { Route, Routes } from "react-router-dom";

export function UserLayout() {
    return (
        <SidebarProvider>
        <SideBar type="USER" />
        <main>
          <SidebarTrigger />
        </main>
        <main className="w-full h-screen">
            <Routes>
                <Route index element={<Dashboard/>} />
            </Routes>
        </main>
      </SidebarProvider>
    );
}