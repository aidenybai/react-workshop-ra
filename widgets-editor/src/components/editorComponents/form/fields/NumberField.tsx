import React from "react";
import { Field, BaseFieldProps } from "redux-form";
import TextInput, { TextInputProps } from "components/ads/TextInput";

type RenderComponentProps = TextInputProps & {
  input?: {
    onChange?: (value: number) => void;
    value?: number;
  };
};

const RenderComponent: React.FC<RenderComponentProps> = (props) => {
  const onChangeHandler = (value: number) => {
    props.input && props.input.onChange && props.input.onChange(value);
  };

  return (
    <TextInput
      dataType={props.dataType}
      defaultValue={props.input?.value?.toString()}
      onChange={(value: string) => onChangeHandler(Number(value))}
    />
  );
};

const NumberField: React.FC<BaseFieldProps & TextInputProps> = (props) => {
  return (
    <Field
      component={RenderComponent}
      {...props}
      noValidate
      disabled={props.disabled}
    />
  );
};

export default NumberField;
