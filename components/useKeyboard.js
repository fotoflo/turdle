import { useEffect } from 'react';


export const useKeyboard = function(keydownHandler){

  const _keydownHandler = ( {repeat, key: pressedKey}  ) =>{
    if(repeat) return
    console.log("keydownHandler", pressedKey)
    keydownHandler( pressedKey  )
  }

  return useEffect( () => { // WINDOW KEYDOWN LISTENER
    window.addEventListener("keydown", _keydownHandler);
    return () => {
      window.removeEventListener("keydown", _keydownHandler);
    }
  })

}