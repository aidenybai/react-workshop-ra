import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Spinner from "./Spinner";

type ToggleProps = {
  onToggle: (value: boolean) => void;
  value: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  cypressSelector?: string;
  className?: string;
};

const StyledToggle = styled.label<{
  isLoading?: boolean;
  disabled?: boolean;
  value: boolean;
}>`
  /* styles remain unchanged */
`;

export default function Toggle(props: ToggleProps) {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const onChangeHandler = (value: boolean) => {
    setValue(value);
    props.onToggle && props.onToggle(value);
  };

  return (
    <StyledToggle
      data-cy={props.cypressSelector}
      isLoading={props.isLoading}
      disabled={props.disabled}
      value={value}
      className={props.className}
    >
      <input
        type="checkbox"
        checked={value}
        disabled={props.disabled || props.isLoading}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChangeHandler(e.target.checked)
        }
      />
      <span className="slider"></span>
      {props.isLoading ? (
        <div className="toggle-spinner">
          <Spinner />
        </div>
      ) : null}
    </StyledToggle>
  );
}
