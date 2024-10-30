import { useSettingsStore } from "@/store/useSettingsStore";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/ui/select";
import { ModelResponse } from "ollama/browser";
import { type FC } from "react";

type ModelSelectProps = {
  models: ModelResponse[];
  serverStatus: "connected" | "disconnected";
};

const ModelSelect: FC<ModelSelectProps> = ({ models, serverStatus }) => {
  const currentModel = useSettingsStore((state) => state.model);
  const setModel = useSettingsStore((state) => state.setModel);

  return (
    <Select value={currentModel} onValueChange={setModel}>
      <SelectTrigger
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
    </Select>
  );
};

export default ModelSelect;
