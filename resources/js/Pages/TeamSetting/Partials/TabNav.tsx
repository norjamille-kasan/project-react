import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";

export default function TabNav({
    activeUrl,
    currentTeamId,
}: {
    activeUrl: string;
    currentTeamId?: number;
}) {
    return (
        <div>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                {/* <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                    <option>My Account</option>
                    <option>Company</option>
                    <option selected>Team Members</option>
                    <option>Billing</option>
                </select> */}
            </div>
            <div className="hidden sm:block">
                <div className="border-b border-border">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <Link
                            prefetch
                            cacheFor="10s"
                            href={route("team-setting.index")}
                            className={cn(
                                "whitespace-nowrap border-b-2  px-1 py-4 text-sm font-medium ",
                                activeUrl === "/team-setting"
                                    ? "border-primary"
                                    : "border-transparent text-muted-foreground hover:border-secondary hover:text-foreground/80"
                            )}
                        >
                            Information
                        </Link>
                        {currentTeamId && (
                            <>
                                <Link
                                    href={route("team-members.index", {
                                        team: currentTeamId,
                                    })}
                                    prefetch
                                    cacheFor="10s"
                                    className={cn(
                                        "whitespace-nowrap border-b-2  px-1 py-4 text-sm font-medium ",
                                        activeUrl === "/team-setting/members"
                                            ? "border-primary"
                                            : "border-transparent text-muted-foreground hover:border-secondary hover:text-foreground/80"
                                    )}
                                >
                                    Members
                                </Link>
                                <Link
                                    href={route("team-roles.index", {
                                        team: currentTeamId,
                                    })}
                                    prefetch
                                    cacheFor="10s"
                                    className={cn(
                                        "whitespace-nowrap border-b-2  px-1 py-4 text-sm font-medium ",
                                        activeUrl === "/team-setting/roles"
                                            ? "border-primary"
                                            : "border-transparent text-muted-foreground hover:border-secondary hover:text-foreground/80"
                                    )}
                                >
                                    Roles
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </div>
    );
}
