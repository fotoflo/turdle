import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import KeyboardLetter from './KeyboardLetter'
import styled from 'styled-components';

function Keyboard({...props}){

    return (
      <KeyboardRow>
        <KeyboardContainer>
          <KeyRow>
            <KeyboardLetter {...props} label="q"/>
            <KeyboardLetter {...props} label="w" />
            <KeyboardLetter {...props} label="e" />
            <KeyboardLetter {...props} label="r" />
            <KeyboardLetter {...props} label="t" />
            <KeyboardLetter {...props} label="y" />
            <KeyboardLetter {...props} label="u" />
            <KeyboardLetter {...props} label="i" />
            <KeyboardLetter {...props} label="o" />
            <KeyboardLetter {...props} label="p" />
          </KeyRow>
          <KeyRow>
            <KeyboardLetter {...props} label="a" />
            <KeyboardLetter {...props} label="s" />
            <KeyboardLetter {...props} label="d" />
            <KeyboardLetter {...props} label="f" />
            <KeyboardLetter {...props} label="g" />
            <KeyboardLetter {...props} label="h" />
            <KeyboardLetter {...props} label="j" />
            <KeyboardLetter {...props} label="k" />
            <KeyboardLetter {...props} label="l" />
          </KeyRow>
          <KeyRow>
            <KeyboardLetter {...props} label="ENTER" />
            <KeyboardLetter {...props} label="z" />
            <KeyboardLetter {...props} label="x" />
            <KeyboardLetter {...props} label="c" />
            <KeyboardLetter {...props} label="v" />
            <KeyboardLetter {...props} label="b" />
            <KeyboardLetter {...props} label="n" />
            <KeyboardLetter {...props} label="m" />
            <KeyboardLetter {...props} label="⌫" />
          </KeyRow>
        </KeyboardContainer>
      </KeyboardRow>
    )
}

const KeyboardContainer = styled.div`
  flex-wrap: nowrap;
`


 // contains the whole keyboard
const KeyboardRow = styled.div`
`

//contains a row of keys
const KeyRow = styled.div` 
  display: flex;
  flex-wrap: nowrap;
`


Keyboard.propTypes = {
  keydownHandler: PropTypes.func.isRequired
}

export default Keyboard