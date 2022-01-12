import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

import { Col } from 'react-bootstrap';
// import {FaSignOutAlt} from 'react-icons/fa'

function KeyboardLetter({label}){

    return (
      <KeyBox 
        className="text-center align-middle">
          {label}
      </KeyBox>
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