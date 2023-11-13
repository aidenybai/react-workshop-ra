import React, { ReactNode } from "react";
import CustomizedDropdown, {
  CustomizedDropdownProps,
} from "pages/common/CustomizedDropdown/index";

type SelectComponentProps = {
  input: {
    value?: string;
    onChange?: (value: string) => void;
  };
  options?: Array<{ id: string; name: string; content?: ReactNode }>;
  placeholder?: string;
  size?: "large" | "small";
  outline?: boolean;
};

export const SelectComponent = (props: SelectComponentProps) => {
  const getDropdownOptions = () => {
    if (props.options) {
      return props.options.map((option) => ({
        content: option.content ? option.content : option.name,
        onSelect: () => {
          props.input.onChange && props.input.onChange(option.id);
        },
        shouldCloseDropdown: true,
      }));
    }
    return [];
  };

  const dropdownProps: CustomizedDropdownProps = {
    sections: [
      {
        isSticky: false,
        options: getDropdownOptions(),
      },
    ],
    trigger: {
      text: props.input.value
        ? props.options &&
          props.options.find((option) => props.input.value === option.id)?.name
        : props.placeholder,
      outline: props?.outline ?? true,
      size: props.size,
    },
    openDirection: "down",
  };
  return <CustomizedDropdown {...dropdownProps} />;
};

export default SelectComponent;
