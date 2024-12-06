import { useSessionStore } from "@/store/useSessionsStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import Button from "@/ui/button";
import { ModelResponse } from "ollama/browser";
import { useEffect, useState, type FC } from "react";
import getOllamaTags from "../api/getOllamaTags";
import ModelSelect from "../components/modelSelect";
import ServerInput from "../components/serverInput";

const GeneralSettingsPage: FC = () => {
  const ollamaServer = useSettingsStore((state) => state.ollamaServer);
  const clearSessions = useSessionStore((state) => state.clearSessions);
  const resetSettings = useSettingsStore((state) => state.resetSettings);
  const [serverStatus, setServerStatus] = useState<"connected" | "disconnected">("connected");
  const [models, setModels] = useState<ModelResponse[]>([]);
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

  useEffect(() => {
    if (serverStatus === "connected") return;

    const interval = setInterval(() => {
      getModels();
    }, 1500);

    return () => clearInterval(interval);
  }, [serverStatus, getModels]);

  return (
    <>
      <div className="flex flex-col gap-3">
        <ServerInput serverStatus={serverStatus} checkConnection={getModels} />
        <ModelSelect
          models={models}
          serverStatus={serverStatus}
          isValid={isSelectValid}
          setIsValid={setIsSelectValid}
        />
      </div>
      <div className="mt-auto">
        <div className="mb-5 flex">
          <span className="dashed-line w-full" />
          <span className="mx-6 text-nowrap font-semibold text-red-500">Danger zone</span>
          <span className="dashed-line w-full" />
        </div>
        <div className="flex flex-col gap-3">
          <Button variant="danger" className="w-full" onClick={() => resetSettings()}>
            Reset settings
          </Button>
          <Button variant="danger" className="w-full" onClick={() => clearSessions()}>
            Delete all chats
          </Button>
        </div>
      </div>
    </>
  );
};

export default GeneralSettingsPage;
