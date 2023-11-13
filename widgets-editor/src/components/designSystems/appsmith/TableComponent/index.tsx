import React, { useEffect } from "react";
import Table from "components/designSystems/appsmith/TableComponent/Table";
import {
  ColumnTypes,
  CompactMode,
  ReactTableColumnProps,
  ReactTableFilter,
} from "components/designSystems/appsmith/TableComponent/Constants";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";

export interface ColumnMenuOptionProps {
  content: string | JSX.Element;
  closeOnClick?: boolean;
  isSelected?: boolean;
  editColumnName?: boolean;
  columnAccessor?: string;
  id?: string;
  category?: boolean;
  options?: ColumnMenuSubOptionProps[];
  onClick?: (columnIndex: number, isSelected: boolean) => void;
}

export interface ColumnMenuSubOptionProps {
  content: string | JSX.Element;
  isSelected?: boolean;
  closeOnClick?: boolean;
  onClick?: (columnIndex: number) => void;
  id?: string;
  category?: boolean;
  isHeader?: boolean;
}

interface ReactTableComponentProps {
  widgetId: string;
  widgetName: string;
  searchKey: string;
  isDisabled?: boolean;
  isVisible?: boolean;
  isLoading: boolean;
  editMode: boolean;
  width: number;
  height: number;
  pageSize: number;
  tableData: Array<Record<string, unknown>>;
  columnOrder?: string[];
  disableDrag: (disable: boolean) => void;
  onRowClick: (rowData: Record<string, unknown>, rowIndex: number) => void;
  onCommandClick: (dynamicTrigger: string, onComplete: () => void) => void;
  updatePageNo: (pageNo: number, event?: EventType) => void;
  updateHiddenColumns: (hiddenColumns?: string[]) => void;
  sortTableColumn: (column: string, asc: boolean) => void;
  nextPageClick: () => void;
  prevPageClick: () => void;
  pageNo: number;
  serverSidePaginationEnabled: boolean;
  selectedRowIndex: number;
  selectedRowIndices: number[];
  multiRowSelection?: boolean;
  hiddenColumns?: string[];
  triggerRowSelection: boolean;
  columnSizeMap?: { [key: string]: number };
  handleResizeColumn: (columnSizeMap: { [key: string]: number }) => void;
  handleReorderColumn: (columnOrder: string[]) => void;
  searchTableData: (searchKey: any) => void;
  filters?: ReactTableFilter[];
  applyFilter: (filters: ReactTableFilter[]) => void;
  columns: ReactTableColumnProps[];
  compactMode?: CompactMode;
  updateCompactMode: (compactMode: CompactMode) => void;
}

const ReactTableComponent = (props: ReactTableComponentProps) => {
  useEffect(() => {
    // Drag and drop functionality
  });

  const sortTableColumn = (columnIndex: number, asc: boolean) => {
    // Sorting table columns
  };

  const selectTableRow = (row: {
    original: Record<string, unknown>;
    index: number;
  }) => {
    // Selecting table row
  };

  return (
    <Table
      isLoading={props.isLoading}
      width={props.width}
      height={props.height}
      pageSize={props.pageSize || 1}
      widgetId={props.widgetId}
      widgetName={props.widgetName}
      searchKey={props.searchKey}
      columns={props.columns}
      hiddenColumns={props.hiddenColumns}
      columnSizeMap={props.columnSizeMap}
      updateHiddenColumns={props.updateHiddenColumns}
      data={props.tableData}
      editMode={props.editMode}
      handleResizeColumn={props.handleResizeColumn}
      sortTableColumn={sortTableColumn}
      selectTableRow={selectTableRow}
      pageNo={props.pageNo - 1}
      updatePageNo={props.updatePageNo}
      // columnActions={props.columnActions}
      triggerRowSelection={props.triggerRowSelection}
      nextPageClick={() => {
        props.nextPageClick();
      }}
      prevPageClick={() => {
        props.prevPageClick();
      }}
      serverSidePaginationEnabled={props.serverSidePaginationEnabled}
      selectedRowIndex={props.selectedRowIndex}
      selectedRowIndices={props.selectedRowIndices}
      disableDrag={() => {
        props.disableDrag(true);
      }}
      enableDrag={() => {
        props.disableDrag(false);
      }}
      searchTableData={props.searchTableData}
      filters={props.filters}
      applyFilter={props.applyFilter}
      compactMode={props.compactMode}
      updateCompactMode={props.updateCompactMode}
    />
  );
};

export default ReactTableComponent;
