import DeleteSessionDialog from "@/features/deleteSessionDialog";
import RenameSessionDialog from "@/features/renameSessionDialog";
import {
  DropDownMenu,
  DropDownMenuContent,
  DropDownMenuItem,
  DropDownMenuTrigger,
} from "@/ui/dropDown";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import Button from "@ui/button";
import { Ellipsis } from "lucide-react";
import { type FC, useState } from "react";

type SessionActionsDropdownProps = {
  sessionId: string;
  sessionName: string;
};

const SessionActionsDropdown: FC<SessionActionsDropdownProps> = ({
  sessionId,
  sessionName,
}) => {
  const [renameOpen, setRenameOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  return (
    <>
      <DropDownMenu>
        <Tooltip>
          <TooltipTrigger>
            <DropDownMenuTrigger>
              <Button variant="tertiary" size="icon_xs">
                <Ellipsis size={20} />
              </Button>
            </DropDownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Chat actions</TooltipContent>
        </Tooltip>
        <DropDownMenuContent>
          <DropDownMenuItem onSelect={() => setRenameOpen((prev) => !prev)}>
            Rename
          </DropDownMenuItem>
          <DropDownMenuItem onSelect={() => setDeleteOpen((prev) => !prev)}>
            Delete
          </DropDownMenuItem>
        </DropDownMenuContent>
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
      </DropDownMenu>
    </>
  );
};

export default SessionActionsDropdown;
