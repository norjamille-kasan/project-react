import { ReactNode, useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { usePage } from "@inertiajs/react";
import { UserJoinedTeam } from "@/types/models";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { CheckIcon, ChevronsUpDownIcon, PlusIcon } from "lucide-react";
export default function AppContent({
    children,
    breadcrumbs,
}: {
    children: ReactNode;
    breadcrumbs?: ReactNode;
}) {
    const { teams } = usePage().props;
    return (
        <>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <BreadcrumbItem className="hidden md:flex items-center">
                                        <ChevronsUpDownIcon className="h-4 w-4" />
                                        <BreadcrumbLink href="#">
                                            {teams.current?.name}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                    align="start"
                                    sideOffset={4}
                                >
                                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                                        Teams
                                    </DropdownMenuLabel>
                                    {teams.list?.map((team, index) => (
                                        <DropdownMenuItem
                                            key={team.name}
                                            className="gap-2 p-2"
                                        >
                                            {team.name}
                                            {team.pivot.is_selected && (
                                                <CheckIcon className="h-4 w-4 ml-auto text-primary" />
                                            )}
                                        </DropdownMenuItem>
                                    ))}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="gap-2 p-2">
                                        <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                            <PlusIcon className="size-4" />
                                        </div>
                                        <div className="font-medium text-muted-foreground">
                                            Add team
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <BreadcrumbSeparator />
                            {breadcrumbs}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="flex flex-1 container flex-col gap-4 p-6 pt-0">
                {children}
            </div>
        </>
    );
}
