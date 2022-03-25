import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'


function Prompt({word, level}){
    if (level != 0) return null



    return (
      <Text>Guess the {word.length} letter word</Text>
    )
}

const Text = styled.p`
  color: red;
`

Prompt.propTypes = {
  word: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
}

export default Prompt