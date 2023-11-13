import React, { Component, lazy, Suspense, useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { AppState } from "reducers";
import CodeMirror, { EditorConfiguration } from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/duotone-dark.css";
import "codemirror/theme/duotone-light.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/display/placeholder";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/display/autorefresh";
import "codemirror/addon/mode/multiplex";
import "codemirror/addon/tern/tern.css";
import { getDataTreeForAutocomplete } from "selectors/dataTreeSelectors";
import EvaluatedValuePopup from "components/editorComponents/CodeEditor/EvaluatedValuePopup";
import { WrappedFieldInputProps, WrappedFieldMetaProps } from "redux-form";
import _ from "lodash";
import { DataTree } from "entities/DataTree/dataTreeFactory";
import { Skin } from "constants/DefaultTheme";
import AnalyticsUtil from "utils/AnalyticsUtil";
import "components/editorComponents/CodeEditor/modes";
import {
  CodeEditorBorder,
  EditorConfig,
  EditorModes,
  EditorSize,
  EditorTheme,
  EditorThemes,
  Hinter,
  TabBehaviour,
} from "components/editorComponents/CodeEditor/EditorConfig";
import {
  DynamicAutocompleteInputWrapper,
  EditorWrapper,
  HintStyles,
  IconContainer,
} from "components/editorComponents/CodeEditor/styledComponents";
import { bindingMarker } from "components/editorComponents/CodeEditor/markHelpers";
import { bindingHint } from "components/editorComponents/CodeEditor/hintHelpers";
import { retryPromise } from "utils/AppsmithUtils";
import BindingPrompt from "./BindingPrompt";
import { showBindingPrompt } from "./BindingPromptHelper";
import ScrollIndicator from "components/ads/ScrollIndicator";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/foldgutter.css";
import * as Sentry from "@sentry/react";
import { removeNewLineChars, getInputValue } from "./codeEditorUtils";

const LightningMenu = lazy(() =>
  retryPromise(() => import("components/editorComponents/LightningMenu")),
);

const AUTOCOMPLETE_CLOSE_KEY_CODES = [
  "Enter",
  "Tab",
  "Escape",
  "Backspace",
  "Comma",
];

interface ReduxStateProps {
  dynamicData: DataTree;
}

export type EditorStyleProps = {
  placeholder?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  height?: string | number;
  meta?: Partial<WrappedFieldMetaProps>;
  showLineNumbers?: boolean;
  className?: string;
  leftImage?: string;
  disabled?: boolean;
  link?: string;
  showLightningMenu?: boolean;
  dataTreePath?: string;
  evaluatedValue?: any;
  expected?: string;
  borderLess?: boolean;
  border?: CodeEditorBorder;
  hoverInteraction?: boolean;
  fill?: boolean;
  useValidationMessage?: boolean;
};

export type EditorProps = EditorStyleProps &
  EditorConfig & {
    input: Partial<WrappedFieldInputProps>;
  } & {
    additionalDynamicData?: Record<string, Record<string, unknown>>;
    promptMessage?: React.ReactNode | string;
  };

type Props = ReduxStateProps & EditorProps;

type State = {
  isFocused: boolean;
  isOpened: boolean;
  autoCompleteVisible: boolean;
};

const CodeEditor: React.FC<Props> = (props) => {
  const textArea = useRef<HTMLTextAreaElement>(null);
  const editor = useRef<CodeMirror.Editor | null>(null);
  const hinters = useRef<Hinter[]>([]);
  const editorWrapperRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [autoCompleteVisible, setAutoCompleteVisible] = useState(false);

  useEffect(() => {
    // Your code for componentDidMount

    return () => {
      // Your code for componentWillUnmount
    };
  }, []);

  useEffect(() => {
    // Your code for componentDidUpdate

    return () => {
      // Your cleanup code for componentDidUpdate
    };
  }, [props]);

  const startAutocomplete = () => {
    // Your code for startAutocomplete
  };

  const onFocusTrigger = (cm: CodeMirror.Editor) => {
    // Your code for onFocusTrigger
  };

  const onChangeTrigger = (cm: CodeMirror.Editor) => {
    // Your code for onChangeTrigger
  };

  const handleCursorMovement = (cm: CodeMirror.Editor) => {
    // Your code for handleCursorMovement
  };

  const handleEditorFocus = () => {
    // Your code for handleEditorFocus
  };

  const handleEditorBlur = () => {
    // Your code for handleEditorBlur
  };

  const handleChange = (instance?: any, changeObj?: any) => {
    // Your code for handleChange
  };

  const handleAutocompleteVisibility = (cm: CodeMirror.Editor) => {
    // Your code for handleAutocompleteVisibility
  };

  const handleAutocompleteHide = (cm: any, event: KeyboardEvent) => {
    // Your code for handleAutocompleteHide
  };

  const updateMarkings = () => {
    // Your code for updateMarkings
  };

  const updatePropertyValue = (value: string, cursor?: number) => {
    // Your code for updatePropertyValue
  };

  return (
    // Your JSX for rendering the component
  );
};

const mapStateToProps = (state: AppState): ReduxStateProps => ({
  dynamicData: getDataTreeForAutocomplete(state),
});

export default Sentry.withProfiler(connect(mapStateToProps)(CodeEditor));
