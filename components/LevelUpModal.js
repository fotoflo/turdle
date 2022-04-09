import React from 'react';
import styled from 'styled-components'

import { Button, Modal } from 'react-bootstrap';
import { useKeyboard } from './useKeyboard';

const LevelUpModal = ({showLevelUpModal, levelUpModalToggler}) => {

  const keydownHandler = (pressedKey) => {
    if(showLevelUpModal === false ) return
    if(pressedKey === 'Enter' ) levelUpModalToggler()
  } 

  useKeyboard(keydownHandler)

  return (
    <>
      <StyledModal centered show={showLevelUpModal} onHide={levelUpModalToggler}>
        <Modal.Header closeButton>
          <Modal.Title>LEVEL UP!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Yay! You leveled up</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={levelUpModalToggler}>
            Ok
          </Button>
        </Modal.Footer> 
      </StyledModal>
    </>
  );
}

const StyledModal = styled(Modal)`
& .modal-content {
  background-color: ${ props => props.theme.background };
  border: 1px solid ${ props => props.theme.fontColor};
}
`


export default LevelUpModal