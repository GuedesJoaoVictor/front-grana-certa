import { useLogout, useUserEmail, useUserName } from "@/auth/AuthProvider"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "@/components/ui/sidebar"
import { LogOut, User, Wallet } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

export function SideBar() {

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="px-3 py-3">
                    <div className="flex items-center gap-3 rounded-lg border bg-muted/40 px-3 py-2">
                        <div className="flex size-8 items-center justify-center rounded-md bg-green-600 text-white">
                            <Wallet size={18} />
                        </div>

                        <div className="flex flex-col leading-tight">
                            <span className="font-medium">Easy Money</span>
                            <span className="text-xs text-muted-foreground">
                                Control your finances
                            </span>
                        </div>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <div className="px-3 py-2 text-xs font-medium text-muted-foreground">
                        Platform
                    </div>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild variant="primary">
                                <a href="#">Dashboard</a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild variant="primary">
                                <a href="#">Transactions</a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>
                <div className="p-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex w-full items-center gap-3 rounded-lg border bg-muted/40 px-3 py-2 hover:bg-muted transition cursor-pointer">
                                <div className="flex size-8 items-center justify-center rounded-full bg-primary text-white">
                                    <User size={16} />
                                </div>
                                <div className="flex flex-col text-left leading-tight">
                                    <span className="text-sm font-medium">{useUserName()}</span>
                                    <span className="text-xs text-muted-foreground">{useUserEmail()}</span>
                                </div>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" side="top" className="w-56">
                            <DropdownMenuItem className="text-red-500 focus:text-red-500 cursor-pointer" onClick={useLogout()}>
                                <LogOut className="mr-2 size-4" />
                                Sair
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}