import AppContent from "@/Components/AppContent";
import {
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import AppLayout from "@/Layouts/AppLayout";
import { Head, usePage } from "@inertiajs/react";
import { ReactNode } from "react";
import TabNav from "./Partials/TabNav";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import CreateTeamRoleModal from "./Partials/CreateTeamRoleModal";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { PageProps } from "@/types";
import { Permission, Role } from "@/types/models";

const TeamRoles = ({
    teams,
    permissions,
    roles,
}: PageProps<{ permissions: Permission[]; roles: Role[] }>) => {
    return (
        <AppContent
            breadcrumbs={
                <>
                    <BreadcrumbItem>
                        <BreadcrumbLink>Team Setting</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Roles</BreadcrumbPage>
                    </BreadcrumbItem>
                </>
            }
        >
            <Head title="Roles and Permissions" />
            <div>
                <h1 className="text-xl font-semibold">Team Setting</h1>
                <p className="text-sm text-muted-foreground">
                    Manage team settings
                </p>
            </div>
            <TabNav
                activeUrl="/team-setting/roles"
                currentTeamId={teams.current?.id}
            />
            <Card className="ring-4 ring-secondary">
                <CardHeader>
                    <CardTitle>Team Roles</CardTitle>
                    <CardDescription>
                        Manage team roles and permissions
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <CreateTeamRoleModal
                            permissions={permissions}
                            currentTeamId={teams.current?.id}
                        />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="text-right"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roles.map((role) => (
                                <TableRow key={role.id}>
                                    <TableCell className="font-medium">
                                        {role.name}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        $250.00
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </AppContent>
    );
};

TeamRoles.layout = (page: ReactNode) => <AppLayout children={page} />;

export default TeamRoles;
