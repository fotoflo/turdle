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
      id={`${label}-key`}
      status={status}
      onClick={()=>keydownHandler({key: label})}
      className="text-center align-middle"
    >
      {label.toUpperCase()}
    </KeyBox>
    )
  }


  const KeyBox = styled(Col)`
  line-height: 3rem;
  text-align: center;
  border: 1px solid grey;
  border-radius: 3px;
  margin: 2px;
  height: 3rem;
  min-width: 20px;
  font-size: 1.8rem;
  background-color: ${ (props) =>  props.theme[props.status]   };
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