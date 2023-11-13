import React from "react";
import BaseControl, { ControlProps } from "./BaseControl";
import { ActionCreator } from "components/editorComponents/ActionCreator";

class ActionSelectorControl extends BaseControl<ControlProps> {
  handleValueUpdate = (newValue: string) => {
    const { propertyName } = this.props;
    this.updateProperty(propertyName, newValue);
  };

  render() {
    const { propertyValue, isValid, errorMessage, additionalAutoComplete } = this.props;

    return (
      <ActionCreator
        value={propertyValue}
        isValid={isValid}
        validationMessage={errorMessage}
        onValueChange={this.handleValueUpdate}
        additionalAutoComplete={additionalAutoComplete}
      />
    );
  }

  static getControlType() {
    return "ACTION_SELECTOR";
  }
}

export default ActionSelectorControl;
