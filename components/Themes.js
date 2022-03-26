import { createGlobalStyle } from "styled-components";
// from https://www.youtube.com/watch?v=G00V4tRx1ME

const periwinkle = "#CCCCFF"

export const lightTheme = {
  background: "white",
  fontColor: "#000",
  InfoBGColor: 'ivory',
  0: "white",  // White, Blank
  1: "#FDA8EF", // not in word, yellow
  2: "#FFFD0B", // wrong slot
  3: "#35E52D" // correct slot
};

export const darkTheme = {
  background: "black",
  fontColor: "#fff",
  InfoBGColor: '#240026',
  0: "black",   // black, Blank
  1: "#FDA8EF", // not in word, yellow
  2: "#FFFD0B", // wrong slot
  3: "#35E52D" // correct slot
};

export const GlobalStyles = createGlobalStyle`
	body {
    max-width: 800px;
    min-width: 300px;
		background-color: ${ props => props.theme.background };
    color: ${ props => props.theme.fontColor };
    caret-color: transparent;
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      user-select:none;
	}
`;