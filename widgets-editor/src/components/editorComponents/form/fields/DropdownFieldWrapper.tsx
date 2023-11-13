import React, { useEffect, useState } from "react";
import { WrappedFieldInputProps } from "redux-form";
import Dropdown from "components/ads/Dropdown";

type DropdownWrapperProps = {
  placeholder: string;
  input: WrappedFieldInputProps;
  options: Array<{ id?: string; value: string; label?: string }>;
  className?: string;
  width?: string;
  height?: string;
  optionWidth?: string;
};

const DropdownFieldWrapper = (props: DropdownWrapperProps) => {
  const [selectedOption, setSelectedOption] = useState<any>({
    value: props.input.value ? props.input.value.value : props.placeholder,
  });

  const onSelectHandler = (value?: string) => {
    props.input.onChange({ value: value });
  };

  useEffect(() => {
    setSelectedOption({ value: props.input.value ? props.input.value.value : props.placeholder });
  }, [props.input.value, props.placeholder]);

  return (
    <Dropdown
      className={props.className}
      options={props.options}
      selected={selectedOption}
      onSelect={onSelectHandler}
      width={props.width}
      height={props.height}
      optionWidth={props.optionWidth}
    />
  );
};

export default DropdownFieldWrapper;
