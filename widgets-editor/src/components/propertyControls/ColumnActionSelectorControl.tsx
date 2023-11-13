import React, { ChangeEvent } from "react";
import BaseControl, { ControlProps } from "./BaseControl";
import { StyledPropertyPaneButton } from "./StyledControls";
import { generateReactKey } from "utils/generators";
import styled, { AnyStyledComponent } from "styled-components";
import { FormIcons } from "icons/FormIcons";
import { InputText } from "components/propertyControls/InputTextControl";
import { ActionCreator } from "components/editorComponents/ActionCreator";
import { Size, Category } from "components/ads/Button";

export interface ColumnAction {
  label: string;
  id: string;
  dynamicTrigger: string;
}

const StyledDeleteIcon = styled(FormIcons.DELETE_ICON as AnyStyledComponent)`
  padding: 5px 0px;
  position: absolute;
  right: 0px;
  cursor: pointer;
  top: 0px;
  && svg path {
    fill: ${(props) => props.theme.colors.propertyPane.deleteIconColor};
  }
`;

const InputTextWrapper = styled.div`
  margin-bottom: 8px;
  width: calc(100% - 30px);
`;

const Wrapper = styled.div`
  margin-bottom: 8px;
`;

class ColumnActionSelectorControl extends BaseControl<ColumnActionSelectorControlProps> {
  render() {
    return (
      <React.Fragment>
        {this.props.propertyValue &&
          this.props.propertyValue.map((columnAction: ColumnAction) => {
            return (
              <div key={columnAction.id} style={{ position: "relative" }}>
                <InputTextWrapper>
                  <InputText
                    label={columnAction.label}
                    value={columnAction.label}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement> | string) =>
                      this.updateColumnActionLabel(columnAction, e)
                    }
                    evaluatedValue={columnAction.label}
                    isValid={true}
                    theme={this.props.theme}
                  />
                </InputTextWrapper>
                <Wrapper>
                  <ActionCreator
                    value={columnAction.dynamicTrigger}
                    isValid={(columnAction as any).isValid}
                    validationMessage={(columnAction as any).message}
                    onValueChange={(newValue: string) =>
                      this.updateColumnActionFunction(columnAction, newValue)
                    }
                  />
                </Wrapper>
                <StyledDeleteIcon
                  height={20}
                  width={20}
                  onClick={() => this.removeColumnAction(columnAction)}
                />
              </div>
            );
          })}

        <StyledPropertyPaneButton
          icon="plus"
          tag="button"
          type="button"
          text="New Button"
          onClick={this.addColumnAction}
          size={Size.medium}
          category={Category.tertiary}
        />
      </React.Fragment>
    );
  }

  updateColumnActionLabel = (columnAction: ColumnAction, newValue: ChangeEvent<HTMLTextAreaElement> | string) => {
    const value = typeof newValue !== "string" ? newValue.target.value : newValue;
    const update = this.props.propertyValue.map((a: ColumnAction) =>
      a.id === columnAction.id ? { ...a, label: value } : a
    );
    this.updateProperty(this.props.propertyName, update);
  };

  updateColumnActionFunction = (columnAction: ColumnAction, newValue: string) => {
    const update = this.props.propertyValue.map((a: ColumnAction) =>
      a.id === columnAction.id ? { ...a, dynamicTrigger: newValue } : a
    );
    this.updateProperty(this.props.propertyName, update);
  };

  removeColumnAction = (columnAction: ColumnAction) => {
    const update = this.props.propertyValue.filter((a: ColumnAction) => a.id !== columnAction.id);
    this.updateProperty(this.props.propertyName, update);
  };

  addColumnAction = () => {
    const columnActions = this.props.propertyValue || [];
    const update = columnActions.concat([
      {
        label: "Action",
        id: generateReactKey(),
        actionPayloads: [],
      },
    ]);

    this.updateProperty(this.props.propertyName, update);
  };

  static getControlType() {
    return "COLUMN_ACTION_SELECTOR";
  }
}

export type ColumnActionSelectorControlProps = ControlProps;

export default ColumnActionSelectorControl;
