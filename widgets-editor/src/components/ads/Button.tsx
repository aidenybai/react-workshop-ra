import React from "react";
import styled, { css } from "styled-components";
import Icon from "./Icon";
import Spinner from "./Spinner";

export enum Category {
  primary = "primary",
  secondary = "secondary",
  tertiary = "tertiary",
}

export enum Size {
  xxs = "xxs",
  xs = "xs",
  small = "small",
  medium = "medium",
  large = "large",
}

type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  text?: string;
  category?: Category;
  variant?: string;
  className?: string;
  icon?: string;
  size?: Size;
  fill?: boolean;
  href?: string;
  tag?: "a" | "button";
  type?: "submit" | "reset" | "button";
  target?: string;
};

const Button = (props: ButtonProps) => {
  return (
    <button
      className={props.className}
      onClick={(e) => props.onClick && props.onClick(e)}
    >
      {props.text}
    </button>
  );
};

export default Button;
