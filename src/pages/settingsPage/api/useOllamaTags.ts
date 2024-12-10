import { useSettingsStore } from "@/store/useSettingsStore";
import { useQuery } from "@tanstack/react-query";
import { ListResponse } from "ollama/browser";

const useOllamaTags = () => {
  const ollamaServer = useSettingsStore((state) => state.ollamaServer);
  const setServerStatus = useSettingsStore((state) => state.setServerStatus);

  const getOllamaTags = async () => {
    try {
      console.log("fetch ollama tags");
      const response = await fetch(`${ollamaServer}/api/tags`);
      setServerStatus("connected");
      return response.json();
    } catch (e) {
      if (e instanceof Error) {
        setServerStatus("disconnected");
        throw new Error(e.message);
      }
    }
  };

  const { data, refetch, ...rest } = useQuery<ListResponse>({
    queryKey: ["models", ollamaServer],
    queryFn: getOllamaTags,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: true,
    retryDelay: 1500,
  });

  return { data, refetch, ...rest };
};

export default useOllamaTags;
