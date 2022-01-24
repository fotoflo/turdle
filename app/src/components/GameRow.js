import React from 'react';
import PropTypes from 'prop-types';

import GameSlot from './GameSlot'
import { Container, Row } from 'react-bootstrap';

// import { Col, Row, Button } from 'react-bootstrap';
// import {FaSignOutAlt} from 'react-icons/fa'

function GameRow(props){

    return (
      <Container>
        <Row>
          <GameSlot gameRow={props.gameRow} slot={0} {...props} />
          <GameSlot gameRow={props.gameRow} slot={1} {...props} />
          <GameSlot gameRow={props.gameRow} slot={2} {...props} />
          <GameSlot gameRow={props.gameRow} slot={3} {...props} />
          <GameSlot gameRow={props.gameRow} slot={4} {...props} />
        </Row>
      </Container>
    )
}


GameRow.propTypes = {
  activeLetter: PropTypes.number.isRequired,
  setActiveLetter: PropTypes.func.isRequired,
}

export default GameRow