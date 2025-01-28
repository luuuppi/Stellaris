import { queryClient } from "@api/config/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Link, Outlet, useLocation, useRouter } from "@tanstack/react-router";
import Button from "@ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@ui/dialog";
import { X } from "lucide-react";
import { type FC } from "react";

const SettingsLayout: FC = () => {
  const router = useRouter();
  const currentPage = useLocation({
    select: (location) => location.pathname.split("/").pop(),
  });

  const onOpenChange = (open: boolean) => {
    if (!open) {
      router.history.back();
    }
  };

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="flex h-full max-h-[40rem] w-full max-w-[65rem] flex-col p-10">
        <header className="flex items-center justify-between">
          <DialogTitle className="text-2xl font-bold">Settings</DialogTitle>
          <DialogClose>
            <Button variant="tertiary" size="icon_sm">
              <X size={20} />
            </Button>
          </DialogClose>
        </header>
        <div className="my-6 h-[1px] w-full bg-night-600" />
        <DialogDescription className="hidden">Settins page</DialogDescription>
        <div className="flex h-full justify-between">
          <nav className="flex h-full flex-col gap-4">
            <Link
              to="/sessions/settings/general"
              data-selected={currentPage === "general"}
              className="rounded-xl px-16 py-2 transition-colors duration-200 ease-in-out hover:bg-night-700/10 data-[selected=true]:bg-night-700/30"
            >
              General
            </Link>
            <Link
              to="/sessions/settings/models"
              data-selected={currentPage === "models"}
              className="rounded-xl px-16 py-2 transition-colors duration-200 ease-in-out hover:bg-night-700/10 data-[selected=true]:bg-night-700/30"
            >
              Models
            </Link>
          </nav>
          <div className="mx-5 h-full w-[1px] bg-night-600" />
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsLayout;
