import React, { Component, FocusEvent } from "react";
import styled from "styled-components";
import { WrappedFieldInputProps, WrappedFieldMetaProps } from "redux-form";
import { IconName, IInputGroupProps, IIntentProps, InputGroup, MaybeElement } from "@blueprintjs/core";
import { ComponentProps } from "./BaseComponent";
import ErrorTooltip from "components/editorComponents/ErrorTooltip";

const TextInput = styled(InputGroup)<{ hasError: boolean }>`
  flex: 1;
  & input {
    border: 1px solid ${(props) => (props.hasError ? props.theme.colors.error : props.theme.colors.border)};
    border-radius: 4px;
    box-shadow: none;
    height: 32px;
    background-color: ${(props) => props.theme.colors.textOnDarkBG};
    &:focus {
      border-color: ${(props) => (props.hasError ? props.theme.colors.error : props.theme.colors.secondary)};
      background-color: ${(props) => props.theme.colors.textOnDarkBG};
      outline: 0;
      box-shadow: none;
    }
  }
  &.bp4-input-group {
    .bp4-input:not(:first-child) {
      padding-left: 35px;
    }
    .bp4-icon {
      border-radius: 4px 0 0 4px;
      margin: 0;
      height: 32px;
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #eef2f5;
      svg {
        height: 20px;
        width: 20px;
        path {
          fill: #979797;
        }
      }
    }
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  position: relative;
`;

export interface TextInputProps extends IInputGroupProps {
  placeholder?: string;
  intent?: IIntentProps["intent"];
  input?: Partial<WrappedFieldInputProps>;
  meta?: Partial<WrappedFieldMetaProps>;
  icon?: IconName | MaybeElement;
  showError?: boolean;
  className?: string;
  type?: string;
  refHandler?: any;
  noValidate?: boolean;
  readonly?: boolean;
  autoFocus?: boolean;
}

interface TextInputState {
  inputIsFocused: boolean;
}

class BaseTextInput extends Component<TextInputProps, TextInputState> {
  constructor(props: TextInputProps) {
    super(props);
    this.state = {
      inputIsFocused: false,
    };
  }

  handleFocus = (e: FocusEvent) => {
    this.setState({ inputIsFocused: true });
    if (this.props.input && this.props.input.onFocus) {
      this.props.input.onFocus(e);
    }
  };
  handleBlur = (e: FocusEvent) => {
    this.setState({ inputIsFocused: false });
    if (this.props.input && this.props.input.onBlur) {
      this.props.input.onBlur(e);
    }
  };
  render() {
    const { input, meta, showError, className, refHandler, ...rest } = this.props;
    const hasError = !!(showError && meta && (meta.touched || meta.active) && meta.error);
    const errorIsOpen = hasError && this.state.inputIsFocused;

    return (
      <InputContainer className={className}>
        <ErrorTooltip message={meta ? meta.error : ""} isOpen={errorIsOpen}>
          <TextInput
            hasError={hasError}
            inputRef={refHandler}
            {...input}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            autoComplete={"off"}
            {...rest}
          />
        </ErrorTooltip>
      </InputContainer>
    );
  }
}

const TextInputComponent = (props: TextInputProps & ComponentProps) => {
  return <BaseTextInput {...props} />;
};

export default TextInputComponent;
