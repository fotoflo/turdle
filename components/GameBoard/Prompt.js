import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'


function Prompt({word, level, gameboardState}){
    if (level != 0) return null

    if (gameboardState.rows  == 1 ) return (
      <Text>Guess the {word.length} letter word</Text>
    )

    return null
}

const Text = styled.p`
  color: red;
`

Prompt.propTypes = {
  word: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
}

export default Prompt