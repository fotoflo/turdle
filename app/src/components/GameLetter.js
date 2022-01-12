import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

import { Card, Col } from 'react-bootstrap';
// import {FaSignOutAlt} from 'react-icons/fa'

function GameLetter({str, propTwo}){

    return (
      <Col>
        <LetterBox className="col"/>
      </Col>
    )
}

const LetterBox = styled(Card)`
  border: 1px solid grey;
  height: 10rem;
`

GameLetter.propTypes = {
  str: PropTypes.string.isRequired,
  // user: PropTypes.shape({
  //   phoneNumber: null
  // })
}

export default GameLetter