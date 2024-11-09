import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center  pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link
                    href="/"
                    className="inline-flex items-center text-lg font-semibold"
                >
                    <ApplicationLogo className="h-8 w-8 mr-2 text-primary" />
                    Prodesk
                </Link>
            </div>
            <div className=" w-full overflow-hidden  px-6 py-4 sm:max-w-md">
                {children}
            </div>
        </div>
    );
}
