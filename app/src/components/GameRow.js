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
              (e,j)=>{
                return <GameSlot
                  key={`row-${gameRow}__slot-${j}`}
                  gameboardState={gameboardState}
                  gameRow={gameRow}
                  gameSlot={j}
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