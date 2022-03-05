import { createGlobalStyle } from "styled-components";
// from https://www.youtube.com/watch?v=G00V4tRx1ME

const periwinkle = "#CCCCFF"

export const lightTheme = {
  background: periwinkle,
  fontColor: "#000",
  InfoBGColor: 'ivory',
  0: "white",
  1: "#65696B", // grey
  2: "#BEA747", // yellow
  3: "#599D51" // green
};

export const darkTheme = {
  background: "#000",
  fontColor: "#fff",
  InfoBGColor: '#240026',
  0: "black",
  1: "#65696B", // grey
  2: "#BEA747", // yellow
  3: "#599D51" // green
};

export const GlobalStyles = createGlobalStyle`
	body {
		background-color: ${ props => props.theme.background };
    color: ${ props => props.theme.fontColor };
    caret-color: transparent;
	}
`;