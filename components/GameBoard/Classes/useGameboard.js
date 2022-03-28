import { useState } from "react"
export default class Gameboard {
  constructor(...args){
    const [gameboardState, setGameboardState] = useState( ...args )
  
    return [gameboardState, setGameboardState]
  }

}