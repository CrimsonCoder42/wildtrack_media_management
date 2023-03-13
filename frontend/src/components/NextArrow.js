import React from "react";
import { useNavigate } from "react-router-dom";
import backArrow from "../images/backArrow.svg";
import styled from "styled-components";
import PropTypes from "prop-types";

const NextArrow = (props) => {
  let navigate = useNavigate();
  return (
    <div>
      <Arrow onClick={() => navigate(props.nextLocation)} src={backArrow} />
    </div>
  );
};

const Arrow = styled.img`
  height: 100px;
  position: fixed;
  right: 20px;
  bottom: 50px;
  transform: scaleX(-1);
  @media (max-width: 700px) {
    height: 75px;
  }
  @media (max-width: 500px) {
    height: 50px;
    bottom: 20px;
    right: 5px;
  }
`;

NextArrow.propTypes = {
  nextLocation: PropTypes.optionalString,
};

export default NextArrow;
