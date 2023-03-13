import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MediaUploadMainMenu from "./pages/MediaUploadMainMenu";
// import styled from "styled-components";
import FootprintUploadExpert from "./pages/FootprintUploadExpert";
import PhotoTypeSelectionMenu from "./pages/PhotoTypeSelectionMenu";
import styled from "styled-components";

function App() {
  const [observationId, setObservationId] = useState("");

  const createObservation = async (fileType, observationType) => {
    let bodyFormData = new FormData();
    bodyFormData.append("file_type", fileType);
    bodyFormData.append("body_part", observationType);
    axios({
      method: "post",
      url: "https://nga6lztzn8.execute-api.us-east-2.amazonaws.com/_api/v1/media/observation",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        console.log("Observation Added:", response);
        setObservationId(response.data._id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteObservation = async () => {
    axios({
      method: "delete",
      url: `https://nga6lztzn8.execute-api.us-east-2.amazonaws.com/_api/v1/media/observation/${observationId}`,
    })
      .then((response) => {
        console.log("Deleted:", response);
        setObservationId("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <Header />
      <Container>
        <Router>
          <Routes>
            <Route path="/media-upload/" element={<MediaUploadMainMenu />} />
            <Route
              path="/media-upload/photo/photo-type"
              element={<PhotoTypeSelectionMenu />}
            />
            <Route
              path="/media-upload/photo/footprint/expert"
              element={
                <FootprintUploadExpert
                  createObservation={createObservation}
                  deleteObservation={deleteObservation}
                  observationId={observationId}
                />
              }
            />
          </Routes>
        </Router>
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 50px;
`;
export default App;
