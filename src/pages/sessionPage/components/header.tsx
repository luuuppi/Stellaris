import DeleteSessionDialog from "@/features/deleteSessionDialog";
import Button from "@/ui/button";
import { Trash2 } from "lucide-react";
import { type FC, useState } from "react";

type HeaderProps = {
  name: string;
  model: string;
  id: string;
};

const Header: FC<HeaderProps> = ({ name, model, id }) => {
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  return (
    <header className="flex justify-between border-b border-night-500 px-5 py-4">
      <div className="flex items-center gap-3">
        <span>{name === "" ? id : name}</span>
        <div className="h-5 w-[1px] bg-night-500" />
        <span className="text-night-500">{model}</span>
      </div>
      <Button variant="tertiary" size="icon_xs" onClick={() => setDeleteOpen((prev) => !prev)}>
        <Trash2 size={20} />
      </Button>
      <DeleteSessionDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        sessionId={id}
        sessionName={name}
      />
    </header>
  );
};

export default Header;
