import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getBorderCSSShorthand, labelStyle, IntentColors } from "constants/DefaultTheme";
import { ControlGroup, Classes, Label } from "@blueprintjs/core";
import { ComponentProps } from "components/designSystems/appsmith/BaseComponent";
import { DateInput } from "@blueprintjs/datetime";
import moment from "moment-timezone";
import "../../../../node_modules/@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import { DatePickerType } from "widgets/DatePickerWidget";
import { WIDGET_PADDING } from "constants/WidgetConstants";
import { TimePrecision } from "@blueprintjs/datetime";
import { Colors } from "constants/Colors";
import { ISO_DATE_FORMAT } from "constants/WidgetValidation";
import ErrorTooltip from "components/editorComponents/ErrorTooltip";
import { createMessage, DATE_WIDGET_DEFAULT_VALIDATION_ERROR } from "constants/messages";

const StyledControlGroup = styled(ControlGroup)<{ isValid: boolean }>`
  &&& {
    .${Classes.INPUT} {
      box-shadow: none;
      color: ${Colors.OXFORD_BLUE};
      font-size: ${(props) => props.theme.fontSizes[3]}px;
      border: ${(props) => getBorderCSSShorthand(props.theme.borders[2])};
      border-color: ${(props) =>
        !props.isValid ? IntentColors.danger : Colors.GEYSER_LIGHT};
      border-radius: 0;
      width: 100%;
      height: inherit;
      align-items: center;
      &:active {
        border-color: ${(props) =>
          !props.isValid ? IntentColors.danger : Colors.HIT_GRAY};
      }
      &:focus {
        border: ${(props) => getBorderCSSShorthand(props.theme.borders[2])};
        border-color: ${(props) =>
          !props.isValid ? IntentColors.danger : "#80bdff"};
        outline: 0;
        box-shadow: 0 0 0 0.1rem rgba(0, 123, 255, 0.25);
      }
    }
    .${Classes.INPUT_GROUP} {
      display: block;
      margin: 0;
    }
    .${Classes.CONTROL_GROUP} {
      justify-content: flex-start;
    }
    label {
      ${labelStyle}
      flex: 0 1 30%;
      margin: 7px ${WIDGET_PADDING * 2}px 0 0;
      text-align: right;
      align-self: flex-start;
      max-width: calc(30% - ${WIDGET_PADDING}px);
    }
  }
`;

const DatePickerComponent: React.FC<DatePickerComponentProps> = (props) => {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(props.selectedDate);

  useEffect(() => {
    const dateFormat = props.dateFormat || ISO_DATE_FORMAT;
    if (
      props.selectedDate !== selectedDate &&
      !moment(props.selectedDate, dateFormat).isSame(
        moment(selectedDate, dateFormat),
        "seconds",
      )
    ) {
      setSelectedDate(props.selectedDate);
    }
  }, [props.selectedDate, selectedDate, props.dateFormat]);

  const getValidDate = (date: string, format: string) => {
    const _date = moment(date, format);
    return _date.isValid() ? _date.toDate() : undefined;
  };

  const now = moment();
  const year = now.get("year");
  const dateFormat = props.dateFormat || ISO_DATE_FORMAT;
  const minDate = props.minDate
    ? getValidDate(props.minDate, dateFormat)
    : now
        .clone()
        .set({ month: 0, date: 1, year: year - 100 })
        .toDate();
  const maxDate = props.maxDate
    ? getValidDate(props.maxDate, dateFormat)
    : now
        .clone()
        .set({ month: 11, date: 31, year: year + 20 })
        .toDate();
  const isValid = selectedDate
    ? isValidDate(parseDate(selectedDate))
    : true;
  const value =
    isValid && selectedDate
      ? parseDate(selectedDate)
      : null;

  const isValidDate = (date: Date): boolean => {
    let isValid = true;
    const dateFormat = props.dateFormat || ISO_DATE_FORMAT;
    const parsedCurrentDate = moment(date);
    if (props.minDate) {
      const parsedMinDate = moment(props.minDate, dateFormat);
      if (
        props.minDate &&
        parsedMinDate.isValid() &&
        parsedCurrentDate.isBefore(parsedMinDate)
      ) {
        isValid = false;
      }
    }
    if (props.maxDate) {
      const parsedMaxDate = moment(props.maxDate, dateFormat);
      if (
        isValid &&
        props.maxDate &&
        parsedMaxDate.isValid() &&
        parsedCurrentDate.isAfter(parsedMaxDate)
      ) {
        isValid = false;
      }
    }
    return isValid;
  };

  const formatDate = (date: Date): string => {
    const dateFormat = props.dateFormat || ISO_DATE_FORMAT;
    return moment(date).format(dateFormat);
  };

  const parseDate = (dateStr: string): Date => {
    const dateFormat = props.dateFormat || ISO_DATE_FORMAT;
    const date = moment(dateStr, dateFormat);

    if (date.isValid()) return moment(dateStr, dateFormat).toDate();
    else return moment().toDate();
  };

  const onDateSelected = (selectedDate: Date, isUserChange: boolean) => {
    if (isUserChange) {
      const { onDateSelected } = props;

      const date = selectedDate ? formatDate(selectedDate) : "";
      setSelectedDate(date);

      onDateSelected(date);
    }
  };

  return (
    <StyledControlGroup
      fill
      isValid={isValid}
      onClick={(e: any) => {
        e.stopPropagation();
      }}
    >
      {props.label && (
        <Label
          className={
            props.isLoading
              ? Classes.SKELETON
              : Classes.TEXT_OVERFLOW_ELLIPSIS
          }
        >
          {props.label}
        </Label>
      )}
      {
        <ErrorTooltip
          isOpen={!isValid}
          message={createMessage(DATE_WIDGET_DEFAULT_VALIDATION_ERROR)}
        >
          <DateInput
            className={props.isLoading ? "bp4-skeleton" : ""}
            formatDate={formatDate}
            parseDate={parseDate}
            placeholder={"Select Date"}
            disabled={props.isDisabled}
            showActionsBar={true}
            timePrecision={TimePrecision.MINUTE}
            closeOnSelection
            onChange={onDateSelected}
            value={value}
            minDate={minDate}
            maxDate={maxDate}
          />
        </ErrorTooltip>
      }
    </StyledControlGroup>
  );
};

interface DatePickerComponentProps extends ComponentProps {
  label: string;
  dateFormat: string;
  enableTimePicker?: boolean;
  selectedDate?: string;
  minDate?: string;
  maxDate?: string;
  timezone?: string;
  datePickerType: DatePickerType;
  isDisabled: boolean;
  onDateSelected: (selectedDate: string) => void;
  isLoading: boolean;
}

export default DatePickerComponent;
