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
import { Head, Link, useForm } from "@inertiajs/react";
import { LoaderCircleIcon } from "lucide-react";
import { FormEventHandler, ReactNode } from "react";

const ProjectCreate = () => {
    const { data, setData, processing, errors, post, reset } = useForm({
        name: "",
    });
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("projects.store"), {
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
                        <BreadcrumbPage>Create</BreadcrumbPage>
                    </BreadcrumbItem>
                </>
            }
        >
            <Head title="Create Project" />
            <div>
                <h1 className="text-xl font-semibold">Create Projects</h1>
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
                <div className="mt-4 ">
                    <Button type="submit" disabled={processing}>
                        {processing && (
                            <LoaderCircleIcon className="animate-spin" />
                        )}
                        Create Project
                    </Button>
                </div>
            </form>
        </AppContent>
    );
};

ProjectCreate.layout = (page: ReactNode) => <AppLayout children={page} />;

export default ProjectCreate;
