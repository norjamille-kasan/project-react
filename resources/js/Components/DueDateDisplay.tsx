import { isToday, isTomorrow, isValid, format } from "date-fns";
export default function DueDateDisplay({
    dueDate,
}: {
    dueDate: string | null;
}) {
    if (!dueDate) {
        return (
            <span className="text-muted-foreground text-xs italic">
                No Due Date
            </span>
        );
    }

    if (!isValid(new Date(dueDate))) {
        return `Invalid Date [${dueDate}]`;
    }

    if (isToday(new Date(dueDate))) {
        return <span className="text-blue-600">Today</span>;
    }

    if (isTomorrow(new Date(dueDate))) {
        return <span className="text-red-600">Tomorrow</span>;
    }

    return (
        <span className="font-semibold">{format(dueDate, "MMM d YYY")}</span>
    );
}
