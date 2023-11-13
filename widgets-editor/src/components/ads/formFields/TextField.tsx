import React from "react";
import { Field, WrappedFieldMetaProps, WrappedFieldInputProps } from "redux-form";
import InputComponent, { InputType } from "../TextInput";
import { Intent } from "constants/DefaultTheme";
import FormFieldError from "./FieldError";

type FormTextFieldProps = {
  name: string;
  placeholder: string;
  type?: InputType;
  label?: string;
  intent?: Intent;
  disabled?: boolean;
  autoFocus?: boolean;
};

const renderComponent = (props: FormTextFieldProps & { meta: Partial<WrappedFieldMetaProps>; input: Partial<WrappedFieldInputProps> }) => {
  const showError = props.meta.touched && !props.meta.active;

  return (
    <React.Fragment>
      <InputComponent {...props} {...props.input} fill />
      <FormFieldError error={showError && props.meta.error} />
    </React.Fragment>
  );
};

const FormTextField = (props: FormTextFieldProps) => {
  return (
    <React.Fragment>
      <Field component={renderComponent} {...props} asyncControl />
    </React.Fragment>
  );
};

export default FormTextField;
