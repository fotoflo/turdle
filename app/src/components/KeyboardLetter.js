import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { Col } from 'react-bootstrap';

function KeyboardLetter({label, keydownHandler, gameState, ...props}){

    debugger

    return (
      <KeyBox 
        onClick={()=>keydownHandler({key: label})}
        className="text-center align-middle">
          {label}
      </KeyBox>
    )
}

const KeyBox = styled(Col)`
  margin-top: 10px;
  border: 1px solid grey;
  height: 4rem;
`

KeyboardLetter.propTypes = {
  label: PropTypes.string.isRequired,
  keydownHandler: PropTypes.func.isRequired,
  gameState: PropTypes.array.isRequired
  // user: PropTypes.shape({
  //   phoneNumber: null
  // })
}

export default KeyboardLetter