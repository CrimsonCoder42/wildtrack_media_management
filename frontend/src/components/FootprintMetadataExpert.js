import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
// import Select from "react-select";
import UploadAnnotationFile from "./UploadAnnotationFile";
import PropTypes from "prop-types";
import BackArrowSinglePage from "./BackArrowSinglePage";
import Button from "@mui/material/Button";
import CaptivityStatusRadioGroup from "./MetadataQuestions/CaptivityStatusRadioGroup";
import SpecificIndividualRadioGroup from "./MetadataQuestions/SpecificIndividualRadioGroup";
import SingleIndividualRadioGroup from "./MetadataQuestions/SingleIndividualRadioGroup";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

const FootprintMetadataExpert = (props) => {
  //   const nextLocation = "/media-upload/success";

  const [attemptedToSubmit, setAttemptedToSubmit] = useState(false);
  const firstRender = useRef(true);

  // const data = {
  //   file_ids: props.fileIds,
  //   user_id: props.userId,
  //   animal_id: animalName,
  //   species_id: speciesSelected,
  //   comment: props.batchComment,
  //   draft: true,
  //   datetime: new Date(),
  //   sex: animalSex,
  //   environment: `${captivityStatus ? "captive" : "wild"}`,
  // };

  const updateObservationData = () => {
    let bodyFormData = new FormData();
    bodyFormData.append("file_ids", props.fileIds);
    bodyFormData.append("user_id", props.userId);
    bodyFormData.append("animal_id", animalName);
    bodyFormData.append("species_id", speciesSelected);

    bodyFormData.append("comment", props.batchComment);
    bodyFormData.append("status", "True");
    bodyFormData.append("datetime", new Date());
    axios({
      method: "put",
      url: `https://nga6lztzn8.execute-api.us-east-2.amazonaws.com/_api/v1/media/observation/${props.observationId}`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        console.log("SUCCESS", response);
        setObservatioSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const latinSpeciesOptions = [
    <MenuItem key="0" value="1">
      Lorem Ipsum
    </MenuItem>,
  ];

  // const animalSexOptions = [
  //   { value: "female", label: "Female" },
  //   { value: "male", label: "Male" },
  //   { value: "unknown", label: "Unknown" },
  // ];

  const [formComplete, setFormComplete] = useState("");
  const [nameType, setNameType] = useState("commmon");

  const [observationSubmitted, setObservatioSubmitted] = useState(false);

  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [speciesSelected, setSpeciesSelected] = useState("");
  const [showNewSpeciesForm, setShowNewSpeciesForm] = useState(false);
  // const [speciesId, setSpeciesId] = useState();

  const [isSingleAnimal, setIsSingleAnimal] = useState("");
  const [isIndividualKnown, setIsIndividualKnown] = useState("");
  const [showNewAnimalForm, setShowNewAnimalForm] = useState(false);

  const [individualNameOptions, setIndividualNameOptions] = useState([]);
  const [animalName, setAnimalName] = useState("");
  // const [animalId, setAnimalId] = useState("");

  const [captivityStatus, setCaptivityStatus] = useState("");
  // const [animalSex, setAnimalSex] = useState("");

  // const [showAnimalSexError, setShowAnimalSexError] = useState(false);
  const [showAnimalNameError, setAnimalNameError] = useState(false);
  const [showSpeciesError, setSpeciesSelectError] = useState(false);
  const [showSingleAnimalError, setSingleAnimalError] = useState(false);
  const [showSpecificIndividualError, setIndividualKnownError] =
    useState(false);
  const [showCaptivityStatusError, setCaptivityStatusError] = useState(false);

  const handleSpeciesSelected = (event) => {
    setSpeciesSelected(event.target.value);
    setIsSingleAnimal("");
    setIsIndividualKnown("");
    setAnimalName("");
    // setAnimalSex("");
    setCaptivityStatus("");
  };

  const handleClickIsIndividualKnown = (event) => {
    setIsIndividualKnown(event.target.value);
  };

  const handleClickIsSingleAnimal = (event) => {
    setIsSingleAnimal(event.target.value);
    setIsIndividualKnown("");
    setAnimalName("");
    // setAnimalSex("");
    setCaptivityStatus("");
  };

  // const handleClickIndividualIsKnown = () => {
  //   setIsIndividualKnown(true);
  //   setAnimalName("");
  //    // setAnimalSex("");
  //   setCaptivityStatus("");
  // };

  // const handleClickIndividualIsNotKnown = () => {
  //   setIsIndividualKnown(false);
  //   setAnimalName("");
  //    // setAnimalSex("");
  //   setCaptivityStatus("");
  // };

  const handleSetAnimalName = (event) => {
    setAnimalName(event.target.value);
    setFormComplete(true);
  };

  const handleSetCaptivityStatus = (event) => {
    setCaptivityStatus(event.target.value);
    // setAnimalSex("");
  };

  const handleSetCaptivityStatusEnd = (event) => {
    setCaptivityStatus(event.target.value);
    setFormComplete(true);
  };

  const handleNameTypeClick = (event, newNameType) => {
    setNameType(newNameType);
  };

  // Checks if all required fields are supplied
  const dataValidate = useCallback(() => {
    let isAllValid = true;
    if (!speciesSelected) {
      setSpeciesSelectError("Please enter a species name.");
      isAllValid = false;
    } else {
      setSpeciesSelectError(undefined);
    }
    if (!isSingleAnimal) {
      setSingleAnimalError(
        "Please specify whether these photos are from a single animal."
      );
      isAllValid = false;
    } else {
      setSingleAnimalError(undefined);
    }
    if (isSingleAnimal === "true" && !isIndividualKnown) {
      setIndividualKnownError(
        "Please specify whether you know the individual."
      );
      isAllValid = false;
    } else {
      setIndividualKnownError(undefined);
    }
    if (isSingleAnimal && isIndividualKnown === "true" && !animalName) {
      setAnimalNameError("Please select the animal's name.");
      isAllValid = false;
    } else {
      setAnimalNameError(undefined);
    }
    if (
      (isSingleAnimal && isIndividualKnown === "false" && !captivityStatus) ||
      (isSingleAnimal === "false" && !captivityStatus)
    ) {
      setCaptivityStatusError("Please select the animal's captivity status.");
      isAllValid = false;
    } else {
      setCaptivityStatusError(undefined);
    }
    if (isSingleAnimal !== "" && isIndividualKnown === "true" && !animalName) {
      setAnimalNameError("Please select the animal's name.");
      isAllValid = false;
    } else {
      setAnimalNameError(undefined);
    }
    return isAllValid;
  }, [
    speciesSelected,
    isSingleAnimal,
    isIndividualKnown,
    animalName,
    captivityStatus,
  ]);

  const handleSubmitEntry = () => {
    if (dataValidate()) {
      //props.handleSubmitTriggered();
      updateObservationData();
    } else {
      setAttemptedToSubmit(true);
    }
  }; //Tracks if there are changes made

  useEffect(() => {
    if (firstRender.current) {
      loadNames();
      loadSpecies();
      firstRender.current = false;
    }
  }, [
    speciesSelected,
    isSingleAnimal,
    isIndividualKnown,
    animalName,
    captivityStatus,
  ]);

  // Validates input after every change once the user has tried to submit the form once
  useEffect(() => {
    if (attemptedToSubmit) {
      dataValidate();
    }
  }, [attemptedToSubmit, dataValidate]);

  const loadSpecies = () => {
    axios
      .get(
        "https://nga6lztzn8.execute-api.us-east-2.amazonaws.com/_api/v1/media/species"
      )
      .then((response) => {
        console.log("SUCCESS", response.data.items);
        let speciesOptionArray = response.data.items.map(function (item) {
          return (
            <MenuItem key={item._id} value={item._id}>
              {item.name}
            </MenuItem>
          );
        });
        setSpeciesOptions([
          ...speciesOptionArray,
          unknownMenuItem,
          otherMenuItem,
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const unknownMenuItem = (
    <MenuItem key="unknown" value="unknown">
      Unknown
    </MenuItem>
  );

  const otherMenuItem = (
    <MenuItem key="other" value="other">
      Other
    </MenuItem>
  );

  const loadNames = () => {
    axios
      .get(
        "https://nga6lztzn8.execute-api.us-east-2.amazonaws.com/_api/v1/media/animals"
      )
      .then((response) => {
        console.log("SUCCESS", response.data.items);
        let individualNameOptionarray = response.data.items.map(function (
          item
        ) {
          return (
            <MenuItem key={item._id} value={item._id}>
              {item.name}
            </MenuItem>
          );
        });
        setIndividualNameOptions([
          ...individualNameOptionarray,
          unknownMenuItem,
          otherMenuItem,
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(props.fileIds);
  }, [speciesSelected]);

  useEffect(() => {
    speciesSelected === "other"
      ? setShowNewSpeciesForm(true)
      : setShowNewSpeciesForm(false);
  }, [speciesSelected]);

  useEffect(() => {
    animalName === "other"
      ? setShowNewAnimalForm(true)
      : setShowNewAnimalForm(false);
  }, [animalName]);

  //   const submitData = () => {};

  return (
    <>
      {!observationSubmitted && (
        <>
          <Container>
            <FormContainer>
              <Header>New Observations Upload - Images - Footprints</Header>
              <ToggleButtonGroup
                color="primary"
                value={nameType}
                exclusive
                onChange={handleNameTypeClick}
                aria-label="Platform"
              >
                <ToggleButton value="common">Common Names</ToggleButton>
                <ToggleButton value="latin">Latin Names</ToggleButton>
              </ToggleButtonGroup>
              <StyledLabel>
                Please select a Species for this Upload Batch
              </StyledLabel>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Species</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={speciesSelected}
                  label="Species"
                  onChange={handleSpeciesSelected}
                >
                  {nameType === "latin" ? latinSpeciesOptions : speciesOptions}
                </Select>
              </FormControl>
              <SpeciesNameDiv>
                {showSpeciesError && (
                  <ErrorDiv>Please specify a species</ErrorDiv>
                )}
                {showNewSpeciesForm && <PopUp>Suggest a new species</PopUp>}
              </SpeciesNameDiv>
              {speciesSelected !== "" && (
                <>
                  <SingleIndividualRadioGroup
                    value={isSingleAnimal}
                    onChange={handleClickIsSingleAnimal}
                  />
                  {showSingleAnimalError && (
                    <ErrorDiv>{showSingleAnimalError}</ErrorDiv>
                  )}
                </>
              )}
              {isSingleAnimal === "false" && (
                <>
                  <CaptivityStatusRadioGroup
                    value={captivityStatus}
                    onChange={handleSetCaptivityStatus}
                  />
                  {showCaptivityStatusError && (
                    <ErrorDiv>{showCaptivityStatusError}</ErrorDiv>
                  )}
                </>
              )}
              {isSingleAnimal === "true" && (
                <>
                  <SpecificIndividualRadioGroup
                    value={isIndividualKnown}
                    onChange={handleClickIsIndividualKnown}
                  />
                  {showSpecificIndividualError && (
                    <ErrorDiv>{showSpecificIndividualError}</ErrorDiv>
                  )}
                </>
              )}
              {isIndividualKnown === "true" && (
                <>
                  <StyledLabel>
                    {`Please Select the Animal's Name from the list`}
                  </StyledLabel>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{`Name`}</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={animalName}
                      label="Species"
                      onChange={handleSetAnimalName}
                    >
                      {individualNameOptions}
                    </Select>
                  </FormControl>
                  {showAnimalNameError && (
                    <ErrorDiv>{showAnimalNameError}</ErrorDiv>
                  )}
                </>
              )}
              {showNewAnimalForm && <PopUp>Suggest we add a new animal</PopUp>}
              {isIndividualKnown === "false" && (
                <>
                  <CaptivityStatusRadioGroup
                    value={captivityStatus}
                    onChange={handleSetCaptivityStatusEnd}
                  />
                  {showCaptivityStatusError && (
                    <ErrorDiv>{showCaptivityStatusError}</ErrorDiv>
                  )}
                </>
              )}
              {/* <AnimalSexDiv>
                <label>Sex</label>
                <Select
                  onChange={(e) => setAnimalSex(e.value)}
                  options={animalSexOptions}
                  placeholder="Select Animal Sex"
                />
                {showAnimalSexError && <ErrorDiv>Please specify sex</ErrorDiv>}
              </AnimalSexDiv> */}
              {formComplete && (
                <AnnotationFileContainer>
                  <UploadAnnotationFile />
                </AnnotationFileContainer>
              )}
            </FormContainer>
            <SubmitButtonContainer>
              <Button onClick={handleSubmitEntry} variant="contained">
                Submit Photos
              </Button>
            </SubmitButtonContainer>
            <BackArrowSinglePage handleLastPage={props.handleBackPage} />
          </Container>
        </>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: 50px;
`;

const FormContainer = styled.div`
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  padding: 40px;
  margin: 30px 0px 100px;
`;

const ErrorDiv = styled.div`
  color: red;
`;

const SpeciesNameDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 100px;
`;

// const IndividualNameDiv = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 100px;
// `;

const SubmitButtonContainer = styled.div`
  position: fixed;
  right: 20px;
  bottom: 50px;
`;
// const SubmitButton = styled.img`
//   height: 100px;
//   transform: scaleX(-1);
//   @media (max-width: 700px) {
//     height: 75px;
//   }
//   @media (max-width: 500px) {
//     height: 50px;
//     bottom: 20px;
//     right: 5px;
//   }
// `;

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

const AnnotationFileContainer = styled.div``;

const Header = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 36px;
  color: #000000;
`;

const StyledLabel = styled.div``;

FootprintMetadataExpert.propTypes = {
  handleBackPage: PropTypes.func,
  fileIds: PropTypes.array,
  userId: PropTypes.long,
  batchComment: PropTypes.string,
  handleSubmitTriggered: PropTypes.func,
  observationId: PropTypes.string,
};

export default FootprintMetadataExpert;
