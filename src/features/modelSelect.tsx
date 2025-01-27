import Label from "@ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@ui/select";
import { type ModelResponse } from "ollama/browser";
import { type FC } from "react";

type ModelSelectProps = {
  models: ModelResponse[];
  serverStatus: "connected" | "disconnected";
  onValueChange: (value: string) => void;
  currentModel: string;
  label: string;
};

const ModelSelect: FC<ModelSelectProps> = ({
  models,
  serverStatus,
  onValueChange,
  currentModel,
  label,
}) => {
  return (
    <Select value={currentModel} onValueChange={onValueChange}>
      <div>
        <Label>{label}</Label>
        <SelectTrigger
          className="mt-1"
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
