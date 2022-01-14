import React from 'react';
import PropTypes from 'prop-types';

import KeyboardLetter from './KeyboardLetter'
import { Container, Row } from 'react-bootstrap';

function Keyboard({keydownHandler, ...props}){

    return (
      <Row>
        <Container>
          <Row>
            <KeyboardLetter onClick={()=>keydownHandler({key:'Q'})} label="Q"/>
            <KeyboardLetter onClick={()=>keydownHandler({key:'W'})} label="W" />
            <KeyboardLetter onClick={()=>keydownHandler({key:'E'})} label="E" />
            <KeyboardLetter onClick={()=>keydownHandler({key:'R'})} label="R" />
            <KeyboardLetter onClick={()=>keydownHandler({key:'T'})} label="T" />
            <KeyboardLetter onClick={()=>keydownHandler({key:'Y'})} label="Y" />
            <KeyboardLetter onClick={()=>keydownHandler({key:'U'})} label="U" />
            <KeyboardLetter onClick={()=>keydownHandler({key:'I'})} label="I" />
            <KeyboardLetter onClick={()=>keydownHandler({key:'O'})} label="O" />
            <KeyboardLetter onClick={()=>keydownHandler({key:'P'})} label="P" />
          </Row>
          <Row>
            <KeyboardLetter onClick={()=>keydownHandler({key:'A'})} label="A" />
            <KeyboardLetter onClick={()=>keydownHandler({key:'S'})} label="S" />
            <KeyboardLetter onClick={()=>keydownHandler({key:'D'})} label="D" />
            <KeyboardLetter onClick={()=>keydownHandler({key:'F'})} label="F" />
            <KeyboardLetter onClick={()=>keydownHandler({key:'G'})} label="G" />
            <KeyboardLetter onClick={()=>keydownHandler({key:'H'})} label="H" />
            <KeyboardLetter onClick={()=>keydownHandler({key:'J'})} label="J" />
            <KeyboardLetter onClick={()=>keydownHandler({key:'K'})} label="K" />
            <KeyboardLetter onClick={()=>keydownHandler({key:'L'})} label="L" />
          </Row>
          <Row>
            <KeyboardLetter onClick={()=>keydownHandler({key:'E'})} label="ENTER" />
            <KeyboardLetter onClick={()=>keydownHandler({key:'Z'})} label="Z" />
            <KeyboardLetter onClick={()=>keydownHandler({key:'X'})} label="X" />
            <KeyboardLetter onClick={()=>keydownHandler({key:'C'})} label="C" />
            <KeyboardLetter onClick={()=>keydownHandler({key:'V'})} label="V" />
            <KeyboardLetter onClick={()=>keydownHandler({key:'B'})} label="B" />
            <KeyboardLetter onClick={()=>keydownHandler({key:'N'})} label="N" />
            <KeyboardLetter onClick={()=>keydownHandler({key:'M'})} label="M" />
            <KeyboardLetter onClick={()=>keydownHandler({key:'⌫'})} label="⌫" />
          </Row>
        </Container>
      </Row>
    )
}

Keyboard.propTypes = {
  keydownHandler: PropTypes.func.isRequired
}

export default Keyboard