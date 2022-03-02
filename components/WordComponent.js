import React from "react"
import styled from "styled-components"

export const WordComponent = ({showWord, word}) => {
  if(!showWord) return <></>
  return <H1>{word.toUpperCase()}</H1>
}

const H1 = styled.h1`
  text-align: center;
`