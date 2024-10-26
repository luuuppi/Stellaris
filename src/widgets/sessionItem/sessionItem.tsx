import { useSessionStore } from "@/store/useSessionsStore";
import { Link } from "@tanstack/react-router";
import { type FC } from "react";
import SessionActionsDropdown from "./components/sessionActionsDropdown";

type SessionItemProps = {
  title: string;
  sessionId: string;
  isSelected: boolean;
};

const SessionItem: FC<SessionItemProps> = ({ title, sessionId, isSelected }) => {
  const getSessionName = useSessionStore((state) => state.getSessionName);
  const sessionName = getSessionName(sessionId);

  return (
    <>
      <Link
        to={`/sessions/${sessionId}`}
        data-selected={isSelected}
        className="flex w-full cursor-pointer items-center justify-between rounded-xl p-3 transition-colors duration-200 ease-in-out hover:bg-night-700/50 active:bg-night-700/30 data-[selected=true]:bg-accent-500/30 data-[selected=true]:hover:bg-accent-500/25 data-[selected=true]:active:bg-accent-500/20"
      >
        <span className="overflow-hidden text-ellipsis whitespace-nowrap font-medium">
          {sessionName ?? title}
        </span>
        <SessionActionsDropdown sessionId={sessionId} sessionName={sessionName ?? title} />
      </Link>
    </>
  );
};

export default SessionItem;
