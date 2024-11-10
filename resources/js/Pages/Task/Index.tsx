import AppContent from "@/Components/AppContent";
import {
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Button, buttonVariants } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Separator } from "@/Components/ui/separator";
import AppLayout from "@/Layouts/AppLayout";
import { Project, ProjectLabel } from "@/types/models";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
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
import { Badge } from "@/Components/ui/badge";
import { ColorBadge } from "@/Components/ColorBadge";
import { PlusIcon } from "lucide-react";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { PageProps } from "@/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { cn } from "@/lib/utils";
import { TaskStatuses } from "@/lib/constants";

const TaskCreateModal = () => {
    const { project_labels } =
        usePage<PageProps<{ project_labels: ProjectLabel[] }>>().props;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon />
                    New Task
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogDescription>
                        Click save when you're done
                    </DialogDescription>
                </DialogHeader>
                <form action="">
                    <div className="grid gap-4 grid-cols-2">
                        <div className="space-y-1 sm:col-span-2">
                            <Label htmlFor="title">Title</Label>
                            <Input type="text" />
                        </div>
                        <div className="space-y-1 sm:col-span-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea rows={5} />
                        </div>
                        <div className="space-y-1 sm:col-span-1">
                            <Label htmlFor="label">Label</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {project_labels.map((project_label) => (
                                        <SelectItem
                                            key={project_label.id}
                                            value={project_label.id.toString()}
                                        >
                                            <div className="flex space-x-2 items-center">
                                                <div
                                                    style={{
                                                        background: `#${project_label.color}`,
                                                    }}
                                                    className={cn(
                                                        "h-3 w-3 rounded-md"
                                                    )}
                                                ></div>
                                                <span>
                                                    {project_label.name}
                                                </span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1 sm:col-span-1">
                            <Label htmlFor="status">Status</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {TaskStatuses.map((ts) => (
                                        <SelectItem key={ts.id} value={ts.id}>
                                            <ColorBadge
                                                variant={ts.color as any}
                                            >
                                                {ts.label}
                                            </ColorBadge>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </form>
                <DialogFooter>
                    <Button>Create Task</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const TaskIndex = ({ project }: { project: Project }) => {
    return (
        <AppContent
            breadcrumbs={
                <>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/projects">{project.name}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Tasks</BreadcrumbPage>
                    </BreadcrumbItem>
                </>
            }
        >
            <Head title="Tasks" />
            <div>
                <h1 className="text-xl font-semibold">Tasks</h1>
                <p className="text-sm text-muted-foreground">
                    Manage all your tasks
                </p>
            </div>
            <div className="flex space-x-2 items-center">
                <Input className="sm:w-80" type="search" />
                <Separator orientation="vertical" />
                <TaskCreateModal />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[...Array(20)].map((e, i) => (
                        <TableRow key={i}>
                            <TableCell className="font-medium">
                                INV001
                            </TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>
                                <ColorBadge>Done</ColorBadge>
                            </TableCell>
                            <TableCell className="text-right">
                                $250.00
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </AppContent>
    );
};

TaskIndex.layout = (page: ReactNode) => <AppLayout children={page} />;

export default TaskIndex;
