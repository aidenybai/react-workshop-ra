import React, { useState, useContext, ReactNode, createContext, useEffect, memo } from "react";
import styled from "styled-components";
import { useDrop, XYCoord, DropTargetMonitor } from "react-dnd";
import { WidgetProps } from "widgets/BaseWidget";
import { WidgetConfigProps } from "reducers/entityReducers/widgetConfigReducer";
import { EditorContext } from "components/editorComponents/EditorContextProvider";
import { MAIN_CONTAINER_WIDGET_ID, GridDefaults, WidgetTypes } from "constants/WidgetConstants";
import { calculateDropTargetRows } from "./DropTargetUtils";
import DragLayerComponent from "./DragLayerComponent";
import { AppState } from "reducers";
import { useSelector } from "react-redux";
import { useShowPropertyPane, useWidgetSelection, useCanvasSnapRowsUpdateHook } from "utils/hooks/dragResizeHooks";
import { getOccupiedSpaces } from "selectors/editorSelectors";

type DropTargetComponentProps = WidgetProps & {
  children?: ReactNode;
  snapColumnSpace: number;
  snapRowSpace: number;
  minHeight: number;
};

const StyledDropTarget = styled.div`
  transition: height 100ms ease-in;
  width: 100%;
  position: relative;
  background: none;
  user-select: none;
`;

const Onboarding = () => {
  return (
    <div style={{ position: "fixed", left: "50%", top: "50vh" }}>
      <h2 style={{ color: "#ccc" }}>Drag and drop a widget here</h2>
    </div>
  );
};

export const DropTargetContext = createContext<{
  updateDropTargetRows?: (widgetId: string, row: number) => boolean;
  persistDropTargetRows?: (widgetId: string, row: number) => void;
}>({});

const DropTargetComponent: React.FC<DropTargetComponentProps> = (props) => {
  const canDropTargetExtend = props.canExtend;
  // ... (rest of the code remains the same)
};

export default DropTargetComponent;
