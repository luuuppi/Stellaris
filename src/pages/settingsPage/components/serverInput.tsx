import { useSettingsStore } from "@/store/useSettingsStore";
import Button from "@/ui/button";
import Label from "@/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import cn from "@/utils/cn";
import { RefreshCcw } from "lucide-react";
import { useCallback, useRef, type ChangeEvent, type FC } from "react";

type ServerInputProps = {
  serverStatus: "connected" | "disconnected";
  checkConnection: () => void;
};

const ServerInput: FC<ServerInputProps> = ({ serverStatus, checkConnection }) => {
  const ollamaServer = useSettingsStore((state) => state.ollamaServer);
  const setOllamaServer = useSettingsStore((state) => state.setOllamaServer);
  const inputRef = useRef<HTMLInputElement>(null);

  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setOllamaServer(e.target.value);
  }, []);

  return (
    <div className="flex w-full flex-col justify-center">
      <Label>Ollama server</Label>
      <div className="my-1 flex gap-2">
        <div
          className="flex w-full cursor-text items-center justify-between rounded-xl border border-night-600 bg-night-800 p-2"
          onClick={() => inputRef.current?.focus()}
        >
          <input
            value={ollamaServer}
            onChange={changeHandler}
            className="w-full bg-transparent text-white focus:outline-none"
            ref={inputRef}
          />
          <span
            className={cn(
              "mx-2",
              serverStatus === "connected" ? "text-green-500" : "text-red-500",
            )}
          >
            {serverStatus.charAt(0).toUpperCase() + serverStatus.slice(1)}
          </span>
        </div>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="tertiary" size="icon_sm" onClick={checkConnection}>
              <RefreshCcw />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Check connection</TooltipContent>
        </Tooltip>
      </div>
      {serverStatus === "disconnected" && (
        <p>
          Allow connections from <code>https://ollama-hub.vercel.app</code> in your Ollama
          server settings.{" "}
          <a
            className="underline decoration-white decoration-1 underline-offset-4 transition-colors duration-200 ease-in-out hover:text-accent-200 hover:decoration-accent-200"
            href="https://github.com/ollama/ollama/blob/main/docs/faq.md#how-can-i-allow-additional-web-origins-to-access-ollama"
            target="_blank"
          >
            See docs
          </a>
        </p>
      )}
    </div>
  );
};

export default ServerInput;
