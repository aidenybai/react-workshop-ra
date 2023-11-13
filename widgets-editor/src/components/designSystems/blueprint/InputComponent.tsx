import React, { useState } from "react";
import styled from "styled-components";
import { ControlGroup, TextArea, InputGroup, Label, Classes, Intent, NumericInput, IconName, Button } from "@blueprintjs/core";
import { InputType } from "widgets/InputWidget";
import { WIDGET_PADDING } from "constants/WidgetConstants";
import { Colors } from "constants/Colors";
import ErrorTooltip from "components/editorComponents/ErrorTooltip";
import _ from "lodash";
import { createMessage, INPUT_WIDGET_DEFAULT_VALIDATION_ERROR } from "constants/messages";

const InputComponentWrapper = styled.div`
  // styles here
`;

const InputComponent = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const setFocusState = (isFocused) => {
    props.onFocusChange(isFocused);
  };

  const onTextChange = (event) => {
    props.onValueChange(event.target.value);
  };

  const onNumberChange = (valueAsNum, valueAsString) => {
    props.onValueChange(valueAsString);
  };

  const isNumberInputType = (inputType) => {
    return (
      inputType === "INTEGER" ||
      inputType === "NUMBER" ||
      inputType === "CURRENCY"
    );
  };

  const getIcon = (inputType) => {
    // logic here
  };

  const getType = (inputType) => {
    // logic here
  };

  const onKeyDownTextArea = (e) => {
    // logic here
  };

  const onKeyDown = (e) => {
    // logic here
  };

  const numericInputComponent = () => {
    // logic here
  };

  const textAreaInputComponent = () => {
    // logic here
  };

  const textInputComponent = (isTextArea) => {
    // logic here
  };

  const renderInputComponent = (inputType, isTextArea) => {
    // logic here
  };

  return (
    <InputComponentWrapper>
      {props.label && (
        <Label>{props.label}</Label>
      )}
      <ErrorTooltip
        isOpen={props.isInvalid && props.showError}
        message={
          props.errorMessage ||
          createMessage(INPUT_WIDGET_DEFAULT_VALIDATION_ERROR)
        }
      >
        {renderInputComponent(
          props.inputType,
          props.multiline,
        )}
      </ErrorTooltip>
    </InputComponentWrapper>
  );
};

export default InputComponent;
