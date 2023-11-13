import React, { useState } from "react";
import { ControlIcons } from "icons/ControlIcons";
import styled from "styled-components";

const StyledPickMyLocationSelectedIcon = styled(ControlIcons.PICK_MY_LOCATION_SELECTED_CONTROL)`
  position: relative;
  cursor: pointer;
  height: 28px;
  width: 28px;
`;

const PickMyLocationIconWrapper = styled.div`
  background: white;
  width: 40px;
  height: 40px;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
`;

interface PickMyLocationProps {
  updateCenter: (lat: number, long: number) => void;
}

const PickMyLocation: React.FC<PickMyLocationProps> = ({ updateCenter }) => {
  const [selected, setSelected] = useState(false);
  const [clicked, setClicked] = useState(false);

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      return navigator.geolocation.getCurrentPosition((data) => {
        const {
          coords: { latitude: lat, longitude: long },
        } = data;
        setSelected(true);
        updateCenter(lat, long);
      });
    }
  };

  return (
    <PickMyLocationIconWrapper>
      <StyledPickMyLocationSelectedIcon
        color={
          selected
            ? "#049ADA"
            : clicked
            ? "#666666"
            : "#999999"
        }
        onClick={() => {
          if (!(clicked && selected)) {
            setClicked(true);
            getUserLocation();
          }
        }}
      />
    </PickMyLocationIconWrapper>
  );
};

export default PickMyLocation;
