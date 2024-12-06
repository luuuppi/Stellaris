import { useSettingsStore } from "@/store/useSettingsStore";
import Label from "@/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/ui/select";
import cn from "@/utils/cn";
import { type ModelResponse } from "ollama/browser";
import { type FC } from "react";

type ModelSelectProps = {
  models: ModelResponse[];
  serverStatus: "connected" | "disconnected";
  isValid: boolean;
  setIsValid: (value: boolean) => void;
};

const ModelSelect: FC<ModelSelectProps> = ({ models, serverStatus, isValid, setIsValid }) => {
  const currentModel = useSettingsStore((state) => state.model);
  const setModel = useSettingsStore((state) => state.setModel);

  const onValueChange = (value: string) => {
    setIsValid(true);
    setModel(value);
  };

  return (
    <Select value={currentModel} onValueChange={onValueChange}>
      <div>
        <Label>Global model</Label>
        <SelectTrigger
          className={cn("mt-1", !isValid && "ring-2 ring-red-500")}
          value={currentModel}
          label="Available models"
          disabled={serverStatus === "disconnected"}
        />
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model.name} value={model.name}>
              {model.name}
            </SelectItem>
          ))}
        </SelectContent>
      </div>
    </Select>
  );
};

export default ModelSelect;
