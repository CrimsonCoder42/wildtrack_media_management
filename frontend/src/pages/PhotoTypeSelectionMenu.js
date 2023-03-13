import React from "react";
import { useNavigate } from "react-router-dom";
import footprint from "../images/paw.svg";
import carapace from "../images/carapace.svg";
import fullBody from "../images/elephant.svg";
import styled from "styled-components";
import BackArrow from "../components/BackArrow";

const ExpertPhotoUploadModule = () => {
  let navigate = useNavigate();
  let prevLocation = "/media-upload";
  return (
    <Container>
      <ButtonContainer>
        <div>
          <FootprintIcon
            onClick={() => navigate("/media-upload/photo/footprint/expert")}
            src={footprint}
          />
          <Caption>Footprint</Caption>
        </div>
        <div>
          <TrackPlateIcon
            onClick={() => navigate("/media-upload/photo/trackplate/expert")}
            src={footprint}
          />
          <Caption>Trackplate</Caption>
        </div>
        <div>
          <CarapaceIcon
            onClick={() => navigate("/media-upload/photo/carapace/expert")}
            src={carapace}
          />
          <Caption>Carapace</Caption>
        </div>
        <div>
          <FullBodyIcon
            onClick={() => navigate("/media-upload/photo/body/expert")}
            src={fullBody}
          />
          <Caption>Whole Body</Caption>
        </div>
      </ButtonContainer>
      <BackArrow prevLocation={prevLocation} />
    </Container>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 75px;
  row-gap: 75px;
  width: 100%;
  margin: 0 50px;
`;

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-around;
  align-items: stretch;
  flex-wrap: wrap;
`;

const Caption = styled.div`
  font-size: 40px;
  @media (max-width: 710px) {
    font-size: 25px;
  }
`;

const Icon = styled.img`
  height: 100px;
  padding: 50px;
  border-radius: 20px;
  @media (max-width: 700px) {
    height: 50px;
    padding: 20px;
  }
`;

const FootprintIcon = styled(Icon)`
  background-color: #ef9309;
`;

const TrackPlateIcon = styled(Icon)`
  background-color: #ef9309;
`;

const CarapaceIcon = styled(Icon)`
  background-color: #ef9309;
`;

const FullBodyIcon = styled(Icon)`
  background-color: #ef9309;
`;

export default ExpertPhotoUploadModule;
