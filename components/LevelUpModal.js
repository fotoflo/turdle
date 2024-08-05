import React, { useEffect } from "react";
import styled from "styled-components";

import { Button, Modal } from "react-bootstrap";
import { useKeyboard } from "./hooks/useKeyboard";
import useDefinition from "./hooks/useDefinition";
import Definition from "./Definition";

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
        <Modal.Body>
          <div>
            <h2>
              The word was&nbsp; &quot;
              <strong>{wordRef.current.toUpperCase()}</strong>
              &quot;
            </h2>
          </div>
          <Definition word={wordRef.current} />
        </Modal.Body>
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
    width: 100%;
    height: 100%;
  }

  & .modal-dialog {
    display: flex;
    align-items: flex-start; // Change from center to flex-start
    justify-content: center;
    padding-top: 20vh; // This will push the modal 20% down from the top
  }

  & .modal-dialog-centered {
    min-height: calc(100% - 1rem);
  }
`;

export default LevelUpModal;
