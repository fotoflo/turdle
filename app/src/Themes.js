import { createGlobalStyle } from "styled-components";
// from https://www.youtube.com/watch?v=G00V4tRx1ME

export const lightTheme = {
  body: "#fff",
  fontColor: "#000",
};

export const darkTheme = {
  body: "#000",
  fontColor: "#fff",
};

export const GlobalStyles = createGlobalStyle`
	body {
		background-color: ${(props) => props.theme.body};
    caret-color: transparent;
	}
`;