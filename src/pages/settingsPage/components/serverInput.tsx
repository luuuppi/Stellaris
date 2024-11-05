import { useSettingsStore } from "@/store/useSettingsStore";
import Input from "@/ui/input";
import cn from "@/utils/cn";
import { useCallback, type ChangeEvent, type FC } from "react";

type ServerInputProps = {
  serverStatus: "connected" | "disconnected";
};

const ServerInput: FC<ServerInputProps> = ({ serverStatus }) => {
  const ollamaServer = useSettingsStore((state) => state.ollamaServer);
  const setOllamaServer = useSettingsStore((state) => state.setOllamaServer);

  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setOllamaServer(e.target.value);
  }, []);

  return (
    <div className="relative">
      <Input
        className="w-full"
        id="ollamaServerInput"
        value={ollamaServer}
        onChange={changeHandler}
      />
      <span
        className={cn(
          "absolute right-5 top-2",
          serverStatus === "connected" ? "text-green-500" : "text-red-500",
        )}
      >
        {serverStatus.charAt(0).toUpperCase() + serverStatus.slice(1)}
      </span>
    </div>
  );
};

export default ServerInput;
