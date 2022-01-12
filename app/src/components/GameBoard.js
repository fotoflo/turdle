import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

import GameLetter from './GameLetter'
import { Container, Row } from 'react-bootstrap';

// import { Col, Row, Button } from 'react-bootstrap';
// import {FaSignOutAlt} from 'react-icons/fa'

function GameBoard({str, str2}){

    return (
      <Container>
        <Row>
          <GameLetter />
          <GameLetter />
          <GameLetter />
          <GameLetter />
          <GameLetter />
        </Row>
      </Container>
    )
}

const Text = styled.p`
  color: red;
`

GameBoard.propTypes = {
  str: PropTypes.string,
}

export default GameBoard