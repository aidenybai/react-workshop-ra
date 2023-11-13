import React from "react";
import _ from "lodash";
import { Field } from "redux-form";
import { BaseDropdown, DropdownProps } from "components/designSystems/appsmith/Dropdown";

interface DropdownFieldProps {
  name: string;
  className?: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  placeholder: string;
  width?: number | string;
  isSearchable?: boolean;
  isDisabled?: boolean;
}

const DropdownField = (props: DropdownFieldProps & Partial<DropdownProps>) => {
  const { className, options, width, isSearchable, isDisabled, ...rest } = props;

  return (
    <Field
      className={className}
      component={BaseDropdown}
      format={(value: string) => _.find(options, { value }) || ""}
      normalize={(option: { value: string }) => option.value}
      {...rest}
      width={width}
      isSearchable={isSearchable}
      isDisabled={isDisabled}
    />
  );
};

export default DropdownField;
