import AppContent from "@/Components/AppContent";
import { BreadcrumbItem, BreadcrumbPage } from "@/Components/ui/breadcrumb";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Separator } from "@/Components/ui/separator";
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { ArrowLeft, ArrowRight, ListTodo, PlusIcon } from "lucide-react";
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

const CreateProjectModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data, setData, processing, errors, post, reset } = useForm({
        name: "",
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("projects.store"), {
            async: true,
            onSuccess() {
                setIsOpen(false);
                reset();
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon className="h-4 w-4" />
                    New Project
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Project</DialogTitle>
                    <DialogDescription>
                        Click save when you're done
                    </DialogDescription>
                </DialogHeader>
                <form id="form" onSubmit={handleSubmit}>
                    <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="ex. Project A"
                        />
                        <InputError message={errors.name} />
                    </div>
                </form>
                <DialogFooter>
                    <Button type="submit" form="form" disabled={processing}>
                        Create Project
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const ProjectList = () => {
    const { projects } = usePage<
        PageProps<{
            projects: Paginated<Project>;
        }>
    >().props;

    return (
        <div>
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
                            <CardDescription>11 maintainers</CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button variant="secondary">
                                <ListTodo className="h-4 w-4" />
                                View Tasks
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <div className="mt-4">
                <SimplePagination
                    prevUrl={projects.prev_page_url}
                    nextUrl={projects.next_page_url}
                />
            </div>
        </div>
    );
};

const ProjectIndex = () => {
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
                <CreateProjectModal />
            </div>
            <ProjectList />
        </AppContent>
    );
};

ProjectIndex.layout = (page: ReactNode) => <AppLayout children={page} />;

export default ProjectIndex;
