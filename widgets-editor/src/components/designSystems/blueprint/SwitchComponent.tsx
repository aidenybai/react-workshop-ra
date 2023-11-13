import React from "react";
import styled from "styled-components";
import { Switch } from "@blueprintjs/core";
import { Alignment, Classes } from "@blueprintjs/core";
import { AlignWidget } from "widgets/SwitchWidget";
import { ComponentProps } from "../appsmith/BaseComponent";

interface SwitchComponentProps extends ComponentProps {
  label: string;
  isSwitchedOn: boolean;
  onChange: (isSwitchedOn: boolean) => void;
  isLoading: boolean;
  alignWidget: AlignWidget;
}

const SwitchComponentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  .${Classes.CONTROL} {
    margin: 0;
  }
  &.${Alignment.RIGHT} {
    justify-content: flex-end;
  }
`;

export const SwitchComponent: React.FC<SwitchComponentProps> = ({
  label,
  isSwitchedOn,
  alignWidget,
  onChange,
  isLoading,
}) => {
  const switchAlignClass =
    alignWidget === "RIGHT" ? Alignment.RIGHT : Alignment.LEFT;

  return (
    <SwitchComponentContainer className={switchAlignClass}>
      <Switch
        alignIndicator={switchAlignClass}
        label={label}
        className={
          isLoading
            ? `${Classes.SKELETON} t--switch-widget-loading`
            : `${
                isSwitchedOn
                  ? "t--switch-widget-active"
                  : "t--switch-widget-inactive"
              }`
        }
        checked={isSwitchedOn}
        onChange={() => onChange(!isSwitchedOn)}
      />
    </SwitchComponentContainer>
  );
};
