import { useState } from "react";
import useEventListener from "@use-it/event-listener";

const useKeydown = () => {
  const [lastKey, setLastKey] = useState("");
  useEventListener(
    "keydown",
    ({ key }) => {
      setLastKey(key);
    },
    { passive: true }
  );
  return lastKey;
};

export default useKeydown;
