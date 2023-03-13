import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Checkbox = (props) => {
  return (
    <StyledCheckbox
      isChecked={props.isChecked}
      onClick={props.handleBoxChecked}
    >
      X
    </StyledCheckbox>
  );
};

const StyledCheckbox = styled.div`
  position: relative;
  height: 20px;
  width: 20px;
  outline-color: #000000;
  border: 2px solid black;
  left: 175px;
  top: 25px;
  background-color: white;
  font-size: 20px;
  line-height: 20px;
`;

Checkbox.propTypes = {
  isChecked: PropTypes.bool,
  handleBoxChecked: PropTypes.func,
};

export default Checkbox;
