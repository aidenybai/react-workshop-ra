import React from "react";
import BaseControl, { ControlProps } from "./BaseControl";
import { StyledDropDown, StyledDropDownContainer } from "./StyledControls";
import { DropdownOption } from "components/ads/Dropdown";

class DropDownControl extends BaseControl<DropDownControlProps> {
  render() {
    const defaultSelected: DropdownOption = {
      label: "No results.",
      value: undefined,
    };

    const selected: DropdownOption | undefined = this.props.options.find(
      (option) => option.value === this.props.propertyValue,
    );

    const selectedOption = selected ? selected : defaultSelected;

    return (
      <StyledDropDownContainer>
        <StyledDropDown
          options={this.props.options}
          selected={selectedOption}
          onSelect={this.onItemSelect}
          width="231px"
          showLabelOnly={true}
          optionWidth={this.props.optionWidth ? this.props.optionWidth : "231px"}
        />
      </StyledDropDownContainer>
    );
  }

  onItemSelect = (value?: string): void => {
    if (value) {
      this.updateProperty(this.props.propertyName, value);
    }
  };

  isOptionSelected = (selectedOption: DropdownOption) => {
    return selectedOption.value === this.props.propertyValue;
  };

  static getControlType() {
    return "DROP_DOWN";
  }
}

export interface DropDownControlProps extends ControlProps {
  options: DropdownOption[];
  placeholderText: string;
  propertyValue: string;
  optionWidth?: string;
}

export default DropDownControl;
