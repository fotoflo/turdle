import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';

function KeyboardLetter({label, keydownHandler, gameboardState, ...props}){

  const matchingChars = gameboardState.chars.filter( c => c.letter === label).sort( (a,b) => a.status < b.status)

  console.log(`matching chars ${JSON.stringify(matchingChars)}`)

  return (
    <KeyBox 
      {...props}
      // letterstate={letterState}
      onClick={()=>keydownHandler({key: label})}
      className="text-center align-middle"
    >
      {label.toUpperCase()}
    </KeyBox>
    )
  }


  const KeyBox = styled(Col)`
  margin-top: 10px;
  border: 1px solid grey;
  height: 4rem;
  background-color: ${ (props) =>  props.theme[props.letterstate]   };
  `
  
  KeyboardLetter.propTypes = {
    label: PropTypes.string.isRequired,
    keydownHandler: PropTypes.func.isRequired,
    gameboardState: PropTypes.object.isRequired
    // user: PropTypes.shape({
      //   phoneNumber: null
      // })
    }
    
    export default KeyboardLetter