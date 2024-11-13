import AppContent from "@/Components/AppContent";
import { BreadcrumbItem, BreadcrumbPage } from "@/Components/ui/breadcrumb";
import { Button, buttonVariants } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Separator } from "@/Components/ui/separator";
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import {
    CogIcon,
    Edit2Icon,
    ListTodo,
    PlusIcon,
    TrashIcon,
} from "lucide-react";
import { FormEventHandler, ReactNode, useState } from "react";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import InputError from "@/Components/InputError";
import { PageProps } from "@/types";
import { Paginated, Project } from "@/types/models";
import SimplePagination from "@/Components/SimplePagination";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

const ProjectIndex = ({ projects }: { projects: Paginated<Project> }) => {
    const [deletable, setDeletable] = useState<Project | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [deleteInput, setDeleteInput] = useState("");

    const handleDeleteProject = () => {
        router.delete(route("projects.destroy", { project: deletable?.id }), {
            onSuccess() {
                setDeletable(null);
                setDeleting(false);
                setDeleteInput("");
            },
        });
    };
    return (
        <AppContent
            breadcrumbs={
                <>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Projects</BreadcrumbPage>
                    </BreadcrumbItem>
                </>
            }
        >
            <Head title="Projects" />
            <div>
                <h1 className="text-xl font-semibold">Projects</h1>
                <p className="text-sm text-muted-foreground">
                    Manage all your projects
                </p>
            </div>
            <div className="flex space-x-2 items-center">
                <Input className="sm:w-80" type="search" />
                <Separator orientation="vertical" />
                <Link
                    href={route("projects.create")}
                    className={buttonVariants({})}
                >
                    <PlusIcon />
                    New Project
                </Link>
            </div>
            <div>
                {projects.data.length > 0 ? (
                    <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                        {projects.data.map((project) => (
                            <Card key={project.id}>
                                <CardHeader>
                                    <div className="flex items-center">
                                        <CardTitle>{project.name}</CardTitle>
                                        <img
                                            src={`https://api.dicebear.com/9.x/identicon/svg?seed=${project.name}`}
                                            className="size-7 ml-auto -my-2"
                                        />
                                    </div>
                                    <CardDescription>
                                        11 maintainers
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="mr-1"
                                            >
                                                <CogIcon />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start">
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={route(
                                                        "projects.edit",
                                                        {
                                                            project: project.id,
                                                        }
                                                    )}
                                                    preserveScroll
                                                >
                                                    <Edit2Icon />
                                                    Edit
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setDeletable(project);
                                                    setDeleting(true);
                                                }}
                                            >
                                                <TrashIcon />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <Link
                                        href={route("projects.tasks.index", {
                                            project: project.id,
                                        })}
                                        className={buttonVariants({
                                            variant: "secondary",
                                        })}
                                    >
                                        <ListTodo className="h-4 w-4" />
                                        View Tasks
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="mt-3 w-full h-80 flex items-center justify-center">
                        <div className="space-y-3">
                            <h1 className="text-center">No Project Yet</h1>
                            <Link
                                href={route("projects.create")}
                                className={buttonVariants({})}
                            >
                                Create Your First Project
                            </Link>
                        </div>
                    </div>
                )}
                <div className="mt-4">
                    <SimplePagination
                        prevUrl={projects.prev_page_url}
                        nextUrl={projects.next_page_url}
                    />
                </div>
            </div>
            <Dialog open={deleting} onOpenChange={setDeleting}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete this project with the task and remove your
                            data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-1">
                        <Label htmlFor="name">
                            Please enter " {deletable?.name} " to continue
                        </Label>
                        <Input
                            type="search"
                            value={deleteInput}
                            onChange={(e) => setDeleteInput(e.target.value)}
                            className="bg-muted/40"
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={handleDeleteProject}
                            disabled={deleteInput !== deletable?.name}
                            variant="destructive"
                            className="w-full"
                        >
                            I'm sure and continue
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppContent>
    );
};

ProjectIndex.layout = (page: ReactNode) => <AppLayout children={page} />;

export default ProjectIndex;
