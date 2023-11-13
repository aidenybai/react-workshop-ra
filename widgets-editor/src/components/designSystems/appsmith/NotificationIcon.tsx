import styled, { keyframes } from "styled-components";
import { hexToRgb } from "utils/AppsmithUtils";

const pulseAnimation = (color: string) => keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(${hexToRgb(color)}, 0.4);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(${hexToRgb(color)}, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(${hexToRgb(color)}, 0);
  }
`;

const NotificationIcon = styled.span<{
  animate?: boolean;
  width?: number;
  height?: number;
  color?: string;
}>`
  &&& {
    display: block;
    width: ${(props) => props.width || 8}px;
    height: ${(props) => props.height || 8}px;
    border-radius: 50%;
    background: ${(props) => props.color || props.theme.colors.notification};
    cursor: pointer;
    box-shadow: 0 0 0 rgba(${(props) => hexToRgb(props.color || props.theme.colors.notification)}, 0.4);
    animation: ${(props) => (!!props.animate ? pulseAnimation(props.color || props.theme.colors.notification) + " 2s infinite" : "")};

    &:hover {
      animation: none;
    }
  }
`;

export default NotificationIcon;
