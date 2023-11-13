import React, { useMemo, useRef } from "react";
import {
  useTable,
  usePagination,
  useBlockLayout,
  useResizeColumns,
  useRowSelect,
} from "react-table";
import { TableWrapper } from "./TableStyledWrappers";
import { ReactTableFilter } from "components/designSystems/appsmith/TableComponent/TableFilters";
import { TableHeaderCell, renderEmptyRows } from "./TableUtilities";
import TableHeader from "./TableHeader";
import { Classes } from "@blueprintjs/core";
import {
  ReactTableColumnProps,
  TABLE_SIZES,
  CompactMode,
  CompactModeTypes,
} from "components/designSystems/appsmith/TableComponent/Constants";
import { Colors } from "constants/Colors";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import ScrollIndicator from "components/ads/ScrollIndicator";

interface TableProps {
  width: number;
  height: number;
  pageSize: number;
  widgetId: string;
  widgetName: string;
  searchKey: string;
  isLoading: boolean;
  columnSizeMap?: { [key: string]: number };
  columns: ReactTableColumnProps[];
  hiddenColumns?: string[];
  updateHiddenColumns: (hiddenColumns?: string[]) => void;
  data: Array<Record<string, unknown>>;
  editMode: boolean;
  sortTableColumn: (columnIndex: number, asc: boolean) => void;
  handleResizeColumn: (columnSizeMap: { [key: string]: number }) => void;
  selectTableRow: (row: {
    original: Record<string, unknown>;
    index: number;
  }) => void;
  pageNo: number;
  updatePageNo: (pageNo: number, event?: EventType) => void;
  nextPageClick: () => void;
  prevPageClick: () => void;
  serverSidePaginationEnabled: boolean;
  selectedRowIndex: number;
  selectedRowIndices: number[];
  disableDrag: () => void;
  enableDrag: () => void;
  triggerRowSelection: boolean;
  searchTableData: (searchKey: any) => void;
  filters?: ReactTableFilter[];
  applyFilter: (filters: ReactTableFilter[]) => void;
  compactMode?: CompactMode;
  updateCompactMode: (compactMode: CompactMode) => void;
}

const defaultColumn = {
  minWidth: 30,
  width: 150,
};

const Table: React.FC<TableProps> = (props) => {
  const isResizingColumn = useRef(false);
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  const handleResizeColumn = (columnWidths: Record<string, number>) => {
    // Function body remains the same
  };

  const data = useMemo(() => props.data, [props.data]);
  const columnString = JSON.stringify({
    columns: props.columns,
    compactMode: props.compactMode,
    columnSizeMap: props.columnSizeMap,
  });
  const columns = useMemo(() => props.columns, [columnString]);
  const pageCount = Math.ceil(props.data.length / props.pageSize);
  const currentPageIndex = props.pageNo < pageCount ? props.pageNo : 0;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageOptions,
    state,
  } = useTable(
    {
      columns: columns,
      data,
      defaultColumn,
      initialState: {
        pageIndex: currentPageIndex,
        pageSize: props.pageSize,
      },
      manualPagination: true,
      pageCount,
    },
    useBlockLayout,
    useResizeColumns,
    usePagination,
    useRowSelect,
  );

  if (state.columnResizing.isResizingColumn) {
    isResizingColumn.current = true;
  } else {
    if (isResizingColumn.current) {
      setTimeout(function() {
        isResizingColumn.current = false;
        handleResizeColumn(state.columnResizing.columnWidths);
      }, 0);
    }
  }

  // Function body remains the same

  return (
    <TableWrapper
      width={props.width}
      height={props.height}
      // Props remain the same
    >
      <TableHeader
        width={props.width}
        // Props remain the same
      />
      <div className={props.isLoading ? Classes.SKELETON : "tableWrap"}>
        <div {...getTableProps()} className="table">
          {/* Table body remains the same */}
        </div>
      </div>
      <ScrollIndicator containerRef={tableWrapperRef} mode="LIGHT" />
    </TableWrapper>
  );
};

export default Table;
