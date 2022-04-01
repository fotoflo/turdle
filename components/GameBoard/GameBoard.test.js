import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GameboardComponent from "./GameBGameboardComponentoard";
import { Wordlist } from "./Classes/Wordlist";

describe("GameboardComponent", () => {
  it("renders", () => {
    const word = "test";
    const wordList = new Wordlist("test", "tests");
    const showHints = false;
    const setShowHints = () => {};
    const setWordLength = () => {};

    render(
      <GameboardComponent
        word={word}
        wordList={wordList}
        showHints={showHints}
        setShowHints={setShowHints}
        setWordLength={setWordLength}
      />
    );
    const gameboardContainer = screen.getByTestId("GameboardContainer");
    expect(gameboardContainer).toBeInTheDocument();

    const keyboardContainer = screen.getByTestId("KeyboardContainer");
    expect(keyboardContainer).toBeInTheDocument();
  });
});
