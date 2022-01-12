import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

import { Card, Col } from 'react-bootstrap';
// import {FaSignOutAlt} from 'react-icons/fa'

function KeyboardLetter({label, md}){

    return (
      <KeyBox md={md}>{label}</KeyBox>
    )
}

const KeyBox = styled(Col)`
  margin-top: 10px;
  border: 1px solid grey;
  height: 4rem;
`

KeyboardLetter.propTypes = {
  label: PropTypes.string.isRequired,
  // user: PropTypes.shape({
  //   phoneNumber: null
  // })
}

export default KeyboardLetter