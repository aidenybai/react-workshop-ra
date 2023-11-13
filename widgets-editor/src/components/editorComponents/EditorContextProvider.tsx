import React, { createContext, ReactNode, useContext } from "react";
import { useDispatch } from "react-redux";
import { WidgetOperation } from "widgets/BaseWidget";
import { updateWidget } from "actions/pageActions";
import { executeAction, disableDragAction } from "actions/widgetActions";
import {
  updateWidgetPropertyRequest,
  deleteWidgetProperty as deletePropertyAction,
  batchUpdateWidgetProperty as batchUpdatePropertyAction,
  BatchPropertyUpdatePayload,
} from "actions/controlActions";
import { ExecuteActionPayload } from "constants/AppsmithActionConstants/ActionConstants";
import { RenderModes } from "constants/WidgetConstants";
import { OccupiedSpace } from "constants/editorConstants";
import {
  resetChildrenMetaProperty,
  updateWidgetMetaProperty,
} from "actions/metaActions";

export type EditorContextType = {
  executeAction?: (actionPayloads: ExecuteActionPayload) => void;
  updateWidget?: (
    operation: WidgetOperation,
    widgetId: string,
    payload: any,
  ) => void;
  updateWidgetProperty?: (
    widgetId: string,
    propertyName: string,
    propertyValue: any,
  ) => void;
  updateWidgetMetaProperty?: (
    widgetId: string,
    propertyName: string,
    propertyValue: any,
  ) => void;
  resetChildrenMetaProperty?: (widgetId: string) => void;
  disableDrag?: (disable: boolean) => void;
  occupiedSpaces?: { [containerWidgetId: string]: OccupiedSpace[] };
  deleteWidgetProperty?: (widgetId: string, propertyPaths: string[]) => void;
  batchUpdateWidgetProperty?: (
    widgetId: string,
    updates: BatchPropertyUpdatePayload,
  ) => void;
};
export const EditorContext = createContext<EditorContextType>({});

type EditorContextProviderProps = EditorContextType & {
  children: ReactNode;
};

const EditorContextProvider = (props: EditorContextProviderProps) => {
  const dispatch = useDispatch();
  const {
    executeAction,
    updateWidget,
    updateWidgetProperty,
    updateWidgetMetaProperty,
    disableDrag,
    children,
    resetChildrenMetaProperty,
    deleteWidgetProperty,
    batchUpdateWidgetProperty,
  } = props;

  const updateWidgetPropertyHandler = (
    widgetId: string,
    propertyName: string,
    propertyValue: any
  ) => {
    dispatch(
      updateWidgetPropertyRequest(
        widgetId,
        propertyName,
        propertyValue,
        RenderModes.CANVAS
      )
    );
  };

  const executeActionHandler = (actionPayload: ExecuteActionPayload) => {
    dispatch(executeAction(actionPayload));
  };

  const updateWidgetHandler = (
    operation: WidgetOperation,
    widgetId: string,
    payload: any
  ) => {
    dispatch(updateWidget(operation, widgetId, payload));
  };

  const updateWidgetMetaPropertyHandler = (
    widgetId: string,
    propertyName: string,
    propertyValue: any
  ) => {
    dispatch(updateWidgetMetaProperty(widgetId, propertyName, propertyValue));
  };

  const resetChildrenMetaPropertyHandler = (widgetId: string) => {
    dispatch(resetChildrenMetaProperty(widgetId));
  };

  const disableDragHandler = (disable: boolean) => {
    dispatch(disableDragAction(disable));
  };

  const deleteWidgetPropertyHandler = (
    widgetId: string,
    propertyPaths: string[]
  ) => {
    dispatch(deletePropertyAction(widgetId, propertyPaths));
  };

  const batchUpdateWidgetPropertyHandler = (
    widgetId: string,
    updates: BatchPropertyUpdatePayload
  ) => {
    dispatch(batchUpdatePropertyAction(widgetId, updates));
  };

  return (
    <EditorContext.Provider
      value={{
        executeAction: executeActionHandler,
        updateWidget: updateWidgetHandler,
        updateWidgetProperty: updateWidgetPropertyHandler,
        updateWidgetMetaProperty: updateWidgetMetaPropertyHandler,
        disableDrag: disableDragHandler,
        resetChildrenMetaProperty: resetChildrenMetaPropertyHandler,
        deleteWidgetProperty: deleteWidgetPropertyHandler,
        batchUpdateWidgetProperty: batchUpdateWidgetPropertyHandler,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorContextProvider;
