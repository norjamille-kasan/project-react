import { TaskStatusType } from "@/types/models";
import { CircleDashedIcon } from "lucide-react";

const data = {
    triage: {
        label: "Triage",
        icon: CircleDashedIcon,
        color: "text-muted-foreground",
    },
    backlog: {
        label: "Backlog",
    },
};

export default function TaskStatusBadge({
    status,
    className,
}: {
    status: TaskStatusType;
    className: string;
}) {}
