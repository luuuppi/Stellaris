import { useSessionStore } from "@/store/useSessionsStore";
import Button from "@ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/tooltip";
import cn from "@/utils/cn";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { MessageSquareShare, Trash2 } from "lucide-react";
import { ElementRef, forwardRef, type FC, type ReactNode } from "react";
import useDeleteOllamaModel from "../api/useDeleteOllamaModel";

type ModelsListProps = {
  children: ReactNode;
  className?: string;
};

const ModelsList: FC<ModelsListProps> = ({ children, className }) => {
  return (
    <div className={cn("flex h-full flex-col", className)}>
      <h3 className="mb-5 font-semibold">Installed models</h3>
      <ul className="better-scrollbar flex h-0 flex-auto flex-col gap-4 overflow-auto pr-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {children}
        </AnimatePresence>
      </ul>
    </div>
  );
};

type ModelItemProps = {
  modelName: string;
};

const modelItemAnimation: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
};

const ModelItem = forwardRef<ElementRef<"li">, ModelItemProps>(({ modelName }, ref) => {
  const navigate = useNavigate();
  const createSession = useSessionStore((state) => state.createSession);
  const { handleDeleteModel } = useDeleteOllamaModel(modelName);

  const handleCreateSession = () => {
    const id = createSession(modelName);
    navigate({ to: `/sessions/${id}` });
  };

  return (
    <motion.li
      className="flex items-center justify-between rounded-2xl bg-night-800 px-10 py-4"
      layout
      variants={modelItemAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "spring", bounce: 0, duration: 0.5 }}
      ref={ref}
    >
      <span>{modelName}</span>
      <div className="flex items-center justify-center gap-4">
        <Tooltip>
          <TooltipTrigger>
            <Button variant="tertiary" size="icon_sm" onClick={handleCreateSession}>
              <MessageSquareShare size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Create a chat with this model</TooltipContent>
        </Tooltip>
        <Button variant="danger" size="icon_sm" onClick={() => handleDeleteModel()}>
          <Trash2 size={20} />
        </Button>
      </div>
    </motion.li>
  );
});

export { ModelItem, ModelsList };
