import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

const SvgContainer = styled.svg`
  animation: ${rotate} 2s linear infinite;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;

const SvgCircle = styled.circle`
  stroke: ${(props) => props.theme.colors.spinner};
  stroke-linecap: round;
  animation: ${dash} 1.5s ease-in-out infinite;
  stroke-width: ${(props) => props.theme.spaces[1]}px;
`;

export type SpinnerProps = {
  size?: number;
};

Spinner.defaultProp = {
  size: 20,
};

export default function Spinner(props: SpinnerProps) {
  return (
    <SvgContainer
      viewBox="0 0 50 50"
      size={props.size}
    >
      <SvgCircle cx="25" cy="25" r="20" fill="none"></SvgCircle>
    </SvgContainer>
  );
}
