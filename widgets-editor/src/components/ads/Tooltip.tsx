import React from "react";
import { CommonComponentProps } from "./common";
import { Position, Tooltip, PopperBoundary } from "@blueprintjs/core";
import { GLOBAL_STYLE_TOOLTIP_CLASSNAME } from "globalStyles/tooltip";

type Variant = "dark" | "light";

type TooltipProps = CommonComponentProps & {
  content: JSX.Element | string;
  position?: Position;
  children: JSX.Element;
  variant?: Variant;
  maxWidth?: string;
  boundary?: PopperBoundary;
  minWidth?: string;
  openOnTargetFocus?: boolean;
  autoFocus?: boolean;
  hoverOpenDelay?: number;
  minimal?: boolean;
};

const TooltipComponent = (props: TooltipProps) => {
  const { content, position, boundary, autoFocus, hoverOpenDelay, openOnTargetFocus, minimal, children } = props;
  return (
    <Tooltip
      content={content}
      position={position}
      usePortal
      boundary={boundary || "scrollParent"}
      autoFocus={autoFocus}
      hoverOpenDelay={hoverOpenDelay}
      openOnTargetFocus={openOnTargetFocus}
      minimal={minimal}
      popoverClassName={GLOBAL_STYLE_TOOLTIP_CLASSNAME}
      modifiers={{
        preventOverflow: { enabled: false },
      }}
    >
      {children}
    </Tooltip>
  );
};

TooltipComponent.defaultProps = {
  position: Position.TOP,
  variant: "dark",
};

export default TooltipComponent;
