import { XYCoord } from "react-dnd";
import { WidgetProps, WidgetRowCols } from "widgets/BaseWidget";
import { GridDefaults } from "constants/WidgetConstants";

export type UIElementSize = { height: number; width: number };

export const RESIZABLE_CONTAINER_BORDER_THEME_INDEX = 1;

export const computeRowCols = (
  delta: UIElementSize,
  position: XYCoord,
  props: WidgetProps,
): WidgetRowCols => {
  const leftColumn = Math.round(
    props.leftColumn + position.x / props.parentColumnSpace,
  );
  const topRow = Math.round(props.topRow + position.y / props.parentRowSpace);
  const rightColumn = Math.round(
    props.rightColumn + (delta.width + position.x) / props.parentColumnSpace,
  );
  const bottomRow = Math.round(
    props.bottomRow + (delta.height + position.y) / props.parentRowSpace,
  );

  return { leftColumn, topRow, rightColumn, bottomRow };
};

export const computeBoundedRowCols = (rowCols: WidgetRowCols): WidgetRowCols => {
  const leftColumn = Math.max(rowCols.leftColumn, 0);
  const rightColumn = Math.min(
    rowCols.rightColumn,
    GridDefaults.DEFAULT_GRID_COLUMNS,
  );
  const { topRow, bottomRow } = rowCols;

  return { leftColumn, rightColumn, topRow, bottomRow };
};

export const hasRowColsChanged = (
  newRowCols: WidgetRowCols,
  props: WidgetProps,
): boolean => {
  return (
    props.leftColumn !== newRowCols.leftColumn ||
    props.topRow !== newRowCols.topRow ||
    props.bottomRow !== newRowCols.bottomRow ||
    props.rightColumn !== newRowCols.rightColumn
  );
};

export const computeFinalRowCols = (
  delta: UIElementSize,
  position: XYCoord,
  props: WidgetProps,
): WidgetRowCols | false => {
  const newRowCols = computeBoundedRowCols(
    computeRowCols(delta, position, props),
  );

  return hasRowColsChanged(newRowCols, props) ? newRowCols : false;
};
