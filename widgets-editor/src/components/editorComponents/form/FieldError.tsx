import React from "react";
import styled from "styled-components";
import { IntentColors } from "constants/DefaultTheme";

const StyledError = styled.span<{ show: boolean }>`
  text-align: left;
  color: ${IntentColors.danger};
  font-size: ${(props) => props.theme.fontSizes[3]}px;
  opacity: ${(props) => (props.show ? 1 : 0)};
  display: block;
  position: relative;
  margin-top: ${(props) => props.theme.spaces[1]}px;
`;

type FormFieldErrorProps = {
  error?: string;
  className?: string;
};

const FormFieldError: React.FC<FormFieldErrorProps> = (props) => {
  return (
    <StyledError
      className={props.className}
      show={!!props.error}
    >
      {props.error || "\u00A0"}
    </StyledError>
  );
};

export default FormFieldError;
