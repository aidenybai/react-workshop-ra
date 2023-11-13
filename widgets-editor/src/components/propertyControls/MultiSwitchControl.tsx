import React from "react";
import BaseControl, { ControlProps } from "./BaseControl";
import { ButtonGroup, Button, Classes } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

class MultiSwitchControl extends BaseControl<MultiSwitchControlProps> {
  renderOption = (option: SwitchOption) => {
    const isIcon: boolean =
      !!option.icon && IconNames[option.icon as keyof typeof IconNames];
    return (
      <Button
        key={option.label || option.icon}
        icon={isIcon ? option.icon as keyof typeof IconNames : undefined}
        text={!isIcon && option.label}
        active={this.props.propertyValue === option.value}
        onClick={() =>
          this.updateProperty(this.props.propertyName, option.value)
        }
      />
    );
  };
  render() {
    return (
      <ButtonGroup className={Classes.DARK}>
        {this.props.options.map(this.renderOption)}
      </ButtonGroup>
    );
  }
  static getControlType() {
    return "MULTI_SWITCH";
  }
}

interface SwitchOption {
  label?: string;
  icon?: string;
  altText?: string;
  value: string | number;
}

export interface MultiSwitchControlProps extends ControlProps {
  options: SwitchOption[];
}

export default MultiSwitchControl;
