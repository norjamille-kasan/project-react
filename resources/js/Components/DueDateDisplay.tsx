import { isToday, isTomorrow, isValid, format } from "date-fns";
export default function DueDateDisplay({
    dueDate,
}: {
    dueDate: string | null;
}) {
    if (!dueDate) {
        return (
            <span className="text-muted-foreground ">
                No Due Date <span className="text-base">😴</span>{" "}
            </span>
        );
    }

    if (!isValid(new Date(dueDate))) {
        return `Invalid Date [${dueDate}]`;
    }

    if (isToday(new Date(dueDate))) {
        return <p className="text-blue-600">Today</p>;
    }

    if (isTomorrow(new Date(dueDate))) {
        return (
            <p className="text-red-600">
                Tomorrow <span className="text-base">😱</span>
            </p>
        );
    }

    return (
        <span className="font-semibold">{format(dueDate, "MMM d yyy")}</span>
    );
}
