import React from 'react';

import { Button, Modal } from 'react-bootstrap';

const LevelUpModal = ({showLevelUpModal, levelUpModalToggler}) => {

  return (
    <>
      <Modal show={showLevelUpModal} onHide={levelUpModalToggler}>
        <Modal.Header closeButton>
          <Modal.Title>LEVEL UP!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Yay! You leveled up</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={levelUpModalToggler}>
            Ok
          </Button>
        </Modal.Footer> 
      </Modal>
    </>
  );
}


export default LevelUpModal