import React, { useState, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import ShowExpertImage from "../components/ShowExpertImage";
import DropBox from "../components/DropBox";
import PropTypes from "prop-types";
import CommentField from "../components/CommentField";
import FootprintMetadataExpert from "../components/FootprintMetadataExpert";
import Button from "@mui/material/Button";
import GetObservationID from "../components/GetObservationID";
import { useNavigate } from "react-router-dom";

const FootprintUploadExpert = ({
  createObservation,
  deleteObservation,
  observationId,
}) => {
  let navigate = useNavigate();
  const [isUploadPage, setUploadPage] = useState(true);

  const firstRender = useRef(true);

  const handleBackPage = () => {
    setUploadPage(true);
  };

  const handleNextPage = () => {
    if (validatePhotos()) {
      setSubmitTriggered(true);
      setUploadPage(false);
    } else {
      setValidationError(
        "Please supply foot selection and coordinates for all photos"
      );
    }
  };

  const [fileIds, setFileIds] = useState([]);
  const [metadataValidation, setMetadataValidation] = useState({});

  const [comment, setComment] = useState("");
  const [submitTriggered, setSubmitTriggered] = useState(false);

  const [validationError, setValidationError] = useState("");

  const [images, setImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImages((prevState) => [
          ...prevState,
          {
            id: GetObservationID(),
            src: e.target.result,
            name: file.path,
            file: file,
          },
        ]);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const handleMarkAsValid = (fileId) => {
    let tempDict = metadataValidation;
    tempDict[fileId] = true;
    setMetadataValidation(tempDict);
  };

  const handlePreviousPage = () => {
    deleteObservation();
    navigate("/media-upload/photo/photo-type");
  };

  // Checks if all required fields are supplied
  const validatePhotos = useCallback(() => {
    let isAllValid = true;
    for (const [key, value] of Object.entries(metadataValidation)) {
      console.log(key);
      console.log(value);
      if (value === false) {
        isAllValid = false;
      }
    }
    return isAllValid;
  }, []);

  const handleAddFileId = (fileId) => {
    setFileIds((prevState) => [...prevState, fileId]);
  };

  const handleAddFile = (s3Key) => {
    let tempDict = metadataValidation;
    tempDict[s3Key] = false;
    setMetadataValidation(tempDict);
    console.log(s3Key);
    console.log("metadata validation:" + tempDict[s3Key]);
  };

  const handleRemoveFile = (s3Key) => {
    let tempDict = metadataValidation;
    delete tempDict[s3Key];
    setMetadataValidation(tempDict);
  };

  const handleSaveDraft = () => {
    if (validatePhotos()) {
      handleSubmitTriggered();
    } else {
      setValidationError(
        "Please supply foot selection and coordinates for all photos"
      );
    }
    // submit all image post requests
    // submit observation put request (with file_ids)
    // take to home
  };

  const handleSubmitTriggered = () => {
    setSubmitTriggered(true);
  };

  const handleComment = (comment) => {
    setComment(comment);
  };

  useEffect(() => {
    if (submitTriggered) {
      setSubmitTriggered(false);
    }
  }, [submitTriggered]);

  useEffect(() => {
    if (firstRender.current === true) {
      createObservation("image", "footprint");
      firstRender.current = false;
    }
  }, []);

  return (
    <>
      <Container isUploadPage={isUploadPage}>
        <PreviousPageButton
          variant="contained"
          onClick={() => handlePreviousPage()}
        >
          Back
        </PreviousPageButton>
        <UploadContainer>
          <DropBoxContainer>
            <DropBox onDrop={onDrop} />
          </DropBoxContainer>
          <ImageContainer>
            <ShowExpertImage
              images={images}
              handleAddFile={handleAddFile}
              handleRemoveFile={handleRemoveFile}
              submitTriggered={submitTriggered}
              handleMarkAsValid={handleMarkAsValid}
              handleAddFileId={handleAddFileId}
            />
          </ImageContainer>
          {validationError && <ErrorDiv>{validationError}</ErrorDiv>}
          <CommentFieldContainer>
            <CommentField
              handleComment={handleComment}
              currentValue={comment}
              placeholder={"Enter a comment for this batch of photos..."}
            />
          </CommentFieldContainer>
          <DraftButtonContainer>
            <Button variant="contained" onClick={() => handleSaveDraft()}>
              Save as Draft
            </Button>
          </DraftButtonContainer>
        </UploadContainer>
        <NextPageButton variant="contained" onClick={() => handleNextPage()}>
          Next Page
        </NextPageButton>
      </Container>
      <MetadataContainer isUploadPage={isUploadPage}>
        <FootprintMetadataExpert
          handleBackPage={handleBackPage}
          show={isUploadPage}
          userId="1"
          batchComment={comment}
          handleSubmitTriggered={handleSubmitTriggered}
          fileIds={fileIds}
          observationId={observationId}
          handleAddFile={handleAddFile}
        />
      </MetadataContainer>
    </>
  );
};

const Container = styled.div`
  align-content: center;
  justify-content: space-around;
  align-items: stretch;
  flex-wrap: wrap;
  flex-direction: row;
  display: ${(props) => (props.isUploadPage ? "flex" : "none")};
`;

const MetadataContainer = styled.div`
  display: ${(props) => (props.isUploadPage ? "none" : "block")};
`;

// const DeleteButtonContainer = styled.div`
//   margin-top: 50px;
// `;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  width: 75%;
  @media (max-width: 900px) {
    align-content: center;
    align-items: center;
  }
`;

const CommentFieldContainer = styled.div``;

const DropBoxContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DraftButtonContainer = styled.div`
  margin-top: 50px;
  width: 100%;
`;

const NextPageButton = styled(Button)`
  height: 40px;
  width: 120px;
`;

const PreviousPageButton = styled(Button)`
  height: 40px;
  width: 120px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  border: 2px solid grey;
  border-radius: 20px;
  margin-top: 20px;
  @media (max-width: 550px) {
    border: none;
  }
`;

const ErrorDiv = styled.div`
  margin: 20px 0px;
  color: red;
`;

FootprintUploadExpert.propTypes = {
  createObservation: PropTypes.func,
  deleteObservation: PropTypes.func,
  observationId: PropTypes.func,
};

export default FootprintUploadExpert;
