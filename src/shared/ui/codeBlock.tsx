import hljs from "highlight.js";
import { Check, Copy } from "lucide-react";
import { useState, type ComponentPropsWithoutRef, type FC } from "react";

type CodeBlockProps = ComponentPropsWithoutRef<"code">;

const CodeBlock: FC<CodeBlockProps> = ({ children, className, ...props }) => {
  const lang = className?.replace(/^language-/, "");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children as string);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const highlighted = hljs.highlight(children as string, {
    language: lang as string,
  });

  return (
    <div className="relative my-2 rounded-md bg-night-900 contain-inline-size">
      <div className="flex items-center justify-between rounded-t-md bg-night-700 px-3 py-2 text-sm text-night-100">
        <span>{lang}</span>
      </div>
      <div className="sticky top-9">
        <div className="absolute bottom-0 right-3 flex h-9 items-center">
          <button
            className="flex items-center gap-1 rounded-md bg-night-700 p-1 px-1 font-sans text-sm text-night-100 transition-colors duration-200 ease-in-out hover:text-white"
            onClick={handleCopy}
          >
            {isCopied ? (
              <>
                <Check size={15} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={15} />
                Copy code
              </>
            )}
          </button>
        </div>
      </div>
      <div className="better-scrollbar overflow-x-auto rounded-b-md p-4 leading-normal">
        <code
          className={className}
          dangerouslySetInnerHTML={{ __html: highlighted.value }}
          {...props}
        />
      </div>
    </div>
  );
};

export default CodeBlock;
