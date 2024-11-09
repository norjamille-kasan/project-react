import {
    ChevronRight,
    FolderGitIcon,
    HomeIcon,
    type LucideIcon,
} from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/Components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/Components/ui/sidebar";
import { url } from "inspector";
import { Link } from "@inertiajs/react";

export function NavMain({ activeUrl }: { activeUrl: string }) {
    return (
        <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        isActive={activeUrl.startsWith("/dashboard")}
                        tooltip="Dashboard"
                        asChild
                    >
                        <Link href="/dashboard">
                            <HomeIcon className="h-4 w-4" />
                            <span>Dashboard</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        isActive={activeUrl.startsWith("/projects")}
                        tooltip="Projects"
                        asChild
                    >
                        <Link href="/projects">
                            <FolderGitIcon className="h-4 w-4" />
                            <span>Projects</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
}
