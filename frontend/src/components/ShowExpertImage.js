import React from "react";
import ExpertImage from "./ExpertImage";
import PropTypes from "prop-types";
import styled from "styled-components";

const ShowExpertImage = ({
  images,
  submitTriggered,
  handleAddFile,
  handleRemoveFile,
  handleMarkAsValid,
  handleAddFileId,
}) => {
  const show = (image) => {
    return (
      <ExpertImage
        image={image}
        submitTriggered={submitTriggered}
        handleAddFile={handleAddFile}
        handleRemoveFile={handleRemoveFile}
        handleMarkAsValid={handleMarkAsValid}
        handleAddFileId={handleAddFileId}
      />
    );
  };
  return (
    <Container className="container">
      {/* {images.map((e, index) => show(e, coordinates[index]))} */}
      {images.map((e) => show(e))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 50px;
  justify-content: center;
  align-items: flex-start;
  margin: 40px 0px;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 515px) {
    border: none;
  }
`;

ShowExpertImage.propTypes = {
  images: PropTypes.any.isRequired,
  submitTriggered: PropTypes.bool,
  handleAddFile: PropTypes.func,
  handleRemoveFile: PropTypes.func,
  handleMarkAsValid: PropTypes.func,
  handleAddFileId: PropTypes.func,
};

export default ShowExpertImage;
