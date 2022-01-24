import React from 'react';
import PropTypes from 'prop-types';

import GameSlot from './GameSlot'
import { Container, Row } from 'react-bootstrap';

// import { Col, Row, Button } from 'react-bootstrap';
// import {FaSignOutAlt} from 'react-icons/fa'

function GameRow({gameRow, gameboardState, ...props}){

    return (
      <Container>
        <Row>
          { 
            Array(gameboardState.slots).fill(0).map(
              (e,i)=>{
                return <GameSlot
                  key={`row-${gameRow}__slot-${i}`}
                  gameboardState={gameboardState}
                  gameRow={gameRow}
                  slot={i}
                  {...props} 
                />
              })

          }

        </Row>
      </Container>
    )
}


GameRow.propTypes = {
  activeLetter: PropTypes.string.isRequired,
  setActiveLetter: PropTypes.func.isRequired,
}

export default GameRow