import React, { useState } from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";

const UploadAnnotationFile = () => {
  const [file, setFile] = useState();
  const [text, setText] = useState();

  // function handleChange(targetFile) {
  //   setFile(targetFile);
  //   console.log(file);
  // }

  const handleChange = async (e) => {
    setFile(e.target.files[0]);
    console.log(file);
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const fileText = e.target.result;
      setText(fileText);
    };
    reader.readAsText(e.target.files[0]);
  };
  return (
    <StyledFileUpload>
      <StyledUploadContainer>
        <StyledLabel>Upload Annotation File</StyledLabel>
        <FileInput type="file" onChange={(e) => handleChange(e)} />
      </StyledUploadContainer>
      <StyledTextArea readOnly value={text}></StyledTextArea>
    </StyledFileUpload>
  );
};

const FileInput = styled.input`
  width: 100%;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
`;

const StyledFileUpload = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const StyledLabel = styled.div``;

const StyledUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

// UploadAnnotationFile.propTypes = {
//   filePath: PropTypes.string,
// };

export default UploadAnnotationFile;
