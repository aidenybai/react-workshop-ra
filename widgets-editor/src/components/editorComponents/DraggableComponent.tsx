import React, { CSSProperties } from "react";
import styled from "styled-components";
import { WidgetProps } from "widgets/BaseWidget";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { WIDGET_PADDING } from "constants/WidgetConstants";
import { useSelector } from "react-redux";
import { AppState } from "reducers";
import { getColorWithOpacity } from "constants/DefaultTheme";
import {
  useWidgetSelection,
  useShowPropertyPane,
  useWidgetDragResize,
} from "utils/hooks/dragResizeHooks";
import AnalyticsUtil from "utils/AnalyticsUtil";

const DraggableWrapper = styled.div`
  display: block;
  flex-direction: column;
  width: 100%;
  height: 100%;
  user-select: none;
  cursor: grab;
`;

const WidgetBoundaries = styled.div`
  transform: translate3d(-${WIDGET_PADDING + 1}px, -${WIDGET_PADDING + 1}px, 0);
  z-index: 0;
  width: calc(100% + ${WIDGET_PADDING - 2}px);
  height: calc(100% + ${WIDGET_PADDING - 2}px);
  position: absolute;
  border: 1px dashed
    ${(props) => getColorWithOpacity(props.theme.colors.textAnchor, 0.5)};
  pointer-events: none;
`;

type DraggableComponentProps = WidgetProps;

const DraggableComponent = (props: DraggableComponentProps) => {
  const showPropertyPane = useShowPropertyPane();
  const { selectWidget, focusWidget } = useWidgetSelection();
  const { setIsDragging } = useWidgetDragResize();
  const selectedWidget = useSelector((state: AppState) => state.ui.widgetDragResize.selectedWidget);
  const focusedWidget = useSelector((state: AppState) => state.ui.widgetDragResize.focusedWidget);
  const isResizing = useSelector((state: AppState) => state.ui.widgetDragResize.isResizing);
  const isDragging = useSelector((state: AppState) => state.ui.widgetDragResize.isDragging);
  const isDraggingDisabled: boolean = useSelector((state: AppState) => state.ui.widgetDragResize.isDraggingDisabled);

  const [{ isCurrentWidgetDragging }, drag] = useDrag({
    ...props,
    collect: (monitor: DragSourceMonitor) => ({
      isCurrentWidgetDragging: monitor.isDragging(),
    }),
    item: () => {
      selectWidget && selectedWidget !== props.widgetId && selectWidget(props.widgetId);
      setIsDragging && setIsDragging(true);
      AnalyticsUtil.logEvent("WIDGET_DRAG", {
        widgetName: props.widgetName,
        widgetType: props.type,
      });
      return props;
    },
    end: (widget, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        showPropertyPane && showPropertyPane(props.widgetId, undefined, true);
      }
      setTimeout(() => setIsDragging && setIsDragging(false), 0);
      AnalyticsUtil.logEvent("WIDGET_DROP", {
        widgetName: props.widgetName,
        widgetType: props.type,
        didDrop: didDrop,
      });
    },
    canDrag: () => {
      return !isResizing && !isDraggingDisabled;
    },
  });

  const isResizingOrDragging = !!isResizing || !!isDragging;

  const handleClick = (e: any) => {
    if (!isResizingOrDragging) {
      selectWidget && selectedWidget !== props.widgetId && selectWidget(props.widgetId);
    }
    e.stopPropagation();
  };

  const handleMouseOver = (e: any) => {
    focusWidget && !isResizingOrDragging && focusedWidget !== props.widgetId && focusWidget(props.widgetId);
    e.stopPropagation();
  };

  const style: CSSProperties = {
    display: isCurrentWidgetDragging ? "none" : "flex",
  };

  const widgetBoundaries = (
    <WidgetBoundaries
      style={{
        opacity: isResizingOrDragging && selectedWidget !== props.widgetId ? 1 : 0,
      }}
    />
  );

  const classNameForTesting = `t--draggable-${props.type.split("_").join("").toLowerCase()}`;
  const className = `${classNameForTesting}`;
  const shouldRenderComponent = !(selectedWidget === props.widgetId && isDragging);

  return (
    <DraggableWrapper
      className={className}
      ref={drag}
      onMouseOver={handleMouseOver}
      onClick={handleClick}
      style={style}
    >
      {shouldRenderComponent && props.children}
      {widgetBoundaries}
    </DraggableWrapper>
  );
};

export default DraggableComponent;
