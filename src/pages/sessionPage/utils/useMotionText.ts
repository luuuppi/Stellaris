import { animate, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

const useMotionText = (value: string) => {
  const motionCursor = useMotionValue<number>(0);
  const [cursor, setCursor] = useState<number>(0);
  const [prevValue, setPrevValue] = useState<string>("");
  const [isSameValue, setIsSameValue] = useState<boolean>(true);

  if (prevValue !== value) {
    setPrevValue(value);
    setIsSameValue(value.startsWith(prevValue));

    if (!value.startsWith(prevValue)) {
      setCursor(0);
    }
  }

  useEffect(() => {
    if (!isSameValue) {
      motionCursor.jump(0);
    }

    const animationControls = animate(motionCursor, value.length, {
      duration: 0.5,
      ease: "linear",
      onUpdate: (latest) => {
        setCursor(Math.floor(latest));
      },
    });

    return () => animationControls.stop();
  }, [value.length, motionCursor, isSameValue]);

  return value.slice(0, cursor);
};

export default useMotionText;
