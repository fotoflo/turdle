import { useEffect, useLayoutEffect, useState } from "react";

function useSize(targetRef) {
  const getSize = () => {
    console.log({targetRef})
    return {
      width: targetRef?.current ? targetRef?.current.offsetWidth : 0,
      height: targetRef?.current ? targetRef?.current.offsetHeight : 0
    };
  };

  const [size, setSize] = useState(getSize);
  if(typeof window === 'undefined') return size 

  const handleResize = () => {
    setSize(getSize());
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useLayoutEffect(() => {
    handleResize();
  }, []);
  return size;
}

export default useSize