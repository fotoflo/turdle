import { useEffect } from 'react';


export const useKeyboard = function(keydownHandler){

  const _keydownHandler = ( {repeat, key: pressedKey}  ) =>{
    if(repeat) return
    console.log("useKeyboard", pressedKey)
    keydownHandler( pressedKey  )
  }

  return useEffect( () => { // WINDOW KEYDOWN LISTENER
    window.addEventListener("keydown", _keydownHandler);
    return () => {
      window.removeEventListener("keydown", _keydownHandler);
    }
  })

}