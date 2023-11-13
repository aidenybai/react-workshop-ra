import React from "react";
import styled, { keyframes } from "styled-components";

const bounceDelay = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

const Spinner = styled.div`
  width: 30px;
  text-align: center;

  & > div {
    width: 4px;
    height: 4px;
    background-color: #fff;
    border-radius: 100%;
    display: inline-block;
    animation: ${bounceDelay} 1.4s infinite ease-in-out both;
  }

  & .bounce1 {
    animation-delay: -0.32s;
  }

  & .bounce2 {
    animation-delay: -0.16s;
  }
`;

type Props = {
  className?: string;
};

const ThreeDotLoading = (props: Props) => {
  return (
    <Spinner className={props.className}>
      <div className="bounce1" />
      <div className="bounce2" />
      <div className="bounce3" />
    </Spinner>
  );
};

export default ThreeDotLoading;
