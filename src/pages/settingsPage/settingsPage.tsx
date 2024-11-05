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
  const model = useSettingsStore((state) => state.model);
  const [isSelectValid, setIsSelectValid] = useState<boolean>(true);

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
    if (!model) {
      setIsSelectValid(false);
      return;
    }

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
          {serverStatus === "disconnected" && (
            <p>
              Allow connections from <code>https://ollama-hub.vercel.app</code> in your Ollama
              server settings.{" "}
              <a
                className="underline decoration-white decoration-1 underline-offset-4 transition-colors duration-200 ease-in-out hover:text-accent-200 hover:decoration-accent-200"
                href="https://github.com/ollama/ollama/blob/main/docs/faq.md#how-can-i-allow-additional-web-origins-to-access-ollama"
                target="_blank"
              >
                See docs
              </a>
            </p>
          )}
          <ModelSelect
            models={models}
            serverStatus={serverStatus}
            isValid={isSelectValid}
            setIsValid={setIsSelectValid}
          />
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
