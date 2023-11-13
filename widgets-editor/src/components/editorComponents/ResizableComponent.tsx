import React, { useContext, useRef, memo } from "react";
import { XYCoord } from "react-dnd";
import { WidgetOperations, WidgetRowCols, WidgetProps } from "widgets/BaseWidget";
import { EditorContext } from "components/editorComponents/EditorContextProvider";
import { generateClassName } from "utils/generators";
import { DropTargetContext } from "./DropTargetComponent";
import { UIElementSize, computeFinalRowCols, computeRowCols } from "./ResizableUtils";
import { useShowPropertyPane, useWidgetSelection, useWidgetDragResize } from "utils/hooks/dragResizeHooks";
import { useSelector } from "react-redux";
import { AppState } from "reducers";
import Resizable from "resizable";
import { isDropZoneOccupied, getSnapColumns } from "utils/WidgetPropsUtils";
import { VisibilityContainer } from "./ResizeStyledComponents";
import AnalyticsUtil from "utils/AnalyticsUtil";
import { scrollElementIntoParentCanvasView } from "utils/helpers";
import { getNearestParentCanvas } from "utils/generators";
import { getOccupiedSpaces } from "selectors/editorSelectors";

export type ResizableComponentProps = WidgetProps & {
  paddingOffset: number;
};

export const ResizableComponent = memo(function ResizableComponent(
  props: ResizableComponentProps,
) {
  const resizableRef = useRef<HTMLDivElement>(null);
  const { updateWidget } = useContext(EditorContext);
  const { updateDropTargetRows, persistDropTargetRows } = useContext(DropTargetContext);
  const showPropertyPane = useShowPropertyPane();
  const { selectWidget } = useWidgetSelection();
  const { setIsResizing } = useWidgetDragResize();
  const isWidgetSelected = useSelector((state: AppState) => state.ui.widgetDragResize.selectedWidget === props.widgetId);
  const isWidgetFocused = useSelector((state: AppState) => state.ui.widgetDragResize.focusedWidget === props.widgetId);
  const isResizing = useSelector((state: AppState) => state.ui.widgetDragResize.isResizing);
  const occupiedSpacesBySiblingWidgets = useSelector((state: AppState) => {
    const occupiedSpaces = getOccupiedSpaces(state);
    return occupiedSpaces && props.parentId && occupiedSpaces[props.parentId]
      ? occupiedSpaces[props.parentId]
      : undefined;
  });

  const dimensions: UIElementSize = {
    width: (props.rightColumn - props.leftColumn) * props.parentColumnSpace - 2 * props.paddingOffset,
    height: (props.bottomRow - props.topRow) * props.parentRowSpace - 2 * props.paddingOffset,
  };

  const boundingElementClassName = generateClassName(props.parentId);
  const possibleBoundingElements = document.getElementsByClassName(boundingElementClassName);
  const boundingElement = possibleBoundingElements.length > 0 ? possibleBoundingElements[0] : undefined;
  const boundingElementClientRect = boundingElement ? boundingElement.getBoundingClientRect() : undefined;

  const handleResizeStart = () => {
    setIsResizing && !isResizing && setIsResizing(true);
    selectWidget && !isWidgetSelected && selectWidget(props.widgetId);
    AnalyticsUtil.logEvent("WIDGET_RESIZE_START", {
      widgetName: props.widgetName,
      widgetType: props.type,
    });
  };

  const isColliding = (newDimensions: UIElementSize, position: XYCoord) => {
    // logic for collision detection
  };

  const updateSize = (newDimensions: UIElementSize, position: XYCoord) => {
    // logic for updating size
  };

  return (
    <Resizable
      ref={resizableRef}
      // other props
      onStart={handleResizeStart}
      onStop={updateSize}
      // other props
    >
      <VisibilityContainer
        visible={!!props.isVisible}
        padding={props.paddingOffset}
      >
        {props.children}
      </VisibilityContainer>
    </Resizable>
  );
});

export default ResizableComponent;
