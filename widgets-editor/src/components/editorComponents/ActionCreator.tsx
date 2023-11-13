import React from "react";
import { AppState } from "reducers";
import { getActionsForCurrentPage } from "selectors/entitiesSelector";
import { getModalDropdownList, getNextModalName } from "selectors/widgetSelectors";
import { getCurrentPageId } from "selectors/editorSelectors";
import { ActionDataState } from "reducers/entityReducers/actionsReducer";
import { DropdownOption } from "widgets/DropdownWidget";
import { useDispatch, useSelector } from "react-redux";
import TreeDropdown, { TreeDropdownOption } from "components/ads/TreeDropdown";
import { ControlWrapper, FieldWrapper } from "components/propertyControls/StyledControls";
import { KeyValueComponent } from "components/propertyControls/KeyValueComponent";
import { InputText } from "components/propertyControls/InputTextControl";
import { createModalAction } from "actions/widgetActions";
import { createNewApiName, createNewQueryName } from "utils/AppsmithUtils";
import { getDynamicBindings, isDynamicValue } from "utils/DynamicBindingUtils";
import HightlightedCode from "components/editorComponents/HighlightedCode";
import TreeStructure from "components/utils/TreeStructure";
import { createNewApiAction, createNewQueryAction } from "actions/apiPaneActions";
import { NavigationTargetType } from "sagas/ActionExecutionSagas";
import { checkCurrentStep } from "sagas/OnboardingSagas";
import { OnboardingStep } from "constants/OnboardingConstants";
import { getWidgets } from "sagas/selectors";
import { Skin } from "constants/DefaultTheme";

/* eslint-disable @typescript-eslint/ban-types */
/* TODO: Function and object types need to be updated to enable the lint rule */

// Rest of the code remains unchanged
