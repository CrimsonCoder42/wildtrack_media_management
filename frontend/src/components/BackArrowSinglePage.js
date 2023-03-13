import React from "react";
import backArrow from "../images/backArrow.svg";
import styled from "styled-components";
import PropTypes from "prop-types";

const BackArrowSinglePage = (props) => {
  return (
    <div>
      <Arrow onClick={() => props.handleLastPage()} src={backArrow} />
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

BackArrowSinglePage.propTypes = {
  handleLastPage: PropTypes.func,
};

export default BackArrowSinglePage;
