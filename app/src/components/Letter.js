import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

// import { Col, Row, Button } from 'react-bootstrap';
// import {FaSignOutAlt} from 'react-icons/fa'

function Letter({str, propTwo}){

    return (
      <Text>Hello {str}, {propTwo}</Text>
    )
}

const Text = styled.p`
  color: red;
`

Letter.propTypes = {
  str: PropTypes.string.isRequired,
  // user: PropTypes.shape({
  //   phoneNumber: null
  // })
}

export default Letter