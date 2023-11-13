import React from "react";
import styled from "styled-components";
import { Color } from "constants/Colors";
import { Button } from "@blueprintjs/core";

type CloseButtonProps = {
  color: Color;
  size: number;
  onClick: React.MouseEventHandler;
  className?: string;
};

const StyledButton = styled(Button)<CloseButtonProps>`
  position: absolute;
  top: 0;
  right: 3px;
  justify-content: center;
  padding: 0;
  color: ${(props) => props.color};
  & svg {
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
  }
`;

export const CloseButton: React.FC<CloseButtonProps> = (props) => {
  return (
    <StyledButton
      className={props.className}
      onClick={props.onClick}
      color={props.color}
      size={props.size}
      rightIcon="cross"
      minimal
    />
  );
};
