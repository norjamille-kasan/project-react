import { router } from "@inertiajs/react";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
    prevUrl: string | null;
    nextUrl: string | null;
};

export default function SimplePagination({ ...props }: Props) {
    if (!props.prevUrl && !props.nextUrl) {
        return null;
    }
    return (
        <div className=" flex w-full justify-end space-x-2 items-center">
            <Button
                variant="outline"
                onClick={(e) => props.prevUrl && router.get(props.prevUrl)}
                disabled={props.prevUrl === null}
            >
                <ArrowLeft />
                Prev
            </Button>
            <Button
                onClick={(e) => props.nextUrl && router.get(props.nextUrl)}
                variant="outline"
                disabled={props.nextUrl === null}
            >
                Next
                <ArrowRight />
            </Button>
        </div>
    );
}
