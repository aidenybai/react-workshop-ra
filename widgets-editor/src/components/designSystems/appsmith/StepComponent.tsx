import React from "react";
import { ControlIcons } from "icons/ControlIcons";
import { AnyStyledComponent } from "styled-components";
import styled from "constants/DefaultTheme";

const StepWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #121518;
  border-radius: 4px;
  height: 32px;
  line-height: 32px;
`;

const InputWrapper = styled.div`
  width: calc(100% - 80px);
  height: 32px;
  line-height: 32px;
  background: #23292e;
  font-size: 14px;
  color: ${(props) => props.theme.colors.textOnDarkBG};
  text-align: center;
  letter-spacing: 1.44px;
`;

interface StepComponentProps {
  value: number;
  min: number;
  max: number;
  steps: number;
  displayFormat: (value: number) => string;
  onChange: (value: number) => void;
}

export const StepComponent = (props: StepComponentProps) => {
  function decrease() {
    if (props.value < props.min) {
      return;
    }
    const value = props.value - props.steps;
    props.onChange(value);
  }
  function increase() {
    if (props.value > props.max) {
      return;
    }
    const value = props.value + props.steps;
    props.onChange(value);
  }
  return (
    <StepWrapper>
      <ControlIcons.DECREASE_CONTROL height={2} width={12} onClick={decrease} />
      <InputWrapper>{props.displayFormat(props.value)}</InputWrapper>
      <ControlIcons.INCREASE_CONTROL height={12} width={12} onClick={increase} />
    </StepWrapper>
  );
};

export default StepComponent;
