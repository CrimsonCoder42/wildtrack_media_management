import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Switch = (props) => {
  const [firstClicked, setFirstClicked] = useState(false);
  const [secondClicked, setSecondClicked] = useState(false);

  const handleFirstClicked = () => {
    props.handleClick("true");
    if (secondClicked) {
      setSecondClicked(false);
      setFirstClicked(true);
    } else {
      setFirstClicked(true);
    }
  };

  const handleSecondClicked = () => {
    props.handleClick("false");
    if (firstClicked) {
      setFirstClicked(false);
      setSecondClicked(true);
    } else {
      setSecondClicked(true);
    }
  };

  return (
    <StyledContainer>
      <Yes onClick={handleFirstClicked} yesClicked={firstClicked}>
        {props.first}
      </Yes>
      <No onClick={handleSecondClicked} noClicked={secondClicked}>
        {props.second}
      </No>
    </StyledContainer>
  );
};

const Yes = styled.div`
  display: inline-block;
  border: 1px solid #ccc;
  background-color: ${(props) => (props.yesClicked ? "green" : "white")};
  color: ${(props) => (props.yesClicked ? "white" : "black")};
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

const No = styled.div`
  display: inline-block;
  border: 1px solid #ccc;
  background-color: ${(props) => (props.noClicked ? "#348E47" : "white")};
  color: ${(props) => (props.noClicked ? "white" : "black")};
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

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 150px;
`;

Switch.propTypes = {
  handleClick: PropTypes.func,
  first: PropTypes.string,
  second: PropTypes.string,
};

export default Switch;
