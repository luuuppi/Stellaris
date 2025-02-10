import { useSessionStore } from "@/store/useSessionsStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import Button from "@ui/button";
import SessionsList from "./widgets/sessionsList";
import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import { Plus, SettingsIcon } from "lucide-react";
import { type FC } from "react";

const SessionsLayout: FC = () => {
  const createSession = useSessionStore((state) => state.createSession);
  const model = useSettingsStore((state) => state.model);
  const navigate = useNavigate();

  const handleCreateSesstion = () => {
    const id = createSession(model);
    navigate({ to: `/sessions/${id}` });
  };

  return (
    <div className="flex h-full flex-row">
      <aside className="flex w-full max-w-[17rem] flex-col bg-night-950 p-4 lg:max-w-[24rem]">
        <h1 className="block text-center font-mono text-2xl font-bold">Stellaris</h1>
        <Button className="my-6 w-full" onClick={handleCreateSesstion}>
          <Plus />
          Start new chat
        </Button>
        <SessionsList />
        <Link to="/sessions/settings/general">
          <Button className="w-full" variant="tertiary" leadingIcon={<SettingsIcon />}>
            Settings
          </Button>
        </Link>
      </aside>
      <Outlet />
    </div>
  );
};

export default SessionsLayout;
