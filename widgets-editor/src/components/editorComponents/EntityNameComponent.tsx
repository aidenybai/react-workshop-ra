import styled from "styled-components";
import React, { useState } from "react";

import EditPen from "assets/images/EditPen.svg";
import ErrorTooltip from "components/editorComponents/ErrorTooltip";
import {
  FIELD_REQUIRED_ERROR,
  VALID_FUNCTION_NAME_ERROR,
  UNIQUE_NAME_ERROR,
  createMessage,
} from "constants/messages";

const InputContainer = styled.div<{ focused: boolean; isValid: boolean }>`
  align-items: center;
  display: flex;
  position: relative;
  width: 250px;
  input {
    padding: 3px 6px;
    margin-left: 10px;
    transition: font-size 0.2s;
    font-size: ${(props) => (props.focused ? "17px" : "18px")};
    border: 1px solid;
    border-radius: 3px;
    border-color: ${(props) => (props.isValid ? (props.focused ? "hsl(0,0%,80%)" : "white") : "red")};
    display: block;
    width: 100%;
    font-weight: 200;
    line-height: 24px;
    text-overflow: ellipsis;
    :hover {
      border-color: hsl(0, 0 %, 80 %);
      cursor: ${(props) => (props.focused ? "auto" : "pointer")};
    }
  }
`;

const EditPenIcon = styled.img`
  height: 14px;
  width: 14px;
  position: absolute;
  right: 7px;
  :hover {
    cursor: pointer;
  }
`;

export function validateEntityName(name: string, allNames?: string[]) {
  // unchanged
}

interface EntityNameProps {
  onBlur: (event?: any) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  isValid: boolean;
  validationMessage?: string;
  focusOnMount?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  placeholder: string;
}

const EntityNameComponent: React.FC<EntityNameProps> = ({
  onBlur,
  onChange,
  value,
  isValid,
  validationMessage,
  placeholder,
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = (event: { target: { select: () => any } }) => {
    event.target.select();
  };

  const onFocus = () => {
    setFocused(true);
  };

  const onBlurHandler = () => {
    setFocused(false);
    onBlur();
  };

  const onPressEnter = (event: any) => {
    event.preventDefault();
    event.target.blur();
  };

  return (
    <ErrorTooltip isOpen={!isValid} message={validationMessage || ""}>
      <InputContainer focused={focused} isValid={isValid}>
        <input
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onPressEnter(e);
            }
          }}
          onFocus={onFocus}
          onBlur={onBlurHandler}
        />
        {!focused && <EditPenIcon onClick={onFocus} src={EditPen} alt="Edit pen" />}
      </InputContainer>
    </ErrorTooltip>
  );
};

export default EntityNameComponent;
