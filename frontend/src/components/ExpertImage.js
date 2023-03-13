import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
// import CommentModal from "./CommentModal";
import axios from "axios";
import Checkbox from "./Checkbox";
import Select from "react-select";
import Button from "@mui/material/Button";
import MapModal from "./MapModal";
import uploadFileToS3 from "./UploadImageSecure";
import deleteFileFromS3 from "./DeleteImageSecure";
import extractImageCoordinates from "./ExtractImageCoordinates";

const ExpertImage = ({
  image,
  handleAddFileId,
  handleRemoveFile,
  submitTriggered,
  coordinate,
  handleMarkAsValid,
  handleAddFile,
  observationId,
}) => {
  const firstRender = useRef(true);

  // data object values
  const [fileId, setFileId] = useState("");
  const [bucketId] = useState("");
  const [footSelection, setFootSelection] = useState(null);
  const [captureDateTime] = useState("");
  const [latitude, setLatitude] = useState(51);
  const [longitude, setLongitude] = useState(0);
  const [comment, setComment] = useState("");
  const [alreadySubmitted, setAlreadySubmitted] = useState(null);

  const [initialLatitude, setInitialLatitude] = useState(latitude);
  const [initialLongitude, setInitialLongitude] = useState(longitude);
  const [coordinatesSupplied, setCoordinatesSupplied] = useState(false);

  const [s3Path, setS3Path] = useState("");

  const animalFootOptions = [
    { value: "frontleft", label: "Front Left" },
    { value: "frontright", label: "Front Right" },
    { value: "backleft", label: "Back Left" },
    { value: "backright", label: "Back Right" },
    { value: "unknown", label: "Unknown" },
  ];
  const [footSelectionPlaceholder, setFootSelectionPlaceholder] =
    useState("Select Animal Foot");
  const [isDeleted, setIsDeleted] = useState(false);
  const [imageEnlarged, setImageEnlarged] = useState(false);
  const [mapModalActive, setMapModalActive] = useState(false);

  const submitImageData = async () => {
    if (!alreadySubmitted && !isDeleted) {
      let bodyFormData = new FormData();
      bodyFormData.append("file_id", fileId);
      bodyFormData.append("bucket_id", bucketId);
      bodyFormData.append("version_id", "10");
      bodyFormData.append("observationId", observationId);
      bodyFormData.append("userId", "120");
      bodyFormData.append("s3_full_path", s3Path);
      bodyFormData.append("original_filename", image.name);
      bodyFormData.append("s3_thumbnail_path", "");

      bodyFormData.append("file_type", "image");
      bodyFormData.append("body_part", "footprint");

      bodyFormData.append("foot", footSelection);

      bodyFormData.append("upload_datetime", new Date());
      bodyFormData.append("capture_datetime", captureDateTime);

      bodyFormData.append("latitude", latitude);
      bodyFormData.append("longitude", longitude);

      bodyFormData.append("geohash", "");
      bodyFormData.append("comment", comment);
      axios({
        method: "post",
        url: "https://nga6lztzn8.execute-api.us-east-2.amazonaws.com/_api/v1/media/file",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          console.log("SUCCESS", response);
          // add file id to list for observation PUT request
          handleAddFileId(response.data._id);
          setAlreadySubmitted(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleMetadataFromUpload = (key, url) => {
    // TODO: should be full path
    setFileId(key);
    setS3Path(url);
    handleAddFile(key);
  };

  const handleSetLatitude = (coord) => {
    setLatitude(coord);
  };
  const handleSetLongitude = (coord) => {
    setLongitude(coord);
  };
  const handleFootSelection = (foot) => {
    setFootSelection(foot);
    let selection = animalFootOptions.find((x) => x.value === foot);
    setFootSelectionPlaceholder(selection.label);
  };
  const handleBoxChecked = () => {
    if (!isDeleted) {
      setIsDeleted(true);
      handleRemoveFile(fileId);
    }
  };
  const handleEnlargeImage = () => {
    imageEnlarged ? setImageEnlarged(false) : setImageEnlarged(true);
  };

  const handleOpenMapModal = () => {
    if (mapModalActive) {
      setMapModalActive(false);
    } else {
      setInitialLatitude(latitude);
      setInitialLongitude(longitude);
      setMapModalActive(true);
    }
  };

  const closeMapModal = () => {
    setMapModalActive(false);
  };

  const handleAddCoordinates = (lat, long) => {
    if (lat !== undefined && long !== undefined) {
      setLatitude(lat);
      setLongitude(long);
      setCoordinatesSupplied(true);
    }
  };

  useEffect(() => {
    if (firstRender.current === true) {
      uploadFileToS3(image.file, handleMetadataFromUpload);
      firstRender.current = false;
    }
  }, []);

  useEffect(() => {
    extractImageCoordinates(image.file, handleAddCoordinates);
  }, [coordinate]);

  useEffect(() => {
    if (isDeleted) {
      deleteFileFromS3(fileId, s3Path);
    }
  }, [isDeleted]);

  useEffect(() => {
    if (submitTriggered) {
      submitImageData();
    }
  }, [submitTriggered]);

  useEffect(() => {
    if (footSelection !== "" && latitude !== 51 && longitude !== 0) {
      handleMarkAsValid(fileId);
    }
  }, [footSelection, latitude, longitude]);

  return (
    <>
      {!isDeleted && (
        <div>
          <Container>
            {alreadySubmitted && <div>{alreadySubmitted}</div>}
            <Caption>{image.name}</Caption>
            <Checkbox handleBoxChecked={handleBoxChecked} />
            {imageEnlarged ? (
              <>
                <Modal />
                <PopUp>
                  <StyledEnlargedImageMetadata>
                    <LargeImage
                      onClick={handleEnlargeImage}
                      src={image.src}
                      alt="User Uploaded Image"
                    />
                    {(latitude !== 51 || longitude !== 0) && (
                      <StyledCoordinates>
                        <div>Latitude: {parseFloat(latitude.toFixed(3))}</div>
                        <div>
                          Longitude: {parseFloat(longitude.toFixed(3))}{" "}
                        </div>
                      </StyledCoordinates>
                    )}
                    {!coordinatesSupplied && (
                      <div>
                        {latitude !== 51 || longitude !== 0 ? (
                          <Button
                            variant="contained"
                            color="success"
                            onClick={handleOpenMapModal}
                          >
                            Edit Location
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            color="error"
                            onClick={handleOpenMapModal}
                          >
                            Add Location
                          </Button>
                        )}
                      </div>
                    )}
                    <Caption>Foot Selection:</Caption>
                    {footSelection ? (
                      <StyledSelect
                        onChange={(e) => handleFootSelection(e.value)}
                        options={animalFootOptions}
                        placeholder={footSelectionPlaceholder}
                      />
                    ) : (
                      <RequiredSelect
                        onChange={(e) => handleFootSelection(e.value)}
                        options={animalFootOptions}
                        placeholder={footSelectionPlaceholder}
                      />
                    )}
                    <StyledCommentEntry
                      onChange={(e) => setComment(e.target.value)}
                      value={comment}
                      placeholder="Enter a comment for this image"
                    ></StyledCommentEntry>
                    <StyledCloseEnlargeButton
                      variant="contained"
                      color="error"
                      onClick={handleEnlargeImage}
                    >
                      Close Modal
                    </StyledCloseEnlargeButton>
                  </StyledEnlargedImageMetadata>
                </PopUp>
              </>
            ) : (
              <>
                <Image
                  onClick={handleEnlargeImage}
                  src={image.src}
                  alt="User Uploaded Image"
                />
                {footSelection ? (
                  <StyledSelect
                    onChange={(e) => handleFootSelection(e.value)}
                    options={animalFootOptions}
                    placeholder={footSelectionPlaceholder}
                  />
                ) : (
                  <RequiredSelect
                    onChange={(e) => handleFootSelection(e.value)}
                    options={animalFootOptions}
                    placeholder={footSelectionPlaceholder}
                  />
                )}
                {!coordinatesSupplied && (
                  <>
                    {latitude !== 51 || longitude !== 0 ? (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={handleOpenMapModal}
                      >
                        Edit Location
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleOpenMapModal}
                      >
                        Add Location
                      </Button>
                    )}
                  </>
                )}
                <StyledCommentEntry
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  placeholder="Enter a comment for this image"
                ></StyledCommentEntry>
              </>
            )}
          </Container>
          <MapModal
            latitude={latitude}
            longitude={longitude}
            handleSetLatitude={handleSetLatitude}
            handleSetLongitude={handleSetLongitude}
            closeMapModal={closeMapModal}
            show={mapModalActive}
            initialLatitude={initialLatitude}
            initialLongitude={initialLongitude}
          />
        </div>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  position: relative;
`;

// const Overlay = styled.div`
//   display: ${(props) => (props.isChecked ? "none" : "block")};
//   position: absolute; /* Sit on top of the page content */
//   width: 200px; /* Full width (cover the whole page) */
//   height: 100%; /* Full height (cover the whole page) */
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
//   z-index: 500; /* Specify a stack order in case you're using a different order for other elements */
//   cursor: pointer; /* Add a pointer on hover */
// `;

const Caption = styled.div`
  font-size: 20px;
`;

const StyledSelect = styled(Select)`
  border: 1px solid #4caf50;
  border-radius: 5px;
`;

const RequiredSelect = styled(Select)`
  border: 1px solid #ef5350;
  border-radius: 5px;
`;

const Image = styled.img`
  max-width: 200px;
  max-height: 200px;
  width: auto;
  height: auto;
  display: ${(props) => (props.footMenuActive ? "none" : "block")};
`;

const StyledCloseEnlargeButton = styled(Button)`
  width: 100px;
`;

const PopUp = styled.div`
  height: 90vh;
  width: 75vw;
  position: fixed;
  left: 10vw;
  top: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  z-index: 1000;
`;

const LargeImage = styled.img`
  height: 65vh;
`;

const StyledEnlargedImageMetadata = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 50%;
  padding: 30px;
  align-items: center;
`;

const StyledCoordinates = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledCommentEntry = styled.textarea`
  width: 97%;
`;

const Modal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 60%;
}
`;

ExpertImage.propTypes = {
  image: PropTypes.string,
  handleAddFileId: PropTypes.func,
  handleAddFile: PropTypes.func,
  handleRemoveFile: PropTypes.func,
  submitTriggered: PropTypes.bool,
  coordinate: PropTypes.object,
  handleMarkAsValid: PropTypes.object,
  observationId: PropTypes.string,
};

export default ExpertImage;
