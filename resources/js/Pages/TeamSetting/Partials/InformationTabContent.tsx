import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useForm, usePage } from "@inertiajs/react";
import { LoaderCircleIcon } from "lucide-react";
import { FormEventHandler } from "react";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
export default function InformationTabContent() {
    const { teams } = usePage().props;

    const { data, setData, processing, errors, reset, put } = useForm({
        name: teams.current?.name,
    });

    const handleSaveChanges: FormEventHandler = (e) => {
        e.preventDefault();
        put(route("teams.update", { team: teams.current?.id }), {
            onSuccess() {
                toast.success("Team has been updated");
            },
        });
    };
    return (
        <div>
            <form onSubmit={handleSaveChanges}>
                <Card className="ring-4 ring-secondary">
                    <CardHeader>
                        <CardTitle>Team Information</CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-1">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                type="text"
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button disabled={processing}>
                            {processing && (
                                <LoaderCircleIcon className="animate-spin" />
                            )}
                            Save Changes
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}
