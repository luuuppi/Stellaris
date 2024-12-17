import Button from "@/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/ui/dialog";
import { useRouter, useParams } from "@tanstack/react-router";
import { X } from "lucide-react";
import { type FC } from "react";
import SystemMessageTextarea from "./components/systemMessageTextarea";
import SessionModelSelect from "./components/sessionModelSelect";

const SessionSettingsPage: FC = () => {
  const router = useRouter();
  const { sessionId } = useParams({ from: "/_sessions-layout/sessions/$sessionId/settings" });

  const onOpenChange = (open: boolean) => {
    if (!open) {
      router.history.back();
    }
  };

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[40rem] min-w-[50rem]">
        <header className="flex items-center justify-between">
          <DialogTitle className="text-2xl font-bold">Chat settings</DialogTitle>
          <DialogClose>
            <Button variant="tertiary" size="icon_sm">
              <X size={20} />
            </Button>
          </DialogClose>
        </header>
        <div className="my-6 h-[1px] w-full bg-night-600" />
        <DialogDescription className="hidden">Session settings page</DialogDescription>
        <div className="flex flex-col gap-4">
          <SessionModelSelect id={sessionId} />
          <SystemMessageTextarea id={sessionId} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SessionSettingsPage;
