import AppContent from "@/Components/AppContent";
import {
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Separator } from "@/Components/ui/separator";
import AppLayout from "@/Layouts/AppLayout";
import { Head, usePage } from "@inertiajs/react";
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
import { Paginated, Role } from "@/types/models";
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
import TabNav from "./Partials/TabNav";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { AnimatePresence, motion } from "motion/react";
import { SlideUpIn } from "@/lib/motion-presets";

const TeamMembers = ({
    members,
    roles,
}: {
    members: Paginated<
        Pick<User, "email" | "id" | "name"> & { is_active: boolean }
    >;
    roles: Role[];
}) => {
    const { teams } = usePage().props;

    return (
        <AppContent
            breadcrumbs={
                <>
                    <BreadcrumbItem>
                        <BreadcrumbLink>Team Setting</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Members</BreadcrumbPage>
                    </BreadcrumbItem>
                </>
            }
        >
            <Head title="Team Setting" />
            <div>
                <h1 className="text-xl font-semibold">Team Setting</h1>
                <p className="text-sm text-muted-foreground">
                    Manage team settings
                </p>
            </div>
            <TabNav
                activeUrl="/team-setting/members"
                currentTeamId={teams.current?.id}
            />
            <AnimatePresence>
                <motion.div
                    variants={SlideUpIn}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Team Members</CardTitle>
                            <CardDescription>
                                Manage team members
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex space-x-2 mb-4 items-center">
                                <Input className="sm:w-80" type="search" />
                                <Separator orientation="vertical" />
                                <InviteMemberModal roles={roles} />
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
                                            <TableCell>
                                                {member.email}
                                            </TableCell>
                                            <TableCell>
                                                <ColorBadge
                                                    variant={
                                                        member.is_active
                                                            ? "success"
                                                            : "error"
                                                    }
                                                >
                                                    {member.is_active
                                                        ? "Active"
                                                        : "Inactive"}
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
                        </CardContent>
                        {members.prev_page_url ||
                            (members.next_page_url && (
                                <CardFooter>
                                    <SimplePagination
                                        prevUrl={members.prev_page_url}
                                        nextUrl={members.next_page_url}
                                    />
                                </CardFooter>
                            ))}
                    </Card>
                </motion.div>
            </AnimatePresence>
        </AppContent>
    );
};

TeamMembers.layout = (page: ReactNode) => <AppLayout children={page} />;

export default TeamMembers;
