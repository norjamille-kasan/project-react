import * as React from "react";
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
    Users2Icon,
} from "lucide-react";

import { NavMain } from "@/Components/nav-main";
import { NavProjects } from "@/Components/nav-projects";
import { NavUser } from "@/Components/nav-user";
import { TeamSwitcher } from "@/Components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/Components/ui/sidebar";
import { Link, usePage } from "@inertiajs/react";
import ApplicationLogo from "./ApplicationLogo";
import { Separator } from "./ui/separator";

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Playground",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "History",
                    url: "#",
                },
                {
                    title: "Starred",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Models",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { url, props: pageProps } = usePage();

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <div className=" px-1 inline-flex items-center font-semibold">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-primary">
                        <ApplicationLogo className="size-6 text-primary mr-2 " />
                    </div>
                    <span className="truncate"> Prodesk</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <NavMain activeUrl={url} />
                {/* <NavProjects projects={data.projects} /> */}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            isActive={url.startsWith("/team-members")}
                            tooltip="Team Members"
                            asChild
                        >
                            <Link
                                href={route("team-members.index", {
                                    team: pageProps.teams.current?.id,
                                })}
                            >
                                <Users2Icon className="h-4 w-4" />
                                <span>Team Members</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <Separator />
                <NavUser user={pageProps.auth.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
