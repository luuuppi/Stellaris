import { useSettingsStore } from "@/store/useSettingsStore";
import { type FC } from "react";
import useOllamaTags from "../api/useOllamaTags";
import { ModelItem, ModelsList } from "../components/modelsList";
import PullModelInput from "../components/pullModelInput";

const ModelsSettingsPage: FC = () => {
  const serverStatus = useSettingsStore((state) => state.serverStatus);
  const { data, refetch } = useOllamaTags();

  return (
    <main className="flex h-full w-full flex-col gap-6">
      <PullModelInput serverStatus={serverStatus} refetchModels={refetch} />
      <ModelsList>
        {data?.models.map((model) => <ModelItem key={model.digest} modelName={model.name} />)}
      </ModelsList>
    </main>
  );
};

export default ModelsSettingsPage;
