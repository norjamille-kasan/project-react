import { TaskPriorityLevel } from "@/lib/enums";

type Paginated<T> = {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
};

export type Team = {
    id: number;
    name: string;
    owner_id: number;
    created_at: string | null;
    updated_at: string | null;
};

export type UserJoinedTeam = Team & {
    pivot: {
        id: number;
        user_id: number;
        team_id: number;
        is_selected: boolean;
    };
};

export type Project = {
    id: number;
    created_at: string;
    updated_at: string;
    team_id: number;
    author_id: number;
    name: string;
    status: "active" | string;
};

export type TaskStatusType =
    | "triage"
    | "backlog"
    | "todo"
    | "in_progress"
    | "done"
    | "cancelled";

export type ProjectLabel = {
    id: number;
    created_at: string | null;
    updated_at: string | null;
    project_id?: number | null;
    name: string;
    color: string;
};

export type Task = {
    id: number;
    created_at: string | null; // Use Date if date parsing is handled
    updated_at: string | null;
    project_id: number;
    author_id: number;
    ref: string;
    title: string;
    description?: string | null;
    status: string;
    project_label_id: number;
    date_start: string | null;
    date_end: string | null;
    due_date: string | null;
    status_color: ColorBadgeVariant;
    status_label: string;
    priority_level: TaskPriorityLevel;
};
