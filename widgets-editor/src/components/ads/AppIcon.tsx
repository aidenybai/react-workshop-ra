import React, { useMemo } from "react";
import styled from "styled-components";
import { Size } from "./Button";
import { CommonComponentProps, Classes } from "./common";

// Import all the icons here

export const AppIconCollection = [
  // List all the icon names here
] as const;

export type AppIconName = typeof AppIconCollection[number];

type cssAttributes = {
  width: number;
  height: number;
  padding: number;
};

const appSizeHandler = (size: Size): cssAttributes => {
  // Implement the logic for different sizes
};

const IconWrapper = styled.a<AppIconProps & { styledProps: cssAttributes }>`
  // Implement the styling for the icon wrapper
`;

export type AppIconProps = CommonComponentProps & {
  size?: Size;
  name: AppIconName;
};

const AppIcon = (props: AppIconProps) => {
  const styledProps = useMemo(() => appSizeHandler(props.size || Size.medium), [
    props,
  ]);

  let returnIcon;
  switch (props.name) {
    // Implement the logic to return the correct icon based on the name
  }
  return returnIcon ? (
    <IconWrapper
      data-cy={props.cypressSelector}
      {...props}
      className={Classes.APP_ICON}
      styledProps={styledProps}
    >
      {returnIcon}
    </IconWrapper>
  ) : null;
};

export default AppIcon;
