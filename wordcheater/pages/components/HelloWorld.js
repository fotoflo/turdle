import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

// import { Col, Row, Button } from 'react-bootstrap';
// import {FaSignOutAlt} from 'react-icons/fa'

function HelloWorld({str, str2}){

    return (
      <Text>HelloWorld {str}, {str2 || "can take two props"}</Text>
    )
}

const Text = styled.p`
  color: red;
`

HelloWorld.propTypes = {
  str: PropTypes.string.isRequired,
  // user: PropTypes.shape({
  //   phoneNumber: null
  // })
}

export default HelloWorld