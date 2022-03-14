import React from "react"
import styled from "styled-components"

export const WordComponent = ({showWord, word, wordlist}) => {
  if(!showWord) return <></>
  return <>
  <H1>{word.toUpperCase()}</H1>
    <p>{wordlist[0].length} letter words: {wordlist.length}</p>
  </>
}

const H1 = styled.h1`
  text-align: center;
`