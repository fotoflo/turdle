import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';

function KeyboardLetter({label, keydownHandler, gameboardState, ...props}){

  const [status, setStatus] = useState(0)

  useEffect(()=>{
    const matchingChars = gameboardState.chars
      .filter( c => c.letter === label && c.status !== 0)
      .sort( (a , b) =>  b.status - a.status  )
    
    let status = 0
    if(matchingChars && matchingChars[0]){
      status = matchingChars[0].status || 0;
    }
    setStatus(status)
  }, [gameboardState, label])

  return (
    <KeyBox 
      {...props}
      status={status}
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
  background-color: ${ (props) =>  props.theme[props.status]   };
  font-size: 2rem;
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