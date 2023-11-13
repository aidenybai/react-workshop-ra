import React from "react";
import styled from "styled-components";
import { Checkbox as BlueprintCheckbox, Alignment, Classes } from "@blueprintjs/core";
import { CheckboxComponentProps } from "./types";

const CheckboxContainer = styled.div<{ isValid: boolean; align: Alignment }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: ${(props) =>
    props.align === Alignment.RIGHT ? "flex-end" : "flex-start"};
  align-items: center;

  .bp4-control-indicator {
    border: ${(props) =>
      !props.isValid ? `1px solid ${props.theme.colors.error} !important` : `1px solid transparent`};
  }

  label {
    margin: 0;
    color: ${(props) => (!props.isValid ? `${props.theme.colors.error}` : `inherit`)};
  }
`;

const CheckboxComponent: React.FC<CheckboxComponentProps> = ({
  label,
  isChecked,
  onCheckChange,
  isLoading,
  isRequired,
  alignWidget,
  isDisabled,
}) => {
  const checkboxAlignClass = alignWidget === "RIGHT" ? Alignment.RIGHT : Alignment.LEFT;

  const handleCheckChange = () => {
    onCheckChange(!isChecked);
  };

  return (
    <CheckboxContainer
      isValid={!(isRequired && !isChecked)}
      align={checkboxAlignClass}
    >
      <BlueprintCheckbox
        label={label}
        alignIndicator={checkboxAlignClass}
        className={isLoading ? Classes.SKELETON : Classes.RUNNING_TEXT}
        style={{ borderRadius: 0 }}
        onChange={handleCheckChange}
        disabled={isDisabled}
        checked={isChecked}
      />
    </CheckboxContainer>
  );
};

export default CheckboxComponent;
