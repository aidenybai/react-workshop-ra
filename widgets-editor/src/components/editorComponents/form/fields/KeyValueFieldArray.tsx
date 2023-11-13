import React, { useEffect } from "react";
import { FieldArray, WrappedFieldArrayProps } from "redux-form";
import styled from "styled-components";
import DynamicTextField from "./DynamicTextField";
import FormRow from "components/editorComponents/FormRow";
import FormLabel from "components/editorComponents/FormLabel";
import Text, { Case, TextType } from "components/ads/Text";

const KeyValueStackContainer = styled.div`
  padding: ${(props) => props.theme.spaces[4]}px
    ${(props) => props.theme.spaces[14]}px
    ${(props) => props.theme.spaces[11] + 1}px
    ${(props) => props.theme.spaces[11] + 2}px;
`;
const FormRowWithLabel = styled(FormRow)`
  flex-wrap: wrap;
  ${FormLabel} {
    width: 100%;
  }
`;

const AddMoreAction = styled.div`
  width: fit-content;
  cursor: pointer;
  display: flex;
  margin-top: 16px;
  margin-left: 12px;
  .${Classes.TEXT} {
    margin-left: 8px;
    color: #858282;
  }
`;

const Flex = styled.div<{ size: number }>`
  flex: ${(props) => props.size};
  ${(props) =>
    props.size === 3
      ? `
    margin-left: ${props.theme.spaces[4]}px;
  `
      : null};
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 30px);

  .key-value {
    padding: ${(props) => props.theme.spaces[2]}px 0px
      ${(props) => props.theme.spaces[2]}px
      ${(props) => props.theme.spaces[1]}px;
    .${Classes.TEXT} {
      color: ${(props) => props.theme.colors.apiPane.text};
    }
  }
  .key-value:nth-child(2) {
    margin-left: ${(props) => props.theme.spaces[4]}px;
  }
`;

const KeyValueRow = (props: Props & WrappedFieldArrayProps) => {
  useEffect(() => {
    // Always maintain 2 rows
    if (props.fields.length < 2 && props.pushFields) {
      for (let i = props.fields.length; i < 2; i += 1) {
        props.fields.push({ key: "", value: "" });
      }
    }
  }, [props.fields, props.pushFields]);

  return (
    <KeyValueStackContainer>
      <FlexContainer>
        <Flex size={1} className="key-value">
          <Text type={TextType.H6} case={Case.CAPITALIZE}>
            Key
          </Text>
        </Flex>
        <Flex size={3} className="key-value">
          <Text type={TextType.H6} case={Case.CAPITALIZE}>
            Value
          </Text>
        </Flex>
      </FlexContainer>
      {props.fields.length > 0 && (
        <React.Fragment>
          {props.fields.map((field: any, index: number) => {
            return (
              <FormRowWithLabel key={index}>
                <Flex size={1}>
                  <DynamicTextField
                    name={`${field}.key`}
                    placeholder={`Key ${index + 1}`}
                  />
                </Flex>
                <Flex size={3}>
                  <DynamicTextField
                    name={`${field}.value`}
                    placeholder={`Value ${index + 1}`}
                  />
                </Flex>
              </FormRowWithLabel>
            );
          })}
        </React.Fragment>
      )}
      <AddMoreAction onClick={() => props.fields.push({ key: "", value: "" })}>
        <Text type={TextType.H5} case={Case.UPPERCASE}>
          Add more
        </Text>
      </AddMoreAction>
    </KeyValueStackContainer>
  );
};

type Props = {
  name: string;
  label: string;
  pushFields?: boolean;
};

const KeyValueFieldArray = (props: Props) => {
  return (
    <FieldArray
      component={KeyValueRow}
      rerenderOnEveryChange={false}
      {...props}
    />
  );
};

export default KeyValueFieldArray;
