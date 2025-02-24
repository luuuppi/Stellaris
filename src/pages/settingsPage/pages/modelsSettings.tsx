import { useSettingsStore } from "@/store/useSettingsStore";
import useOllamaTags from "@api/useOllamaTags";
import { ModelItem, ModelsList } from "../components/modelsList";
import PullModelInput from "../components/pullModelInput";
import { Link } from "@tanstack/react-router";
import { type FC } from "react";

const ModelsSettingsPage: FC = () => {
  const serverStatus = useSettingsStore((state) => state.serverStatus);
  const { data, refetch, failureCount } = useOllamaTags();
  const isError = failureCount > 0;

  return (
    <main className="flex h-full w-full flex-col gap-6">
      <PullModelInput serverStatus={serverStatus} refetchModels={refetch} />
      <ModelsList>
        {isError && (
          <span className="m-auto block text-lg">
            Failed to load models. Check your{" "}
            <Link to="/sessions/settings/general" className="link">
              connection.
            </Link>
          </span>
        )}
        {!data?.models.length && !isError && (
          <span className="m-auto block text-lg">There's no installed models.</span>
        )}
        {!isError &&
          data?.models.map((model) => <ModelItem key={model.digest} modelName={model.name} />)}
      </ModelsList>
    </main>
  );
};

export default ModelsSettingsPage;
