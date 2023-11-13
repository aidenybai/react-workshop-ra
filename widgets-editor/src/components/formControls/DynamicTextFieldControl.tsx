import React, { useState } from "react";
import { connect } from "react-redux";
import BaseControl, { ControlProps } from "./BaseControl";
import { ControlType } from "constants/PropertyControlConstants";
import FormLabel from "components/editorComponents/FormLabel";
import DynamicTextField from "components/editorComponents/form/fields/DynamicTextField";
import { EditorSize, EditorModes, TabBehaviour } from "components/editorComponents/CodeEditor/EditorConfig";
import { QUERY_EDITOR_FORM_NAME } from "constants/forms";
import { AppState } from "reducers";
import styled from "styled-components";
import TemplateMenu from "pages/Editor/QueryEditor/TemplateMenu";
import { QUERY_BODY_FIELD } from "constants/QueryEditorConstants";
import history from "utils/history";
import { convertObjectToQueryParams, getQueryParams } from "utils/AppsmithUtils";

const Wrapper = styled.div`
  .dynamic-text-field {
    border-radius: 4px;
    font-size: 14px;
    min-height: calc(100vh / 4);
  }

  && {
    .CodeMirror-lines {
      padding: 10px;
    }
  }
`;

interface DynamicTextControlProps extends ControlProps {
  actionName: string;
  createTemplate: (template: any) => any;
  pluginId: string;
  responseType: string;
}

const DynamicTextControl: React.FC<DynamicTextControlProps> = (props) => {
  const [showTemplateMenu, setShowTemplateMenu] = useState(true);

  const getControlType = (): ControlType => {
    return "QUERY_DYNAMIC_TEXT";
  };

  const { responseType, label } = props;
  const isNewQuery = new URLSearchParams(window.location.search).get("showTemplate") === "true";
  const showTemplate = isNewQuery && showTemplateMenu && props.pluginId;
  const mode = responseType === "TABLE" ? EditorModes.SQL_WITH_BINDING : EditorModes.JSON_WITH_BINDING;

  const handleCreateTemplate = (templateString: any) => {
    setShowTemplateMenu(false);
    props.createTemplate(templateString);
  };

  const handleTemplateMenu = () => {
    return (
      <TemplateMenu
        createTemplate={handleCreateTemplate}
        pluginId={props.pluginId}
      />
    );
  };

  return (
    <Wrapper>
      <FormLabel>{label}</FormLabel>
      {showTemplate ? handleTemplateMenu() : (
        <DynamicTextField
          size={EditorSize.EXTENDED}
          name={props.configProperty}
          dataTreePath={`${props.actionName}.config.body`}
          className="dynamic-text-field"
          mode={mode}
          tabBehaviour={TabBehaviour.INDENT}
        />
      )}
    </Wrapper>
  );
};

const mapStateToProps = (state: AppState) => {
  const actionName = state.formValueSelector(QUERY_EDITOR_FORM_NAME, "name");
  const pluginId = state.formValueSelector(QUERY_EDITOR_FORM_NAME, "datasource.pluginId");
  const responseTypes = state.getPluginResponseTypes;

  return {
    actionName,
    pluginId,
    responseType: responseTypes[pluginId],
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  createTemplate: (template: any) => {
    const params = getQueryParams();
    if (params.showTemplate) {
      params.showTemplate = "false";
    }
    history.replace({
      ...window.location,
      search: convertObjectToQueryParams(params),
    });
    dispatch(change(QUERY_EDITOR_FORM_NAME, QUERY_BODY_FIELD, template));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DynamicTextControl);
