import React from 'react';
import PropTypes from 'prop-types';

import KeyboardLetter from './KeyboardLetter'
import { Container, Row } from 'react-bootstrap';

function Keyboard({...props}){

    return (
      <Row>
        <Container>
          <Row>
            <KeyboardLetter {...props} label="Q"/>
            <KeyboardLetter {...props} label="W" />
            <KeyboardLetter {...props} label="E" />
            <KeyboardLetter {...props} label="R" />
            <KeyboardLetter {...props} label="T" />
            <KeyboardLetter {...props} label="Y" />
            <KeyboardLetter {...props} label="U" />
            <KeyboardLetter {...props} label="I" />
            <KeyboardLetter {...props} label="O" />
            <KeyboardLetter {...props} label="P" />
          </Row>
          <Row>
            <KeyboardLetter {...props} label="A" />
            <KeyboardLetter {...props} label="S" />
            <KeyboardLetter {...props} label="D" />
            <KeyboardLetter {...props} label="F" />
            <KeyboardLetter {...props} label="G" />
            <KeyboardLetter {...props} label="H" />
            <KeyboardLetter {...props} label="J" />
            <KeyboardLetter {...props} label="K" />
            <KeyboardLetter {...props} label="L" />
          </Row>
          <Row>
            <KeyboardLetter {...props} label="ENTER" />
            <KeyboardLetter {...props} label="Z" />
            <KeyboardLetter {...props} label="X" />
            <KeyboardLetter {...props} label="C" />
            <KeyboardLetter {...props} label="V" />
            <KeyboardLetter {...props} label="B" />
            <KeyboardLetter {...props} label="N" />
            <KeyboardLetter {...props} label="M" />
            <KeyboardLetter {...props} label="⌫" />
          </Row>
        </Container>
      </Row>
    )
}

Keyboard.propTypes = {
  keydownHandler: PropTypes.func.isRequired
}

export default Keyboard