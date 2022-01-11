import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

// import { Col, Row, Button } from 'react-bootstrap';
// import {FaSignOutAlt} from 'react-icons/fa'

function HelloStr({str}){

    return (
      <Text>Hello {str}</Text>
    )
}

const Text = styled.p`
  color: red;
`

HelloStr.propTypes = {
  str: PropTypes.string.isRequired,
  // user: PropTypes.shape({
  //   phoneNumber: null
  // })
}

export default HelloStr