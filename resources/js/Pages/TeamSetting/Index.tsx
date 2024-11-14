import AppContent from "@/Components/AppContent";
import { BreadcrumbItem, BreadcrumbPage } from "@/Components/ui/breadcrumb";
import AppLayout from "@/Layouts/AppLayout";
import { Head, usePage } from "@inertiajs/react";
import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import InformationTabContent from "./Partials/InformationTabContent";
import TabNav from "./Partials/TabNav";
import { AnimatePresence, motion } from "motion/react";
import { SlideUpIn } from "@/lib/motion-presets";

const TeamSettingIndex = () => {
    const { teams } = usePage().props;

    return (
        <AppContent
            breadcrumbs={
                <>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Team Setting</BreadcrumbPage>
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
                activeUrl="/team-setting"
                currentTeamId={teams.current?.id}
            />
            <InformationTabContent />
        </AppContent>
    );
};

TeamSettingIndex.layout = (page: ReactNode) => <AppLayout children={page} />;

export default TeamSettingIndex;
