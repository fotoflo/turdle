import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const onColor = 'GhostWhite'
const offColor = 'DarkSlateGray'

function ToggleSwitch({className, defaultValue, toggleFn, ...props}){
   const [checked, setChecked] = useState(defaultValue || false);

   const handleChange = () => {
    setChecked(!checked)
    toggleFn()
   }

    return (
      <CheckboxContainer className={className} onClick={ handleChange } >
        <HiddenCheckbox checked={checked} readOnly/>
        <StyledCheckbox checked={checked} readOnly/>
      </CheckboxContainer>
    )
}

ToggleSwitch.propTypes = {
  defaultValue: PropTypes.bool,
}

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  // Hide checkbox visually but remain accessible to screen readers.
  // Source: https://polished.js.org/docs/#hidevisually
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${props => props.checked ? offColor : offColor };
  border-radius: 3px;
  transition: all 150ms;
`


export default ToggleSwitch