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
