import Button from "@/ui/button";
import Input from "@/ui/input";
import Label from "@/ui/label";
import { motion } from "framer-motion";
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
  const [progress, setProgress] = useState<string>("0");
  const { pullModel, abortPulling } = usePullOllamaModel(
    (value) => (pullingStore.data = value),
  );
  const pullingState = useSnapshot(pullingStore);

  useEffect(() => {
    if (!pullingState.isPullingInProgress) setProgress("0");
    if (!pullingState.data.completed) return;

    setProgress(
      calculatePercentage(pullingState.data.total, pullingState.data.completed).toFixed(),
    );
  }, [pullingState.data.completed, pullingState.isPullingInProgress]);

  useEffect(() => {
    if (pullingStore.data.status === "success") refetchModels();
  }, [pullingStore.data.status]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    pullModel(value);
    setValue("");
  };

  return (
    <div className="flex flex-col">
      <Label>Download model</Label>
      <form className="my-1 flex gap-2" onSubmit={handleSubmit}>
        {!pullingState.isPullingInProgress && (
          <Input
            className="w-full"
            name="Pull model input"
            placeholder="Model name (e.g. phi3.5)"
            autoComplete="off"
            disabled={disabled}
            value={value}
            onChange={handleChange}
          />
        )}
        {pullingState.isPullingInProgress && (
          <motion.div
            className="flex w-full items-center justify-between rounded-xl border border-night-600 bg-night-800 px-4 py-2"
            animate={{
              background: `linear-gradient(90deg, rgb(22 163 74) ${progress}%, transparent 0%)`,
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
          >
            <span className="z-10">Downloading {pullingStore.modelName}...</span>
            <span className="z-10">{progress}%</span>
          </motion.div>
        )}
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
      <div className="flex h-[24px] gap-1">
        {pullingState.isPullingInProgress && <span>{pullingState.data.status}</span>}
        <span className="text-red-500">{pullingState.data.error}</span>
      </div>
    </div>
  );
};

export default PullModelInput;
