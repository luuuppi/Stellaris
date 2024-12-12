import { useSettingsStore } from "@/store/useSettingsStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteOllamaModel = (model: string) => {
  const queryClient = useQueryClient();
  const ollamaServer = useSettingsStore((state) => state.ollamaServer);

  const { mutate: handleDeleteModel, ...rest } = useMutation({
    mutationFn: async () => {
      await fetch(`${ollamaServer}/api/delete`, {
        method: "DELETE",
        body: JSON.stringify({ model }),
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["models"] });
    },
  });

  return { handleDeleteModel, ...rest };
};

export default useDeleteOllamaModel;
