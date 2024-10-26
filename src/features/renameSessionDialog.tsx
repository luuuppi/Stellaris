import { useSessionStore } from "@/store/useSessionsStore";
import Button from "@/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import Input from "@/ui/input";
import { X } from "lucide-react";
import { type ChangeEvent, FormEvent, forwardRef, useCallback, useRef, useState } from "react";

type RenameSessionDialogProps = {
  sessionId: string;
};

const RenameSessionDialog = forwardRef<HTMLDivElement, RenameSessionDialogProps>(
  ({ sessionId }, ref) => {
    const closeRef = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState<string>("");
    const renameSession = useSessionStore((state) => state.renameSession);

    const inputChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    }, []);

    const submitHandler = useCallback(
      (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        renameSession(sessionId, value);
        setValue("");
        closeRef.current?.click();
      },
      [sessionId, closeRef, value],
    );

    return (
      <Dialog>
        <DialogTrigger>
          <div className="hidden" ref={ref} />
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Rename chat</DialogTitle>
          <DialogDescription>Rename chat, then click save</DialogDescription>
          <form id="renameForm" onSubmit={submitHandler}>
            <Input
              value={value}
              onChange={inputChangeHandler}
              id="chatNameInput"
              placeholder="New chat name"
            />
            <Button className="mt-3 flex w-full items-center justify-center">Save</Button>
          </form>
          <DialogClose>
            <div className="hidden" ref={closeRef} />
          </DialogClose>
          <DialogClose className="absolute right-5 top-5">
            <Button variant="tertiary" size="icon_xs">
              <X size={20} />
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    );
  },
);

export default RenameSessionDialog;
