import { useSessionStore } from "@/store/useSessionsStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import Button from "@/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/ui/dialog";
import { useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import { type ModelResponse } from "ollama/browser";
import { useEffect, useState, type FC } from "react";
import getOllamaTags from "./api/getOllamaTags";
import ModelSelect from "./components/modelSelect";
import ServerInput from "./components/serverInput";

const SettingsPage: FC = () => {
  const navigate = useNavigate();
  const ollamaServer = useSettingsStore((state) => state.ollamaServer);
  const clearSessions = useSessionStore((state) => state.clearSessions);
  const resetSettings = useSettingsStore((state) => state.resetSettings);
  const [serverStatus, setServerStatus] = useState<"connected" | "disconnected">(
    "disconnected",
  );
  const [models, setModels] = useState<ModelResponse[]>([]);

  const getModels = async () => {
    try {
      const res = await getOllamaTags(ollamaServer);
      setModels(res);
      setServerStatus("connected");
    } catch (e) {
      setServerStatus("disconnected");
    }
  };

  useEffect(() => {
    getModels();
  }, [ollamaServer]);

  const onOpenChange = (open: boolean) => {
    if (!open) {
      navigate({ to: "/sessions" });
    }
  };

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[42rem] max-w-4xl">
        <header className="flex items-center justify-between">
          <DialogTitle className="text-2xl font-bold">Settings</DialogTitle>
          <DialogClose>
            <Button variant="tertiary" size="icon_sm">
              <X size={20} />
            </Button>
          </DialogClose>
        </header>
        <div className="my-5 h-[1px] w-full bg-night-600" />
        <DialogDescription className="hidden">Settins page</DialogDescription>
        <div className="flex flex-col gap-3">
          <span className="font-semibold">Ollama</span>
          <ServerInput serverStatus={serverStatus} />
          <ModelSelect models={models} serverStatus={serverStatus} />
        </div>
        <div className="mt-3 flex flex-col gap-3">
          <span className="font-semibold">Danger zone</span>
          <Button variant="danger" className="w-full" onClick={() => resetSettings()}>
            Reset settings
          </Button>
          <Button variant="danger" className="w-full" onClick={() => clearSessions()}>
            Delete all chats
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsPage;
