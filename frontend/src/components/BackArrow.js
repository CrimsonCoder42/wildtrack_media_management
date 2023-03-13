import React from "react";
import { useNavigate } from "react-router-dom";
import backArrow from "../images/backArrow.svg";
import styled from "styled-components";
import PropTypes from "prop-types";

const BackArrow = (props) => {
  let navigate = useNavigate();
  return (
    <div>
      <Arrow onClick={() => navigate(props.prevLocation)} src={backArrow} />
    </div>
  );
};

const Arrow = styled.img`
  height: 100px;
  position: fixed;
  left: 20px;
  bottom: 50px;
  @media (max-width: 700px) {
    height: 75px;
  }
  @media (max-width: 500px) {
    height: 50px;
    bottom: 20px;
    left: 5px;
  }
`;

BackArrow.propTypes = {
  prevLocation: PropTypes.string,
};

export default BackArrow;
