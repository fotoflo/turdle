import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function GameLetter({
  gameSlot,
  gameboardState,
  gameRow,
  setActiveChar,
  squareSide,
  margin,
  ...props
}) {
  const slotKey = `row-${gameRow}__slot-${gameSlot}`;
  const slotIndex = gameRow * gameboardState.slots + gameSlot;
  const char = gameboardState.chars[slotIndex];

  return (
    <SlotBox
      onClick={() => setActiveChar(slotKey)}
      gameboardState={gameboardState}
      activeChar={gameboardState.activeChar}
      char={char}
      squareSide={squareSide}
      margin={margin}
      gameSlot={gameSlot}
      gameRow={gameRow}
      slotIndex={slotIndex}
      slotKey={slotKey}
      // letterstate={letterState}
    >
      {char.letter.toUpperCase()}
    </SlotBox>
  );
}

const SlotBox = styled.div`
  border: ${(props) => (props.slotKey === props.activeChar ? 3 : 1)}px solid
    ${(props) => (props.slotKey === props.activeChar ? "red" : "grey")};
  background-color: ${(props) => props.theme[props.char.status]};
  height: 100%;
  width: ${(props) => props.squareSide}px;
  border-radius: ${(props) => props.squareSide / 4}px; ;
`;

GameLetter.propTypes = {
  gameSlot: PropTypes.number.isRequired,
  gameRow: PropTypes.number.isRequired,
  setActiveChar: PropTypes.func.isRequired,
  gameboardState: PropTypes.object.isRequired,
};

export default GameLetter;
