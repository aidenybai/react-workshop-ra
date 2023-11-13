import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Classes } from "@blueprintjs/core";
import { Variant } from "./common";
import { Toaster } from "./Toast";
import { createMessage, ERROR_EMPTY_APPLICATION_NAME } from "constants/messages";
import EditableText, { EditableTextProps, SavingState } from "./EditableText";

type EditableTextWrapperProps = EditableTextProps & {
  variant: "UNDERLINE" | "ICON";
  isNewApp: boolean;
};

const Container = styled.div<{
  isEditing?: boolean;
  savingState: SavingState;
  isInvalid: boolean;
}>`
  /* Styles remain unchanged */
`;

export default function EditableTextWrapper(props: EditableTextWrapperProps) {
  const [isEditing, setIsEditing] = useState(props.isNewApp);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsEditing(props.isNewApp);
  }, [props.isNewApp]);

  return (
    <Container
      isEditing={isEditing}
      savingState={props.savingState}
      isInvalid={isValid}
    >
      <EditableText
        defaultValue={props.defaultValue}
        editInteractionKind={props.editInteractionKind}
        placeholder={props.placeholder}
        hideEditIcon={props.hideEditIcon}
        isEditingDefault={props.isNewApp}
        savingState={props.savingState}
        fill={!!props.fill}
        onBlur={(value) => {
          setIsEditing(false);
          props.onBlur && props.onBlur(value);
        }}
        className={props.className}
        onTextChanged={() => setIsEditing(true)}
        isInvalid={(value: string) => {
          setIsEditing(true);
          if (props.isInvalid) {
            setIsValid(Boolean(props.isInvalid(value)));
            return props.isInvalid(value);
          } else if (value.trim() === "") {
            Toaster.show({
              text: createMessage(ERROR_EMPTY_APPLICATION_NAME),
              variant: Variant.danger,
            });
            return false;
          } else {
            return false;
          }
        }}
      />
    </Container>
  );
}
