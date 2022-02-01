import { useEffect } from 'react';


export const useKeyboard = function(keydownHandler){
  useEffect( () => { // WINDOW KEYDOWN LISTENER
    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    }
  })
}