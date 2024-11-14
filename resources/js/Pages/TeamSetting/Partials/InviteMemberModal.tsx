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
import { Role } from "@/types/models";
import { useForm, usePage } from "@inertiajs/react";
import { LoaderCircleIcon, UserPlus2 } from "lucide-react";
import { FormEventHandler, useState } from "react";
import { toast } from "sonner";

export default function InviteMemberModal({ roles }: { roles: Role[] }) {
    const { teams } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);

    const { data, setData, processing, errors, post, reset } = useForm({
        email: "",
    });

    const handleSendInvite: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("team-invitation.store"), {
            onSuccess() {
                setIsOpen(false);
                reset();
            },
        });
    };

    return (
        <>
            <Button
                onClick={() => {
                    if (roles.length === 0) {
                        toast.error("Please create at least 1 role", {
                            position: "top-center",
                        });
                        return;
                    }
                    setIsOpen(true);
                }}
            >
                <UserPlus2 />
                Invite
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Invite Member to '{teams.current?.name}'
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <form id="form" onSubmit={handleSendInvite}>
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                type="email"
                            />
                            <InputError message={errors.email} />
                        </div>
                    </form>
                    <DialogFooter>
                        <Button
                            form="form"
                            type="submit"
                            className="w-full"
                            disabled={processing}
                        >
                            {processing && (
                                <LoaderCircleIcon className="animate-spin" />
                            )}
                            Send Invite
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
