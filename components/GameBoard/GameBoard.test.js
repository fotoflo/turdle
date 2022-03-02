import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import GameBoard from './GameBoard'

test.only('it renders', ()=>{
  const word = "hello"
  const wordList = ["hello","tests"]
  const showHints = false
  const setShowHints = ()=>{}
  const setWordLength = ()=>{}

  render(<GameBoard 
    word={word}
    wordList={wordList}
    showHints={showHints}
    setShowHints={setShowHints}
    setWordLength={setWordLength}
  />)
  const gameboardContainer = screen.getByTestId("GameboardContainer")
  expect(gameboardContainer).toBeInTheDocument()
})