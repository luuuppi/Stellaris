import ModelSelect from "@/features/modelSelect";
import { useSessionStore } from "@/store/useSessionsStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import Button from "@ui/button";
import { type FC } from "react";
import useOllamaTags from "@api/useOllamaTags";
import ServerInput from "../components/serverInput";

const GeneralSettingsPage: FC = () => {
  const clearSessions = useSessionStore((state) => state.clearSessions);
  const resetSettings = useSettingsStore((state) => state.resetSettings);
  const serverStatus = useSettingsStore((state) => state.serverStatus);
  const currentModel = useSettingsStore((state) => state.model);
  const setModel = useSettingsStore((state) => state.setModel);
  const { data, refetch, isFetching } = useOllamaTags();

  return (
    <main className="flex w-full flex-col">
      <div className="flex flex-col gap-3">
        <ServerInput
          serverStatus={serverStatus}
          checkConnection={refetch}
          isChecking={isFetching}
        />
        <ModelSelect
          label="Global model"
          models={data?.models ?? []}
          serverStatus={serverStatus}
          currentModel={currentModel}
          onValueChange={setModel}
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
    </main>
  );
};

export default GeneralSettingsPage;
