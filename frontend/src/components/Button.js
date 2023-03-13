import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Button = (props) => {
  return (
    <StyledButton isClicked={props.isClicked} onClick={props.handleClick}>
      {props.isClicked ? props.activeTitle : props.defaultTitle}
    </StyledButton>
  );
};

const StyledButton = styled.div`
  border: 1px solid #ccc;
  background-color: ${(props) => (props.isClicked ? "#348E47" : "white")};
  color: ${(props) => (props.isClicked ? "white" : "black")};
  box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  vertical-align: middle;
  max-width: 150px;
  padding: 5px;
  text-align: center;
  :active {
    color: black;
    box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.6);
  }
`;

Button.propTypes = {
  defaultTitle: PropTypes.string,
  handleClick: PropTypes.func,
  isClicked: PropTypes.bool,
  activeTitle: PropTypes.string,
};

export default Button;
