import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const CommentField = ({ handleComment, currentValue, placeholder }) => {
  return (
    <>
      {currentValue ? (
        <StyledInput
          onChange={(e) => handleComment(e.target.value)}
          value={currentValue}
        ></StyledInput>
      ) : (
        <StyledInput
          onChange={(e) => handleComment(e.target.value)}
          placeholder={placeholder || "Add a note about your observations..."}
        ></StyledInput>
      )}
    </>
  );
};

const StyledInput = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  resize: none;
  ::placeholder {
    font-family: Arial, Helvetica, sans-serif;
  }
  @media (max-width: 500px) {
    width: 90%;
  }
`;

CommentField.propTypes = {
  handleComment: PropTypes.func,
  currentValue: PropTypes.string,
  placeholder: PropTypes.string,
};

export default CommentField;
