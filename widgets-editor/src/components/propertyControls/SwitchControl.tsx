import React from "react";
import BaseControl, { ControlProps } from "./BaseControl";
import Switch from "components/ads/Switch";

class SwitchControl extends BaseControl<ControlProps> {
  render() {
    return (
      <Switch
        onChange={this.handleToggle}
        defaultChecked={this.props.propertyValue}
        large
      />
    );
  }

  handleToggle = () => {
    this.updateProperty(this.props.propertyName, !this.props.propertyValue);
  };

  static getControlType() {
    return "SWITCH";
  }
}

export type SwitchControlProps = ControlProps;

export default SwitchControl;
