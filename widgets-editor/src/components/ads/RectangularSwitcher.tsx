import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Text, { TextType } from "./Text";

type SwitchProps = {
  onSwitch: (value: boolean) => void;
  value: boolean;
  isLoading?: boolean;
  className?: string;
  cypressSelector?: string;
};

const StyledSwitch = styled.label<{
  isLoading?: boolean;
  value: boolean;
  firstRender: boolean;
}>`
  // styles remain unchanged
`;

const Light = styled.div<{ value: boolean }>`
  // styles remain unchanged
`;

const Dark = styled.div<{ value: boolean }>`
  // styles remain unchanged
`;

export default function Switch(props: SwitchProps) {
  const [value, setValue] = useState(false);
  const [firstRender, setFirstRender] = useState(false);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const onChangeHandler = (value: boolean) => {
    setValue(value);
    props.onSwitch && props.onSwitch(value);
  };

  return (
    <StyledSwitch
      data-cy={props.cypressSelector}
      isLoading={props.isLoading}
      value={value}
      className={props.className}
      firstRender={firstRender}
    >
      <input
        type="checkbox"
        checked={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (!firstRender) {
            setFirstRender(true);
          }
          onChangeHandler(e.target.checked);
        }}
      />
      <span className="slider"></span>
      <Light value={value}>
        <Text type={TextType.H6}>Light</Text>
      </Light>
      <Dark value={value}>
        <Text type={TextType.H6}>Dark</Text>
      </Dark>
    </StyledSwitch>
  );
}
