import React, { ChangeEvent } from "react";
import { connect } from "react-redux";
import { change, Field, formValueSelector } from "redux-form";
import _ from "lodash";
import styled from "styled-components";
import CodeEditor from "components/editorComponents/CodeEditor";
import StoreAsDatasource from "components/editorComponents/StoreAsDatasource";
import { API_EDITOR_FORM_NAME } from "constants/forms";
import { AppState } from "reducers";
import { Datasource, EmbeddedRestDatasource, DEFAULT_DATASOURCE } from "entities/Datasource";
import { EditorProps, EditorModes, EditorTheme, TabBehaviour, EditorSize } from "components/editorComponents/CodeEditor/EditorConfig";
import { bindingMarker } from "components/editorComponents/CodeEditor/markHelpers";
import { bindingHint } from "components/editorComponents/CodeEditor/hintHelpers";
import { urlGroupsRegexExp } from "constants/AppsmithActionConstants/ActionConstants";
import { DATA_SOURCES_EDITOR_ID_URL } from "constants/routes";
import Icon, { IconSize } from "components/ads/Icon";
import Text, { TextType } from "components/ads/Text";
import history from "utils/history";

type ReduxStateProps = {
  orgId: string;
  datasource: Datasource | EmbeddedRestDatasource;
  datasourceList: Datasource[];
  currentPageId?: string;
  applicationId?: string;
};

type ReduxDispatchProps = {
  updateDatasource: (datasource: Datasource | EmbeddedRestDatasource) => void;
};

type Props = EditorProps & ReduxStateProps & ReduxDispatchProps & {
  input: Partial<WrappedFieldInputProps>;
  pluginId: string;
};

const DatasourceContainer = styled.div`
  display: flex;
  position: relative;
  width: calc(100% - 155px);
`;

class EmbeddedDatasourcePathComponent extends React.Component<Props> {
  // ... (rest of the component remains unchanged)
}

const apiFormValueSelector = formValueSelector(API_EDITOR_FORM_NAME);

const mapStateToProps = (
  state: AppState,
  ownProps: { pluginId: string },
): ReduxStateProps => {
  // ... (unchanged)
};

const mapDispatchToProps = (dispatch: any): ReduxDispatchProps => ({
  // ... (unchanged)
});

const EmbeddedDatasourcePathConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmbeddedDatasourcePathComponent);

const EmbeddedDatasourcePathField = (
  props: BaseFieldProps & {
    pluginId: string;
    placeholder?: string;
    theme: EditorTheme;
  },
) => {
  return (
    <Field component={EmbeddedDatasourcePathConnectedComponent} {...props} />
  );
};

export default EmbeddedDatasourcePathField;
