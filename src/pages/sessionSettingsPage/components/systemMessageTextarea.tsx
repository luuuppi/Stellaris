import { useSessionStore } from "@/store/useSessionsStore";
import Textarea from "@ui/textarea";
import Label from "@ui/label";
import { ChangeEvent, type FC } from "react";

type SystemMessageTextareaProps = {
  id: string;
};

const SystemMessageTextarea: FC<SystemMessageTextareaProps> = ({ id }) => {
  const sysMessage = useSessionStore(
    (state) => state.sessions.find((session) => session.id === id)?.systemMessage,
  );
  const setSysMessage = useSessionStore((state) => state.setSystemMessage);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSysMessage(id, e.target.value);
  };

  return (
    <div>
      <Label>System message</Label>
      <Textarea className="mt-1" value={sysMessage ?? ""} onChange={handleChange} />
    </div>
  );
};

export default SystemMessageTextarea;
