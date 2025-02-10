import DeleteSessionDialog from "@/features/deleteSessionDialog";
import RenameSessionDialog from "@/features/renameSessionDialog";
import Button from "@ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@ui/dropdown";
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/tooltip";
import { Ellipsis } from "lucide-react";
import { type FC, memo, useState } from "react";

type SessionActionsDropdownProps = {
  sessionId: string;
  sessionName: string;
};

const SessionActionsDropdown: FC<SessionActionsDropdownProps> = memo(
  ({ sessionId, sessionName }) => {
    const [renameOpen, setRenameOpen] = useState<boolean>(false);
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

    return (
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger>
            <DropdownMenuTrigger>
              <Button variant="tertiary" size="icon_xs">
                <Ellipsis size={20} />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Chat actions</TooltipContent>
        </Tooltip>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => setRenameOpen((prev) => !prev)}>
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setDeleteOpen((prev) => !prev)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
        <RenameSessionDialog
          open={renameOpen}
          onOpenChange={setRenameOpen}
          sessionId={sessionId}
        />
        <DeleteSessionDialog
          sessionId={sessionId}
          sessionName={sessionName}
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
        />
      </DropdownMenu>
    );
  },
);

export default SessionActionsDropdown;
