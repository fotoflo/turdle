import { createGlobalStyle } from "styled-components";
// from https://www.youtube.com/watch?v=G00V4tRx1ME

export const lightTheme = {
  body: "#fff",
  fontColor: "#000",
  0: "white",
  1: "grey",
  2: "yellow",
  3: "green"
};

export const darkTheme = {
  body: "#000",
  fontColor: "#fff",
  0: "black",
  1: "grey",
  2: "yellow",
  3: "green"
};

export const GlobalStyles = createGlobalStyle`
	body {
		background-color: ${(props) => props.theme.body};
    caret-color: transparent;
	}
`;