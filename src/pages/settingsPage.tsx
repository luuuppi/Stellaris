import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/ui/dialog";
import { useNavigate } from "@tanstack/react-router";
import { FC } from "react";

const SettingsPage: FC = () => {
  const navigate = useNavigate();

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) {
          navigate({ to: "/sessions" });
        }
      }}
    >
      <DialogContent>
        <DialogTitle className="hidden" />
        <DialogDescription className="hidden" />
        <div>Settings modal page</div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsPage;
