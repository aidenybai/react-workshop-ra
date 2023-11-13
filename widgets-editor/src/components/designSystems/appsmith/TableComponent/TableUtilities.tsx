import React, { useState } from "react";
import { MenuItem, Classes, Button as BButton } from "@blueprintjs/core";
import { AnyStyledComponent } from "styled-components";
import styled from "constants/DefaultTheme";
import { Colors } from "constants/Colors";
import { DropdownOption } from "widgets/DropdownWidget";
import { IconNames } from "@blueprintjs/icons";
import { Select, IItemRendererProps } from "@blueprintjs/select";
import { FontStyleTypes, TextSizes } from "constants/WidgetConstants";

export const renderCell = (
  value: any,
  columnType: string,
  isHidden: boolean,
  cellProperties: CellLayoutProperties,
  tableWidth: number,
) => {
  // unchanged
};

interface RenderActionProps {
  isSelected: boolean;
  columnActions?: ColumnAction[];
  backgroundColor: string;
  buttonLabelColor: string;
  onCommandClick: (dynamicTrigger: string, onComplete: () => void) => void;
}

export const renderActions = (
  props: RenderActionProps,
  isHidden: boolean,
  cellProperties: CellLayoutProperties,
) => {
  // unchanged
};

export const renderEmptyRows = (
  rowCount: number,
  columns: any,
  tableWidth: number,
  page: any,
  prepareRow: any,
) => {
  // unchanged
};

const AscendingIcon = styled(ControlIcons.SORT_CONTROL as AnyStyledComponent)`
  // unchanged
`;

const DescendingIcon = styled(ControlIcons.SORT_CONTROL as AnyStyledComponent)`
  // unchanged
`;

export const TableHeaderCell = (props: {
  columnName: string;
  columnIndex: number;
  isHidden: boolean;
  isAscOrder?: boolean;
  sortTableColumn: (columnIndex: number, asc: boolean) => void;
  isResizingColumn: boolean;
  column: any;
}) => {
  // unchanged
};

export const reorderColumns = (
  columns: Record<string, ColumnProperties>,
  columnOrder: string[],
) => {
  // unchanged
};

export function getDefaultColumnProperties(
  accessor: string,
  index: number,
  widgetName: string,
  isDerived?: boolean,
): ColumnProperties {
  // unchanged
}

export function getTableStyles(props: TableStyles) {
  // unchanged
}

const SingleDropDown = Select.ofType<DropdownOption>();

const StyledSingleDropDown = styled(SingleDropDown)`
  // unchanged
`;

export const renderDropdown = (props: {
  options: DropdownOption[];
  onItemSelect: (onOptionChange: string, item: DropdownOption) => void;
  onOptionChange: string;
  selectedIndex?: number;
}) => {
  // unchanged
};
