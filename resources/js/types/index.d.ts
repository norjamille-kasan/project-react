import { UserJoinedTeam } from "./models";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    current_team_id?: number;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
        timezone: string;
    };
    teams: {
        list?: UserJoinedTeam[];
        current?: UserJoinedTeam;
    };
};
