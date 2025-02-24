import Button from "@ui/button";
import CreateChatButton from "./features/createChatButton";
import SessionsList from "./widgets/sessionsList";
import { Link, Outlet } from "@tanstack/react-router";
import { SettingsIcon } from "lucide-react";
import { type FC } from "react";

const SessionsLayout: FC = () => {
  return (
    <div className="flex h-full flex-row">
      <aside className="flex w-full max-w-[17rem] flex-col bg-night-950 p-4 lg:max-w-[24rem]">
        <h1 className="block text-center font-mono text-2xl font-bold">Stellaris</h1>
        <CreateChatButton />
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
