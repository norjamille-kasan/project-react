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
import { useForm, usePage } from "@inertiajs/react";
import { LoaderCircleIcon, UserPlus2 } from "lucide-react";
import { FormEventHandler, useState } from "react";

export default function InviteMemberModal() {
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
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <UserPlus2 />
                    Invite
                </Button>
            </DialogTrigger>
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
                            onChange={(e) => setData("email", e.target.value)}
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
    );
}
