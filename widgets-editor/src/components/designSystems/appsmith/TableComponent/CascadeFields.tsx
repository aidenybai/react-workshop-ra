import React, { useState, useEffect, useCallback, useReducer, useMemo } from "react";
import styled from "styled-components";
import { Icon, InputGroup } from "@blueprintjs/core";
import CustomizedDropdown from "pages/common/CustomizedDropdown";
import { Directions } from "utils/helpers";
import { Colors } from "constants/Colors";
import { ControlIcons } from "icons/ControlIcons";
import { AnyStyledComponent } from "styled-components";
import { Skin } from "constants/DefaultTheme";
import AutoToolTipComponent from "components/designSystems/appsmith/TableComponent/AutoToolTipComponent";
import DatePickerComponent from "components/designSystems/blueprint/DatePickerComponent2";
import {
  OperatorTypes,
  Condition,
  ColumnTypes,
  Operator,
} from "components/designSystems/appsmith/TableComponent/Constants";
import {
  DropdownOption,
  ReactTableFilter,
} from "components/designSystems/appsmith/TableComponent/TableFilters";
import { RenderOptionWrapper } from "components/designSystems/appsmith/TableComponent/TableStyledWrappers";
import { debounce } from "lodash";

const StyledRemoveIcon = styled(
  ControlIcons.REMOVE_CONTROL as AnyStyledComponent
)`
  padding: 0;
  position: relative;
  cursor: pointer;
  &.hide-icon {
    display: none;
  }
`;

const LabelWrapper = styled.div`
  width: 105px;
  text-align: center;
  color: ${Colors.BLUE_BAYOUX};
  font-size: 14px;
  font-weight: 500;
`;

const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 14px;
`;

const DropdownWrapper = styled.div<{ width: number }>`
  width: ${(props) => props.width}px;
  margin-left: 10px;
`;

const StyledInputGroup = styled(InputGroup)`
  background: ${Colors.WHITE};
  border: 1px solid #d3dee3;
  box-sizing: border-box;
  border-radius: 4px;
  color: ${Colors.OXFORD_BLUE};
  height: 32px;
  width: 150px;
  margin-left: 10px;
  input {
    box-shadow: none;
  }
`;

const DatePickerWrapper = styled.div`
  margin-left: 10px;
  width: 150px;
`;

const DropdownTrigger = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 32px;
  background: ${Colors.WHITE};
  border: 1px solid #d3dee3;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 14px;
  padding: 5px 12px 7px;
  color: ${Colors.OXFORD_BLUE};
  cursor: pointer;
  &&& span {
    margin-right: 0;
  }
`;

const AutoToolTipComponentWrapper = styled(AutoToolTipComponent)`
  width: 100%;
  color: ${Colors.OXFORD_BLUE};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 5px;
`;

// ... (other constants and types remain unchanged)

const CascadeField = (props: CascadeFieldProps) => {
  const memoizedState = useMemo(() => calculateInitialState(props), [props]);
  return <Fields state={memoizedState} {...props} />;
};

const Fields = (props: CascadeFieldProps & { state: CascadeFieldState }) => {
  const { index, removeFilter, applyFilter, hasAnyFilters } = props;
  const [state, dispatch] = useReducer(CaseCaseFieldReducer, props.state);
  const handleRemoveFilter = () => {
    dispatch({ type: CascadeFieldActionTypes.DELETE_FILTER });
  };
  const selectColumn = (column: DropdownOption) => {
    dispatch({
      type: CascadeFieldActionTypes.SELECT_COLUMN,
      payload: column,
    });
  };
  const selectCondition = (condition: DropdownOption) => {
    dispatch({
      type: CascadeFieldActionTypes.SELECT_CONDITION,
      payload: condition,
    });
  };
  const onValueChange = (value: string) => {
    dispatch({
      type: CascadeFieldActionTypes.CHANGE_VALUE,
      payload: value,
    });
  };
  const onDateSelected = (date: string) => {
    dispatch({
      type: CascadeFieldActionTypes.CHANGE_VALUE,
      payload: date,
    });
  };
  const selectOperator = (option: DropdownOption) => {
    dispatch({
      type: CascadeFieldActionTypes.SELECT_OPERATOR,
      payload: OperatorTypes[option.value as Operator],
    });
  };

  const {
    operator,
    column,
    condition,
    showConditions,
    value,
    showInput,
    showDateInput,
    conditions,
    isDeleted,
    isUpdate,
  } = state;
  useEffect(() => {
    if (!isDeleted && isUpdate) {
      applyFilter({ operator, column, condition, value }, index);
    } else if (isDeleted) {
      removeFilter(index);
    }
  }, [
    operator,
    column,
    condition,
    value,
    isDeleted,
    isUpdate,
    index,
    applyFilter,
    removeFilter,
  ]);

  useEffect(() => {
    dispatch({
      type: CascadeFieldActionTypes.UPDATE_FILTER,
      payload: props,
    });
  }, [props]);

  return (
    <FieldWrapper className="t--table-filter">
      <StyledRemoveIcon
        onClick={handleRemoveFilter}
        height={16}
        width={16}
        color={Colors.RIVER_BED}
        className={`t--table-filter-remove-btn ${
          hasAnyFilters ? "" : "hide-icon"
        }`}
      />
      {index === 1 ? (
        <DropdownWrapper width={95}>
          <RenderOptions
            columns={operatorOptions}
            selectItem={selectOperator}
            value={operator}
            placeholder="or"
            className="t--table-filter-operators-dropdown"
          />
        </DropdownWrapper>
      ) : (
        <LabelWrapper>
          {index === 0 ? "Where" : OperatorTypes[props.operator]}
        </LabelWrapper>
      )}
      <DropdownWrapper width={150}>
        <RenderOptions
          columns={props.columns}
          selectItem={selectColumn}
          value={column}
          showType
          placeholder="Attribute"
          className="t--table-filter-columns-dropdown"
        />
      </DropdownWrapper>
      {showConditions ? (
        <DropdownWrapper width={200}>
          <RenderOptions
            columns={conditions}
            selectItem={selectCondition}
            value={condition}
            placeholder=""
            className="t--table-filter-conditions-dropdown"
          />
        </DropdownWrapper>
      ) : null}
      {showInput ? (
        <RenderInput
          className="t--table-filter-value-input"
          onChange={onValueChange}
          value={value}
        />
      ) : null}
      {showDateInput ? (
        <DatePickerWrapper className="t--table-filter-date-input">
          <DatePickerComponent
            label=""
            dateFormat="DD/MM/YYYY"
            datePickerType="DATE_PICKER"
            onDateSelected={onDateSelected}
            selectedDate={value}
            isDisabled={false}
            isLoading={false}
            enableTimePicker={false}
            widgetId=""
          />
        </DatePickerWrapper>
      ) : null}
    </FieldWrapper>
  );
};

export default CascadeField;
