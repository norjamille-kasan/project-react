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
import { Paginated, Project, ProjectLabel, Task } from "@/types/models";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { FormEventHandler, ReactNode, useState } from "react";
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
import { ColorBadge, ColorBadgeVariant } from "@/Components/ColorBadge";
import { EllipsisIcon, PlusIcon } from "lucide-react";
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
import InputError from "@/Components/InputError";
import { format, formatDate } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import SimplePagination from "@/Components/SimplePagination";
import DueDateDisplay from "@/Components/DueDateDisplay";

const TaskCreateModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                <TaskCreateForm taskCreated={() => setIsOpen(false)} />
            </DialogContent>
        </Dialog>
    );
};

const TaskCreateForm = ({ taskCreated }: { taskCreated: () => void }) => {
    const { project_labels, project } =
        usePage<
            PageProps<{ project_labels: ProjectLabel[]; project: Project }>
        >().props;

    const { data, setData, processing, errors, post, reset } = useForm({
        title: "",
        description: "",
        label_id: "",
        status: "todo",
        date_start: "",
        due_date: "",
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("projects.tasks.store", { project }), {
            async: true,
            onSuccess() {
                taskCreated();
                reset();
            },
        });
    };
    return (
        <>
            <form id="form" onSubmit={handleSubmit}>
                <div className="grid gap-4 grid-cols-2">
                    <div className="space-y-1 sm:col-span-2">
                        <Input
                            type="text"
                            value={data.title}
                            placeholder="Title"
                            onChange={(e) => setData("title", e.target.value)}
                        />
                        <InputError message={errors.title} />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                        <Textarea
                            rows={5}
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            placeholder="Description"
                        />
                        <InputError message={errors.description} />
                    </div>
                    <div className="sm:col-span-1">
                        <div
                            className={cn(
                                buttonVariants({ variant: "outline" }),
                                "w-full"
                            )}
                        >
                            <span className="text-sm">Date Start : </span>
                            <input
                                id="due_date"
                                type="date"
                                value={data.date_start}
                                className="w-full bg-transparent  focus:outline-none"
                                onChange={(e) =>
                                    setData("date_start", e.target.value)
                                }
                            />
                        </div>
                        <InputError
                            className="mt-1"
                            message={errors.date_start}
                        />
                    </div>
                    <div className="sm:col-span-1">
                        <div
                            className={cn(
                                buttonVariants({ variant: "outline" }),
                                "w-full"
                            )}
                        >
                            <span className="text-sm">Due Date : </span>
                            <input
                                id="due_date"
                                type="date"
                                value={data.due_date}
                                className="w-full bg-transparent  focus:outline-none"
                                onChange={(e) =>
                                    setData("due_date", e.target.value)
                                }
                            />
                        </div>
                        <InputError
                            className="mt-1"
                            message={errors.due_date}
                        />
                    </div>
                    <div className="space-y-1 sm:col-span-1">
                        <Select
                            value={data.label_id}
                            onValueChange={(e) => setData("label_id", e)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Label" />
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
                                            <span>{project_label.name}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.label_id} />
                    </div>
                    <div className="space-y-1 sm:col-span-1">
                        <Select
                            value={data.status}
                            onValueChange={(e) => setData("status", e)}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {TaskStatuses.map((ts) => (
                                    <SelectItem key={ts.id} value={ts.id}>
                                        <ColorBadge variant={ts.color as any}>
                                            {ts.label}
                                        </ColorBadge>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.status} />
                    </div>
                </div>
                <DialogFooter className="mt-4">
                    <Button type="submit">Create Task</Button>
                </DialogFooter>
            </form>
        </>
    );
};

const TaskIndex = ({
    project,
    tasks,
}: {
    project: Project;
    tasks: Paginated<
        Task & {
            project_label: ProjectLabel;
            status_color: ColorBadgeVariant;
            status_label: string;
        }
    >;
}) => {
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
            <div className="w-full">
                <Table>
                    <TableHeader>
                        <TableRow className="divide-x">
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date Start</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasks.data.map((task, i) => (
                            <TableRow key={task.id} className="divide-x">
                                <TableCell className="font-medium   inline-flex items-center">
                                    <p className=" w-auto">{task.title}</p>
                                    <Badge variant="outline" className="ml-3">
                                        <div
                                            style={{
                                                background: `#${task.project_label.color}`,
                                            }}
                                            className={cn(
                                                "h-3 w-3 rounded-md mr-1"
                                            )}
                                        ></div>
                                        <span>{task.project_label.name}</span>
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <ColorBadge variant={task.status_color}>
                                        {task.status_label}
                                    </ColorBadge>
                                </TableCell>
                                <TableCell>
                                    {task.date_start
                                        ? format(task.date_start!, "MMM d YYY")
                                        : "---"}
                                </TableCell>
                                <TableCell>
                                    <DueDateDisplay dueDate={task.due_date} />
                                </TableCell>
                                <TableCell className="text-right pr-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <EllipsisIcon className="h-4 w-4" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>
                                                My Account
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
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
            </div>
            <div className="mt-4">
                <SimplePagination
                    prevUrl={tasks.prev_page_url}
                    nextUrl={tasks.next_page_url}
                />
            </div>
        </AppContent>
    );
};

TaskIndex.layout = (page: ReactNode) => <AppLayout children={page} />;

export default TaskIndex;
