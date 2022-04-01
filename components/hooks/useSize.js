import { useCallback, useEffect, useLayoutEffect, useState } from "react";

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect.js'


function useSize(targetRef) {
  const getSize = useCallback(() => {
    console.log({targetRef})
    return {
      width: targetRef?.current ? targetRef?.current.offsetWidth : 0,
      height: targetRef?.current ? targetRef?.current.offsetHeight : 0
    };
  }, [targetRef]);

  const [size, setSize] = useState(getSize);

  const handleResize = useCallback(() => {
    setSize(getSize());
  }, [setSize,getSize]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);


  useIsomorphicLayoutEffect(() => {
    handleResize();
  }, [handleResize]);

  return size;
}

export default useSize