import {
    ChevronRight,
    FolderGitIcon,
    HomeIcon,
    User2Icon,
    UsersRoundIcon,
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

export function NavSecondary({ activeUrl }: { activeUrl: string }) {
    return (
        <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        isActive={activeUrl.startsWith("/team-setting")}
                        tooltip="Team"
                        asChild
                    >
                        <Link href="/team-setting">
                            <UsersRoundIcon className="h-4 w-4" />
                            <span>Team Setting</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
}
