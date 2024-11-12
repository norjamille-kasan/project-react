import AppContent from "@/Components/AppContent";
import { BreadcrumbItem, BreadcrumbPage } from "@/Components/ui/breadcrumb";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Separator } from "@/Components/ui/separator";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { EllipsisIcon, PlusIcon, UserPlus2 } from "lucide-react";
import { ReactNode } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import InviteMemberModal from "./Partials/InviteMemberModal";
import { Paginated } from "@/types/models";
import { User } from "@/types";
import { ColorBadge } from "@/Components/ColorBadge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import SimplePagination from "@/Components/SimplePagination";

const MemberIndex = ({
    members,
}: {
    members: Paginated<
        Pick<User, "email" | "id" | "name"> & { is_active: boolean }
    >;
}) => {
    return (
        <AppContent
            breadcrumbs={
                <>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Members</BreadcrumbPage>
                    </BreadcrumbItem>
                </>
            }
        >
            <Head title="Members" />
            <div>
                <h1 className="text-xl font-semibold">Members</h1>
                <p className="text-sm text-muted-foreground">
                    Manage all your team members
                </p>
            </div>
            <div className="flex space-x-2 items-center">
                <Input className="sm:w-80" type="search" />
                <Separator orientation="vertical" />
                <InviteMemberModal />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {members.data.map((member) => (
                        <TableRow key={member.id}>
                            <TableCell className="font-medium">
                                {member.name}
                            </TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>
                                <ColorBadge
                                    variant={
                                        member.is_active ? "success" : "error"
                                    }
                                >
                                    {member.is_active ? "Active" : "Inactive"}
                                </ColorBadge>
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <EllipsisIcon className="h-4 w-4" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="mr-5">
                                        <DropdownMenuItem>
                                            Profile
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Billing
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Team
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Subscription
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="mt-4">
                <SimplePagination
                    prevUrl={members.prev_page_url}
                    nextUrl={members.next_page_url}
                />
            </div>
        </AppContent>
    );
};

MemberIndex.layout = (page: ReactNode) => <AppLayout children={page} />;

export default MemberIndex;
