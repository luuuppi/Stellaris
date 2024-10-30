import { useSessionStore } from "@/store/useSessionsStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/ui/alertDialog";
import Button from "@/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { type ComponentPropsWithoutRef, type FC } from "react";

type DeleteSessionDialogProps = {
  sessionId: string;
  sessionName: string;
} & ComponentPropsWithoutRef<typeof AlertDialog>;

const DeleteSessionDialog: FC<DeleteSessionDialogProps> = ({
  sessionId,
  sessionName,
  open,
  onOpenChange,
}) => {
  const navigate = useNavigate();
  const deleteSession = useSessionStore((state) => state.deleteSession);

  const deleteHandler = (sessionId: string) => {
    deleteSession(sessionId);
    navigate({ to: "/sessions" });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogTitle>Delete chat?</AlertDialogTitle>
        <AlertDialogDescription>
          This action will delete chat <span className="font-bold">{sessionName}</span>
        </AlertDialogDescription>
        <div className="flex justify-end gap-5">
          <AlertDialogCancel>
            <Button variant="tertiary">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction>
            <Button variant="danger" onClick={() => deleteHandler(sessionId)}>
              Delete
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSessionDialog;
