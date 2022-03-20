import React from "react"
import styled from "styled-components"

export const WordComponent = ({showWord, word, wordlist, level}) => {

  const visibility = showWord === true ? "block" : "none";

  return <WordDiv 
    visibility={visibility}>
    <H1 data-testid="word-h1">{word.toUpperCase()}</H1>
    <p>{wordlist[0].length} letter words: {wordlist.length}</p>
    <p>level: {level}</p>
  </WordDiv>
}

const WordDiv = styled.div`
  display: ${ props => props.visibility}
`

const H1 = styled.h1`
  text-align: center;
`