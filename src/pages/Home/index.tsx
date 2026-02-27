import { SideBar } from "@/components/SideBar/SideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useUser } from "@/hooks/useAuth";

export function Home() {

    const user = useUser();

    if (!user) {
        return (
            <div>
                <h1>Loading user data...</h1>
            </div>
        );
    }

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