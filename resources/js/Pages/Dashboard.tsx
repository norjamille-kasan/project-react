import AppContent from "@/Components/AppContent";
import { BreadcrumbItem, BreadcrumbPage } from "@/Components/ui/breadcrumb";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { ReactNode } from "react";

const Dashboard = () => {
    return (
        <AppContent
            breadcrumbs={
                <>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                </>
            }
        >
            <Head title="Dashboard" />
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Necessitatibus reprehenderit iusto repellat, amet fuga quia beatae
            labore soluta mollitia excepturi eos explicabo dolorem laudantium,
            ut culpa aspernatur! Fugiat, vitae numquam.
        </AppContent>
    );
};

Dashboard.layout = (page: ReactNode) => <AppLayout children={page} />;

export default Dashboard;
