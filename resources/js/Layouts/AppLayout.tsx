import { AppSidebar } from "@/Components/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/Components/ui/sidebar";
import { Toaster } from "@/Components/ui/sonner";
import {
    BadgeCheckIcon,
    InfoIcon,
    OctagonXIcon,
    TriangleAlertIcon,
} from "lucide-react";
import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>{children}</SidebarInset>
            <Toaster
                className="font-sans"
                icons={{
                    success: (
                        <BadgeCheckIcon className="text-green-600 h-5 w-5" />
                    ),
                    error: <OctagonXIcon className="text-red-600 h-5 w-5" />,
                    info: <InfoIcon className="text-blue-600 h-5 w-5" />,
                    warning: (
                        <TriangleAlertIcon className="text-yellow-600 h-5 w-5" />
                    ),
                }}
            />
        </SidebarProvider>
    );
}
