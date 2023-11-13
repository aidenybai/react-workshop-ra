import React, { ReactNode } from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "store";
import { OnboardingStep } from "constants/OnboardingConstants";

const shineAnimation = (width: number) => keyframes`
  0% {
    transform: translateX(-100px) skewX(-15deg);
  }
  100% {
    transform: translateX(${width}px) skewX(-15deg);
  }
`;

const Wrapper = styled.div<{ width: number; hasButton?: boolean; isWidgetMenu?: boolean }>`
  position: relative;

  & ${(props) => (props.hasButton ? "button" : "*")} {
    position: relative;
    background-size: 400% 400%;
    overflow: hidden;
  }

  & ${(props) => (props.hasButton ? "button" : "*")}::before {
    content: "";
    display: block;
    position: absolute;
    background: rgba(255, 255, 255, 0.5);
    width: 60px;
    height: 100%;
    top: 0;
    filter: blur(30px);
    animation: ${shineAnimation(100)} 1.3s ease infinite;
  }

  & ${(props) => (props.hasButton ? "button" : "*")}::after {
    content: "";
    display: block;
    position: absolute;
    background: rgba(255, 255, 255, 0.2);
    width: 30px;
    height: 100%;
    top: 0;
    filter: blur(5px);
    animation: ${shineAnimation(100)} 1.3s ease infinite;
  }

  &.onboarding-widget-menu {
    & ${(props) => (props.hasButton ? "button" : "*")}::before {
      background: rgba(255, 255, 255, 0.7);
      width: 20px;
      filter: blur(25px);
      animation: ${shineAnimation(100)} 1.2s ease infinite;
    }

    & ${(props) => (props.hasButton ? "button" : "*")}::after {
      background: rgba(255, 255, 255, 0.4);
      width: 20px;
      animation: ${shineAnimation(100)} 1.2s ease infinite;
    }
  }
`;

type IndicatorProps = {
  step: OnboardingStep;
  show?: boolean;
  width?: number;
  hasButton?: boolean;
  children: ReactNode;
  className?: string;
};

const Indicator: React.FC<IndicatorProps> = (props: IndicatorProps) => {
  const showingIndicator = useSelector(
    (state) => state.ui.onBoarding.showingIndicator,
  );

  if (showingIndicator === props.step && props.show) {
    return (
      <Wrapper
        hasButton={props.hasButton}
        width={props.width || 250}
        className={`t--onboarding-indicator ${props.className} ${props.isWidgetMenu ? "onboarding-widget-menu" : ""}`}
      >
        {props.children}
      </Wrapper>
    );
  }

  return <>{props.children}</>;
};

Indicator.defaultProps = {
  show: true,
  hasButton: true,
};

export default Indicator;
