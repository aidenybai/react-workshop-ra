import React, { forwardRef, Ref } from "react";
import styled from "styled-components";
import { CommonComponentProps, Classes } from "./common";
import { noop } from "lodash";
import { theme } from "constants/DefaultTheme";
import Spinner from "./Spinner";
import { ControlIcons } from "icons/ControlIcons";

export enum IconSize {
  XXS = "extraExtraSmall",
  XS = "extraSmall",
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  XL = "extraLarge",
  XXL = "extraExtraLarge",
  XXXL = "extraExtraExtraLarge",
}

export const sizeHandler = (size?: IconSize) => {
  let iconSize = 0;
  switch (size) {
    case IconSize.XXS:
      iconSize = theme.iconSizes.XXS;
      break;
    case IconSize.XS:
      iconSize = theme.iconSizes.XS;
      break;
    case IconSize.SMALL:
      iconSize = theme.iconSizes.SMALL;
      break;
    case IconSize.MEDIUM:
      iconSize = theme.iconSizes.MEDIUM;
      break;
    case IconSize.LARGE:
      iconSize = theme.iconSizes.LARGE;
      break;
    case IconSize.XL:
      iconSize = theme.iconSizes.XL;
      break;
    case IconSize.XXL:
      iconSize = theme.iconSizes.XXL;
      break;
    case IconSize.XXXL:
      iconSize = theme.iconSizes.XXXL;
      break;
    default:
      iconSize = theme.iconSizes.SMALL;
      break;
  }
  return iconSize;
};

export const IconWrapper = styled.span<IconProps>`
  &:focus {
    outline: none;
  }
  display: flex;
  align-items: center;
  svg {
    width: ${(props) => sizeHandler(props.size)}px;
    height: ${(props) => sizeHandler(props.size)}px;
    path {
      fill: ${(props) => props.fillColor || props.theme.colors.icon.normal};
    }
  }
  ${(props) => (props.invisible ? `visibility: hidden;` : null)};

  &:hover, &:active {
    cursor: pointer;
    path {
      fill: ${(props) => props.theme.colors.icon.hover};
    }
  }
`;

export type IconProps = {
  size?: IconSize;
  name?: string; // Changed from IconName to string
  invisible?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  fillColor?: string;
  isLoading?: boolean; // Added isLoading prop
  cypressSelector?: string; // Added cypressSelector prop
};

const Icon = forwardRef(
  (props: IconProps & CommonComponentProps, ref: Ref<HTMLSpanElement>) => {
    const { name, isLoading, onClick, cypressSelector } = props;
    const IconComponent = ControlIcons[name]; // Use dynamic import for icon component

    return (
      <IconWrapper
        className={Classes.ICON}
        data-cy={cypressSelector}
        ref={ref}
        {...props}
        onClick={onClick || noop}
      >
        {isLoading ? <Spinner size={props.size} /> : <IconComponent width={24} height={24} />}
      </IconWrapper>
    );
  },
);

Icon.displayName = "Icon";

export default Icon;
