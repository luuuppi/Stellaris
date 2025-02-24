import { useSessionStore } from "@/store/useSessionsStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useNavigate } from "@tanstack/react-router";
import Button from "@ui/button";
import { Plus } from "lucide-react";
import { type FC } from "react";

const CreateChatButton: FC = () => {
  const createSession = useSessionStore((state) => state.createSession);
  const model = useSettingsStore((state) => state.model);
  const navigate = useNavigate();

  const handleCreateSesstion = () => {
    const id = createSession(model);
    navigate({ to: `/sessions/${id}` });
  };

  return (
    <Button className="my-6 w-full" onClick={handleCreateSesstion}>
      <Plus />
      Start new chat
    </Button>
  );
};

export default CreateChatButton;
