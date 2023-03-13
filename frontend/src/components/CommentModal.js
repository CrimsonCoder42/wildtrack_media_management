import React from "react";
import styled from "styled-components";
import CommentField from "./CommentField";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

const CommentModal = (props) => {
  const handleCancelComment = () => {
    props.handleComment(props.initialComment);
    props.closeCommentModal();
  };

  return (
    <>
      {props.show ? (
        <Container>
          <Modal></Modal>
          <PopUp>
            <ColumnContainer>
              <StyledImage src={props.imageSrc} />
              <CommentField
                handleComment={props.handleComment}
                currentValue={props.currentValue}
              />
            </ColumnContainer>
            <ButtonContainer>
              <CancelButton
                color="error"
                variant="contained"
                onClick={handleCancelComment}
              >
                Cancel
              </CancelButton>
              <StyledButton
                variant="contained"
                onClick={props.closeCommentModal}
              >
                Save
              </StyledButton>
            </ButtonContainer>
          </PopUp>
        </Container>
      ) : null}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 200px;
`;

const PopUp = styled.div`
  height: 90vh;
  width: 75vw;
  background-color: white;
  border: 2px solid black;
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

const StyledButton = styled(Button)`
  height: 30px;
`;

const CancelButton = styled(Button)`
  height: 30px;
`;

const StyledImage = styled.img`
  height: 65vh;
`;

const Modal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  opacity: 60%;
}
`;

CommentModal.propTypes = {
  currentValue: PropTypes.string,
  handleComment: PropTypes.func,
  closeCommentModal: PropTypes.func,
  show: PropTypes.bool,
  imageSrc: PropTypes.string,
  initialComment: PropTypes.string,
};

export default CommentModal;
