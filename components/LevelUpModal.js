import React from "react";
import styled from "styled-components";

import { Button, Modal } from "react-bootstrap";
import { useKeyboard } from "./hooks/useKeyboard";

const LevelUpModal = ({ showLevelUpModal, closeLevelUpModal, wordRef }) => {
  const keydownHandler = (pressedKey) => {
    if (showLevelUpModal === false) return;
    if (pressedKey === "Enter") closeLevelUpModal();
  };

  useKeyboard(keydownHandler);

  return (
    <>
      <StyledModal centered show={showLevelUpModal} onHide={closeLevelUpModal}>
        <Modal.Header closeButton>
          <Modal.Title>&nbsp; LEVEL UP!</Modal.Title>
        </Modal.Header>
        <Modal.Body>&nbsp; Yay! You leveled up &nbsp;</Modal.Body>
        <Modal.Body> The word was {wordRef.current}!!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeLevelUpModal}>
            Ok
          </Button>
        </Modal.Footer>
      </StyledModal>
    </>
  );
};

const StyledModal = styled(Modal)`
  & .modal-content {
    background-color: ${(props) => props.theme.background};
    border: 1px solid ${(props) => props.theme.fontColor};
  }
`;

export default LevelUpModal;
