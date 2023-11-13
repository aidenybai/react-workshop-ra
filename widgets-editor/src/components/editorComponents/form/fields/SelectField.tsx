import React from "react";
import { Field, WrappedFieldMetaProps, WrappedFieldInputProps } from "redux-form";
import DropdownWrapper from "./DropdownWrapper";

type SelectFieldProps = {
  name: string;
  placeholder: string;
  options: Array<{ id: string; value: string; label: string }>;
  size?: "large" | "small";
  outline?: boolean;
};

const renderComponent = (componentProps: SelectFieldProps & {
  meta: Partial<WrappedFieldMetaProps>;
  input: Partial<WrappedFieldInputProps>;
}) => {
  return (
    <React.Fragment>
      <DropdownWrapper {...componentProps} />
    </React.Fragment>
  );
};

export const SelectField = (props: SelectFieldProps) => {
  return (
    <Field
      name={props.name}
      component={renderComponent}
      props={props}
    />
  );
};

export default SelectField;
