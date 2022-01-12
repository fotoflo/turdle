import React from 'react';
import PropTypes from 'prop-types';

import GameLetter from './GameLetter'
import { Container, Row } from 'react-bootstrap';

// import { Col, Row, Button } from 'react-bootstrap';
// import {FaSignOutAlt} from 'react-icons/fa'

function GameRow(props){

    return (
      <Container>
        GameRow Props: {JSON.stringify([props])}
        <Row>
          <GameLetter order={0} {...props} />
          <GameLetter order={1} {...props} />
          <GameLetter order={2} {...props} />
          <GameLetter order={3} {...props} />
          <GameLetter order={4} {...props} />
        </Row>
      </Container>
    )
}


GameRow.propTypes = {
  activeLetter: PropTypes.number.isRequired,
  setActiveLetter: PropTypes.func.isRequired,
  gameState: PropTypes.array.isRequired,
  setGameState: PropTypes.func.isRequired
}

export default GameRow