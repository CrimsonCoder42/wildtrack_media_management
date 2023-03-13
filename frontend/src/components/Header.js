import React from "react";
import styled from "styled-components";
import logo from "../images/wildtrackLogo.svg";

const Header = () => {
  return (
    <Container>
      <Logo src={logo} />
    </Container>
  );
};

const Container = styled.div`
  background-color: #4e342e;
  height: 120px;
`;

const Logo = styled.img`
  height: 100px;
  position: absolute;
  left: 20px;
  @media (max-width: 500px) {
    height: 75px;
  }
`;

export default Header;
