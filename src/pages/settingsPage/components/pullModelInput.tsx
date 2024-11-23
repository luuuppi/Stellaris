import Button from "@/ui/button";
import Input from "@/ui/input";
import { Download, Square } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState, type FC } from "react";
import { useSnapshot } from "valtio";
import pullingStore from "../model/store/pullingStore";
import usePullOllamaModel from "../model/usePullModel";

const calculatePercentage = (total: number, completed: number) => {
  if (total === 0) return 0;

  return (completed / total) * 100;
};

type PullModelInputProps = {
  serverStatus: string;
  refetchModels: () => void;
};

const PullModelInput: FC<PullModelInputProps> = ({ serverStatus, refetchModels }) => {
  const disabled = serverStatus === "disconnected";
  const [value, setValue] = useState<string>("");
  const [progress, setProgress] = useState<string>("");
  const { pullModel, abortPulling } = usePullOllamaModel(
    (value) => (pullingStore.data = value),
  );
  const pullingState = useSnapshot(pullingStore);

  useEffect(() => {
    if (!pullingState.data.completed) return;

    setProgress(
      calculatePercentage(pullingState.data.total, pullingState.data.completed).toFixed(),
    );
  }, [pullingState.data.completed]);

  useEffect(() => {
    if (!pullingState.isPullingInProgress && !pullingState.data.error) setValue("");
  }, [pullingState.isPullingInProgress, pullingState.data.error]);

  useEffect(() => {
    if (pullingStore.data.status === "success") refetchModels();
  }, [pullingStore.data.status]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    pullModel(value);
  };

  return (
    <div className="flex flex-col">
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <Input
          className="w-full"
          name="Pull model input"
          placeholder="Model name (e.g. phi3.5)"
          autoComplete="off"
          disabled={disabled}
          value={value}
          onChange={handleChange}
        />
        {!pullingState.isPullingInProgress && (
          <Button variant="secondary" size="icon_sm" type="submit" disabled={disabled}>
            <Download />
          </Button>
        )}
        {pullingState.isPullingInProgress && (
          <Button variant="secondary" size="icon_sm" type="button" onClick={abortPulling}>
            <Square fill="white" />
          </Button>
        )}
      </form>
      <div className="flex gap-1">
        {pullingState.isPullingInProgress && (
          <span>
            {pullingState.data.status}
            {pullingState.data.total && <span> {progress}%</span>}
          </span>
        )}
        <span className="text-red-500">{pullingState.data.error}</span>
      </div>
    </div>
  );
};

export default PullModelInput;
