import React from "react";
import backArrow from "../images/backArrow.svg";
import styled from "styled-components";
import PropTypes from "prop-types";

const NextArrowSinglePage = (props) => {
  return (
    <div>
      <Arrow onClick={() => props.handleNextPage()} src={backArrow} />
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

NextArrowSinglePage.propTypes = {
  handleNextPage: PropTypes.func,
};

export default NextArrowSinglePage;
