import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Switch } from "@/Components/ui/switch";
import { Permission } from "@/types/models";
import { useForm } from "@inertiajs/react";
import { LoaderCircleIcon, PlusIcon } from "lucide-react";
import { FormEventHandler, useState } from "react";
import { toast } from "sonner";

export default function CreateTeamRoleModal({
    permissions,
    currentTeamId,
}: {
    permissions: Permission[];
    currentTeamId?: number;
}) {
    const [isOpen, setIsOpen] = useState(false);

    const { data, setData, processing, errors, post, reset } = useForm({
        team_id: currentTeamId,
        name: "",
        permissions: [] as string[],
    });

    const handleSelectPermission = (name: string) => {
        if (data.permissions.includes(name)) {
            setData(
                "permissions",
                data.permissions.filter((permission) => permission !== name)
            );
        } else {
            setData("permissions", [...data.permissions, name]);
        }
    };

    const handleCreateRole: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("team-roles.store"), {
            onSuccess() {
                toast.success("Role has been saved");
                setIsOpen(false);
                reset();
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon />
                    New Role
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Add New Role</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateRole} id="form">
                    <div className="grid sm:grid-2 gap-4">
                        <div className="space-y-1 sm:col-span-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                type="text"
                                placeholder="ex. Member"
                            />
                            <InputError message={errors.name} />
                        </div>
                        {permissions.map((permission) => (
                            <div
                                key={permission.id}
                                className="flex items-center border rounded-md p-2 space-x-2"
                            >
                                <Switch
                                    id={permission.id.toString()}
                                    checked={data.permissions.includes(
                                        permission.name
                                    )}
                                    onCheckedChange={(e) =>
                                        handleSelectPermission(permission.name)
                                    }
                                />
                                <Label htmlFor={permission.id.toString()}>
                                    {permission.name}
                                </Label>
                            </div>
                        ))}
                    </div>
                </form>
                <DialogFooter>
                    <Button type="submit" form="form" disabled={processing}>
                        {processing && (
                            <LoaderCircleIcon className="animate-spin" />
                        )}
                        Create Role
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
