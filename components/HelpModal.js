import React from 'react';
import styled from 'styled-components'

import { Button, Modal } from 'react-bootstrap';

const HelpModal = ({showHelpModal, helpModalToggler}) => {

  return (
    <>
      <StyledModal centered show={showHelpModal} onHide={helpModalToggler}>
        <Modal.Header closeButton>
          <Modal.Title>WordCheater Help</Modal.Title>
        </Modal.Header>
        <Modal.Body>Word Cheater helps you cheat at word games like Wordle, scrabble, boggle, and more</Modal.Body>
        <Modal.Body>Just tap a position and a letter. </Modal.Body>
        <Modal.Body>Green letters are in the correct spot</Modal.Body>
        <Modal.Body>Yellow letters are in the word, but wrong spot</Modal.Body>
        <Modal.Body>Grey letters are not in the word</Modal.Body>
        <Modal.Body>White letters ignored (to fix)</Modal.Body>
        <Modal.Footer>
          <Button 
            data-test-id="dismiss-help-modal"
            variant="primary" 
            onClick={helpModalToggler}>
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

export default HelpModal