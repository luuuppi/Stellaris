import { useSessionStore } from "@/store/useSessionsStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import Button from "@ui/button";
import SessionItem from "@/widgets/sessionItem";
import { Link, Outlet, useNavigate, useParams } from "@tanstack/react-router";
import { Plus, SettingsIcon } from "lucide-react";
import { type FC } from "react";

const SessionsLayout: FC = () => {
  const sessions = useSessionStore((state) => state.sessions);
  const createSession = useSessionStore((state) => state.createSession);
  const model = useSettingsStore((state) => state.model);
  const navigate = useNavigate();
  const { sessionId: currentId } = useParams({ strict: false });

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
        <nav className="mb-auto flex w-full flex-col gap-2">
          {sessions.map((session) => (
            <SessionItem
              title={session.messages[0] ? session.messages[0].content : session.id}
              sessionId={session.id}
              key={session.id}
              isSelected={currentId === session.id}
            />
          ))}
        </nav>
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
