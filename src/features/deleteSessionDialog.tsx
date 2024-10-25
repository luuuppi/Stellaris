import { useSessionStore } from "@/store/useSessionsStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/ui/alertDialog";
import Button from "@/ui/button";
import { forwardRef } from "react";

type DeleteSessionDialogProps = {
  sessionId: string;
  sessionName: string;
};

const DeleteSessionDialog = forwardRef<HTMLDivElement, DeleteSessionDialogProps>(
  ({ sessionId, sessionName }, ref) => {
    const deleteSession = useSessionStore((state) => state.deleteSession);

    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <div className="hidden" ref={ref} />
        </AlertDialogTrigger>
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
              <Button variant="danger" onClick={() => deleteSession(sessionId)}>
                Delete
              </Button>
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
);

export default DeleteSessionDialog;
