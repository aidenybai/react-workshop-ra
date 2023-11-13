import React from "react";
import { Field, BaseFieldProps } from "redux-form";
import { BaseTextInput, TextInputProps } from "components/designSystems/appsmith/TextInputComponent";

type TextFieldProps = {
  type?: string;
  disabled?: boolean;
};

class TextField extends React.Component<BaseFieldProps & TextInputProps & TextFieldProps> {
  render() {
    const { type, disabled, ...rest } = this.props;
    return (
      <Field
        type={type || "text"}
        component={BaseTextInput}
        {...rest}
        noValidate
        disabled={disabled}
      />
    );
  }
}

export default TextField;
