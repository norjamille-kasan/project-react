import AppContent from "@/Components/AppContent";
import {
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import AppLayout from "@/Layouts/AppLayout";
import { Project } from "@/types/models";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { ReactNode, useState } from "react";

const TaskCreate = ({ project }: { project: Project }) => {
    const { data, setData } = useForm({
        title: "",
        description: "",
    });
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
                        <BreadcrumbLink asChild>
                            <Link
                                href={route("projects.tasks.index", {
                                    project: project.id,
                                })}
                            >
                                Tasks
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Create</BreadcrumbPage>
                    </BreadcrumbItem>
                </>
            }
        >
            <Head title="Create Task" />
            <div>
                <h1 className="text-xl font-semibold">Create Task</h1>
                <p className="text-sm text-muted-foreground"></p>
            </div>
            <form action="">
                <div className="space-y-4">
                    <div className="space-y-1">
                        <Input type="text" placeholder="Title" />
                    </div>
                    <div className="space-y-1">
                        <Textarea rows={10} placeholder="Description" />
                    </div>
                </div>
            </form>
        </AppContent>
    );
};

TaskCreate.layout = (page: ReactNode) => <AppLayout children={page} />;

export default TaskCreate;
