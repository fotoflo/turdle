import React from 'react'
import styled from 'styled-components'

function InfoBox({chidlren}){
    return (
      <Box>{children}</Box>
    )
}

const Box = styled.div`
  border: 1px solid grey;
  background-color: ivory;
  height: 8rem;
  font-size: 10px;
  overflow: hidden;
  margin-bottom: 12px;
`
export default InfoBox