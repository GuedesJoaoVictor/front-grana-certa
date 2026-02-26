import { SideBar } from "@/components/SideBar/SideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export function Home() {
    return (
        <SidebarProvider>
            <SideBar />
            <main>
                <SidebarTrigger />
                <h1>Home</h1>
            </main>
        </SidebarProvider>
    );
}