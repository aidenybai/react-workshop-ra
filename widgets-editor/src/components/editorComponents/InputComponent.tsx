import React from "react";
import styled from "styled-components";
import { Intent as BlueprintIntent, InputGroup } from "@blueprintjs/core";
import { Intent, BlueprintInputTransform } from "constants/DefaultTheme";
import { WrappedFieldInputProps } from "redux-form";

const StyledInputGroup = styled(InputGroup)`
  &&& {
    ${BlueprintInputTransform};
  }
`;

export type InputType = "text" | "password" | "number" | "email" | "tel";

type InputComponentProps = {
  placeholder: string;
  input: Partial<WrappedFieldInputProps>;
  type?: InputType;
  intent?: Intent;
  disabled?: boolean;
  autoFocus?: boolean;
};

const InputComponent: React.FC<InputComponentProps> = (props) => {
  const { placeholder, input, type, intent, disabled, autoFocus } = props;
  return (
    <StyledInputGroup
      {...input}
      disabled={disabled}
      placeholder={placeholder}
      type={type}
      intent={intent as BlueprintIntent}
      autoFocus={autoFocus}
    />
  );
};

export default InputComponent;
