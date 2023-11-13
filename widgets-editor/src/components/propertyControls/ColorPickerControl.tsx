import React from "react";
import BaseControl, { ControlProps } from "./BaseControl";
import ColorPickerComponent from "components/ads/ColorPickerComponent";

class ColorPickerControl extends BaseControl<ColorPickerControlProps> {
  handleChangeColor = (color: string) => {
    this.updateProperty(this.props.propertyName, color);
  };
  render() {
    const { propertyValue, defaultColor } = this.props;
    const color = propertyValue ? propertyValue : defaultColor;
    return (
      <ColorPickerComponent
        color={color}
        changeColor={this.handleChangeColor}
      />
    );
  }

  static getControlType() {
    return "COLOR_PICKER";
  }
}

export interface ColorPickerControlProps extends ControlProps {
  defaultColor?: string;
}

export default ColorPickerControl;
