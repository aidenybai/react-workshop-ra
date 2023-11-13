import styled, { css } from "styled-components";
import { Colors, Color } from "constants/Colors";
import { FontStyleTypes, TEXT_SIZES } from "constants/WidgetConstants";

export const TableWrapper = styled.div<{
  width: number;
  height: number;
  tableSizes: TableSizes;
  backgroundColor?: Color;
  triggerRowSelection: boolean;
}>`
  /* styles for TableWrapper */
`;

export const DropDownWrapper = styled.div`
  /* styles for DropDownWrapper */
`;

export const OptionWrapper = styled.div<{
  selected: boolean;
  isHeader?: boolean;
}>`
  /* styles for OptionWrapper */
`;

export const IconOptionWrapper = styled.div`
  /* styles for IconOptionWrapper */
`;

export const PaginationWrapper = styled.div`
  /* styles for PaginationWrapper */
`;

export const PaginationItemWrapper = styled.div<{
  disabled?: boolean;
  selected?: boolean;
}>`
  /* styles for PaginationItemWrapper */
`;

export const MenuColumnWrapper = styled.div<{ selected: boolean }>`
  /* styles for MenuColumnWrapper */
`;

export const ActionWrapper = styled.div<{
  background: string;
  buttonLabelColor: string;
}>`
  /* styles for ActionWrapper */
`;

export const TableStyles = css<{ cellProperties?: CellLayoutProperties }>`
  /* styles for TableStyles */
`;

export const CellWrapper = styled.div<{
  isHidden?: boolean;
  cellProperties?: CellLayoutProperties;
  isHyperLink?: boolean;
  useLinkToolTip?: boolean;
}>`
  /* styles for CellWrapper */
`;

export const TableHeaderWrapper = styled.div<{
  serverSidePaginationEnabled: boolean;
  width: number;
  tableSizes: TableSizes;
  backgroundColor?: Color;
}>`
  /* styles for TableHeaderWrapper */
`;

export const CommonFunctionsMenuWrapper = styled.div<{
  tableSizes: TableSizes;
}>`
  /* styles for CommonFunctionsMenuWrapper */
`;

export const RowWrapper = styled.div`
  /* styles for RowWrapper */
`;

export const TableIconWrapper = styled.div<{
  selected?: boolean;
  disabled?: boolean;
}>`
  /* styles for TableIconWrapper */
`;

export const SortIconWrapper = styled.div`
  /* styles for SortIconWrapper */
`;

export const RenderOptionWrapper = styled.div<{ selected: boolean }>`
  /* styles for RenderOptionWrapper */
`;

export const MenuCategoryWrapper = styled.div`
  /* styles for MenuCategoryWrapper */
`;

export const MenuStyledOptionHeader = styled.div`
  /* styles for MenuStyledOptionHeader */
`;
