import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import Button from "@mui/material/Button";

const MapModal = (props) => {
  // const handleCancelMapModal = () => {
  //   props.setLat("");
  //   props.setLong("");
  //   props.closeMapModal();
  // };

  // const props.initialLatitude = props.latitude;
  // const props.initialLongitude = props.longitude;

  const handleCancelComment = () => {
    props.handleSetLatitude(props.initialLatitude);
    props.handleSetLongitude(props.initialLongitude);
    props.closeMapModal();
  };

  // const [latitude, setLatitude] = useState(0);
  // const [longitude, setLongitude] = useState(0);
  const [markerLat, setMarkerLat] = useState(props.initialLatitude);
  const [markerLong, setMarkerLong] = useState(props.initialLongitude);

  function MyComponent() {
    useMapEvents({
      dragend: (e) => {
        console.log("mapCenter", e.target.getCenter());
        console.log("map bounds", e.target.getBounds());
        const center = e.target.getCenter();
        props.handleSetLatitude(center.lat);
        props.handleSetLongitude(center.lng);
        setMarkerLat(center.lat);
        setMarkerLong(center.lng);
      },
    });
    return null;
  }

  return (
    <>
      {props.show ? (
        <Container>
          <Modal></Modal>
          <PopUp>
            <MapContainer
              center={[props.latitude, props.longitude]}
              zoom={13}
              scrollWheelZoom={true}
              style={{ height: "100vh" }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {markerLat !== 0 && markerLong !== 0 && (
                <Marker position={[markerLat, markerLong]}></Marker>
              )}
              <MyComponent />
            </MapContainer>
            <CoordinateContainer>
              <div>Latitude: {props.latitude}</div>
              <div>Longitude: {props.longitude}</div>
            </CoordinateContainer>
            <ButtonContainer>
              <CancelButton
                color="error"
                variant="contained"
                onClick={handleCancelComment}
              >
                Cancel
              </CancelButton>
              <StyledButton variant="contained" onClick={props.closeMapModal}>
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
  display: block;
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

const CoordinateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 200px;
  margin-bottom: 15px;
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

const StyledButton = styled(Button)`
  height: 30px;
`;

const CancelButton = styled(Button)`
  height: 30px;
`;

MapModal.propTypes = {
  closeMapModal: PropTypes.func,
  show: PropTypes.bool,
  handleSetLatitude: PropTypes.func,
  handleSetLongitude: PropTypes.func,
  latitude: PropTypes.long,
  longitude: PropTypes.long,
  initialLatitude: PropTypes.long,
  initialLongitude: PropTypes.long,
};

export default MapModal;
