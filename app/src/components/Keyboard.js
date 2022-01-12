import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

import KeyboardLetter from './KeyboardLetter'
import { Container, Row } from 'react-bootstrap';

// import { Col, Row, Button } from 'react-bootstrap';
// import {FaSignOutAlt} from 'react-icons/fa'

function Keyboard({str, str2}){

    return (
      <Row>
        <Container>
          <Row justify-content-center>
            <KeyboardLetter label="Q"/>
            <KeyboardLetter label="W" />
            <KeyboardLetter label="E" />
            <KeyboardLetter label="R" />
            <KeyboardLetter label="T" />
            <KeyboardLetter label="Y" />
            <KeyboardLetter label="U" />
            <KeyboardLetter label="I" />
            <KeyboardLetter label="O" />
            <KeyboardLetter label="P" />
          </Row>
          <Row justify-content-center >
            <KeyboardLetter label="A" md={{offset:1}}/>
            <KeyboardLetter label="S" />
            <KeyboardLetter label="D" />
            <KeyboardLetter label="F" />
            <KeyboardLetter label="G" />
            <KeyboardLetter label="H" />
            <KeyboardLetter label="J" />
            <KeyboardLetter label="K" />
            <KeyboardLetter label="L" />
          </Row>
          <Row>
            <KeyboardLetter label="ENTER" />
            <KeyboardLetter label="Z" />
            <KeyboardLetter label="X" />
            <KeyboardLetter label="C" />
            <KeyboardLetter label="V" />
            <KeyboardLetter label="B" />
            <KeyboardLetter label="N" />
            <KeyboardLetter label="M" />
            <KeyboardLetter label="⌫" />
          </Row>
        </Container>
      </Row>
    )
}

const Text = styled.p`
  color: red;
`

Keyboard.propTypes = {
  str: PropTypes.string,
}

export default Keyboard