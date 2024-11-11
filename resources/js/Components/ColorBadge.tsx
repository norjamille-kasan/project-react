import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center font-medium rounded-md text-xs px-2 py-1 dark:bg-opacity-10 ring-1 ring-inset ring-opacity-25 dark:ring-opacity-25",
    {
        variants: {
            variant: {
                success:
                    "bg-green-50 dark:bg-green-400 text-green-500 dark:text-green-400 ring-green-500 dark:ring-green-400",
                error: "bg-red-50 dark:bg-red-400 text-red-500 dark:text-red-400 ring-red-500 dark:ring-red-400",
                info: "bg-blue-50 dark:bg-blue-400 text-blue-500 dark:text-blue-400 ring-blue-500 dark:ring-blue-400",
                warning:
                    "bg-yellow-50 dark:bg-yellow-400 text-yellow-500 dark:text-yellow-400 ring-yellow-500 dark:ring-yellow-400",
                indigo: "bg-indigo-50 dark:bg-indigo-400 text-indigo-500 dark:text-indigo-400 ring-indigo-500 dark:ring-indigo-400",
                cyan: "bg-cyan-50 dark:bg-cyan-400 text-cyan-500 dark:text-cyan-400 ring-cyan-500 dark:ring-cyan-400",
                rose: "bg-rose-50 dark:bg-rose-400 text-rose-500 dark:text-rose-400 ring-rose-500 dark:ring-rose-400",
                amber: "bg-amber-50 dark:bg-amber-400 text-amber-500 dark:text-amber-400 ring-amber-500 dark:ring-amber-400",
                stone: "bg-stone-50 dark:bg-stone-400 text-stone-500 dark:text-stone-400 ring-stone-500 dark:ring-stone-400",
                slate: "bg-slate-50 dark:bg-slate-400 text-slate-500 dark:text-slate-400 ring-slate-500 dark:ring-slate-400",
                purple: "bg-purple-50 dark:bg-purple-400 text-purple-500 dark:text-purple-400 ring-purple-500 dark:ring-purple-400",
            },
        },
        defaultVariants: {
            variant: "success",
        },
    }
);

export type ColorBadgeVariant = VariantProps<typeof badgeVariants>["variant"];

export interface ColorBadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

function ColorBadge({ className, variant, ...props }: ColorBadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { ColorBadge, badgeVariants };
