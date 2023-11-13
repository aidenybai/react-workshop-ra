import React, { useEffect, useState } from "react";
import Dropdown from "components/ads/Dropdown";

type DropdownWrapperProps = {
  placeholder: string;
  input?: {
    value?: string;
    onChange?: (value?: string) => void;
  };
  options: Array<{ id: string; value: string; label: string }>;
};

const DropdownWrapper = (props: DropdownWrapperProps) => {
  const [selectedOption, setSelectedOption] = useState<string>(props.placeholder);

  const onSelectHandler = (value?: string) => {
    if (props.input && props.input.onChange) {
      props.input.onChange(value);
    }
  };

  useEffect(() => {
    if (props.input && props.input.value) {
      setSelectedOption(props.input.value);
    } else {
      setSelectedOption(props.placeholder);
    }
  }, [props.input, props.placeholder]);

  return (
    <Dropdown
      options={props.options}
      selected={selectedOption}
      onSelect={onSelectHandler}
    />
  );
};

export default DropdownWrapper;
