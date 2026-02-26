import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Wallet } from "lucide-react"

export function SideBar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center px-4 py-2 flex-row text-justify">
                    <div className="flex items-center justify-center mr-2 bg-green-500 size-8 rounded">
                        <Wallet className="text-white" />
                    </div>
                    <div className="flex items-start flex-col">
                        <div className="text-lg text-black">Easy Money</div>
                        <div className="text-sm text-gray-500">Control your finances</div>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuButton variant="primary" asChild>
                            <a href="#">
                                Dashboard
                            </a>
                        </SidebarMenuButton>
                        <SidebarMenuButton variant="primary" asChild>
                            <a href="#">
                                Transactions
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}