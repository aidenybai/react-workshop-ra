import React from "react";
import BaseControl, { ControlProps } from "./BaseControl";
import moment from "moment-timezone";
import styled from "styled-components";
import { TimePrecision } from "@blueprintjs/datetime";
import { WidgetProps } from "widgets/BaseWidget";
import { ISO_DATE_FORMAT } from "constants/WidgetValidation";
import DatePickerComponent from "components/ads/DatePickerComponent";

const DatePickerControlWrapper = styled.div<{ isValid: boolean }>`
  display: flex;
  flex-direction: column;
  margin: 8px 0 0 0;
  .vertical-center {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px 0 4px 0;
    .label {
      color: ${(props) => props.theme.colors.paneText};
      font-size: ${(props) => props.theme.fontSizes[3]}px;
    }
    .bp4-control {
      margin-bottom: 0px;
    }
  }
`;

class DatePickerControl extends BaseControl<
  DatePickerControlProps,
  DatePickerControlState
> {
  // ... (constructor and other methods remain unchanged)

  render() {
    const version = this.props.widgetProperties.version;
    const dateFormat =
      version === 2
        ? ISO_DATE_FORMAT
        : this.props.widgetProperties.dateFormat || ISO_DATE_FORMAT;
    const isValid = this.state.selectedDate
      ? this.validateDate(moment(this.state.selectedDate, dateFormat).toDate())
      : true;
    const value =
      this.props.propertyValue && isValid
        ? version === 2
          ? new Date(this.props.propertyValue)
          : this.parseDate(this.props.propertyValue)
        : null;
    return (
      <DatePickerControlWrapper isValid={true}>
        <DatePickerComponent
          formatDate={this.formatDate}
          parseDate={this.parseDate}
          maxDate={this.maxDate}
          minDate={this.minDate}
          placeholder="DD/MM/YYYY HH:mm"
          timePrecision={TimePrecision.MINUTE}
          closeOnSelection={true}
          onChange={this.onDateSelected}
          value={value}
          showActionsBar={true}
        />
      </DatePickerControlWrapper>
    );
  }

  // ... (other methods remain unchanged)

  static getControlType() {
    return "DATE_PICKER";
  }
}

export interface DatePickerControlProps extends ControlProps {
  placeholderText: string;
  propertyValue: string;
  widgetProperties: WidgetProps;
}

interface DatePickerControlState {
  selectedDate?: string;
}

export default DatePickerControl;
