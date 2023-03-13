import React from "react";
import { useNavigate } from "react-router-dom";
import camera from "../images/camera.svg";
import videoCamera from "../images/videoCamera.svg";
import speaker from "../images/speaker.svg";
import styled from "styled-components";

const MediaUploadModule = () => {
  let navigate = useNavigate();
  return (
    <Container>
      <ButtonContainer>
        <div>
          <CameraIcon
            onClick={() => navigate("/media-upload/photo/photo-type")}
            src={camera}
          />
          <Caption>Photo</Caption>
        </div>
        <div>
          <VideoCameraIcon src={videoCamera} />
          <Caption>Video</Caption>
        </div>
        <div>
          <SpeakerIcon src={speaker} />
          <Caption>Audio</Caption>
        </div>
      </ButtonContainer>
    </Container>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 50px;
  row-gap: 50px;
  width: 100%;
  max-width: 2000px;
  margin: 0 50px;
`;

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
`;

const Icon = styled.img`
  height: 100px;
  padding: 50px;
  border-radius: 20px;
  @media (max-width: 710px) {
    height: 50px;
    padding: 20px;
  }
`;

const CameraIcon = styled(Icon)`
  background-color: #348e47;
`;

const VideoCameraIcon = styled(Icon)`
  background-color: #eece25;
`;

const SpeakerIcon = styled(Icon)`
  background-color: #ef9309;
`;

const Caption = styled.div`
  font-size: 40px;
  @media (max-width: 710px) {
    font-size: 25px;
  }
`;

export default MediaUploadModule;
