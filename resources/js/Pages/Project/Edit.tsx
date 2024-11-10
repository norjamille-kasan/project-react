import AppContent from "@/Components/AppContent";
import InputError from "@/Components/InputError";
import {
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import AppLayout from "@/Layouts/AppLayout";
import { Project } from "@/types/models";
import { Head, Link, useForm } from "@inertiajs/react";
import { spawn } from "child_process";
import { LoaderCircleIcon } from "lucide-react";
import { FormEventHandler, ReactNode } from "react";

const ProjectEdit = ({ project }: { project: Project }) => {
    const { data, setData, processing, errors, put, recentlySuccessful } =
        useForm({
            name: project.name,
        });
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route("projects.update", { project: project.id }), {
            async: true,
        });
    };

    return (
        <AppContent
            breadcrumbs={
                <>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/projects">Projects</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/projects">{project.name}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Edit</BreadcrumbPage>
                    </BreadcrumbItem>
                </>
            }
        >
            <Head title="Edit Project" />
            <div>
                <h1 className="text-xl font-semibold">Edit Projects</h1>
                <p className="text-sm text-muted-foreground">
                    Click save when you're done
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        type="text"
                        className="sm:w-1/2"
                        placeholder="ex. Project A"
                    />
                    <InputError message={errors.name} />
                </div>
                <div className="mt-4 flex items-center">
                    <Button type="submit" disabled={processing}>
                        {processing && (
                            <LoaderCircleIcon className="animate-spin" />
                        )}
                        Save Changes
                    </Button>
                    {recentlySuccessful && (
                        <span className="text-green-600 text-sm ml-2">
                            Changes has been saved!
                        </span>
                    )}
                </div>
            </form>
        </AppContent>
    );
};

ProjectEdit.layout = (page: ReactNode) => <AppLayout children={page} />;

export default ProjectEdit;
