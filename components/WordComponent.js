import React from "react"
import styled from "styled-components"

export const WordComponent = ({showWord, word, wordlist, level}) => {
  if(!showWord) return <></>
  return <>
  <H1>{word.toUpperCase()}</H1>
    <p>{wordlist[0].length} letter words: {wordlist.length}</p>
    <p>level: {level}</p>
  </>
}

const H1 = styled.h1`
  text-align: center;
`