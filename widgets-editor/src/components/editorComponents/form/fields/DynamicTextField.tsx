import React from "react";
import { Field, BaseFieldProps } from "redux-form";
import CodeEditor from "components/editorComponents/CodeEditor";

class DynamicTextField extends React.Component<
  BaseFieldProps & {
    size?: string;
    tabBehaviour?: string;
    mode?: string;
    theme?: string;
    hoverInteraction?: boolean;
    border?: string;
  }
> {
  render() {
    const editorProps = {
      mode: this.props.mode || "text",
      tabBehaviour: this.props.tabBehaviour || "input",
      theme: this.props.theme || "light",
      size: this.props.size || "compact",
    };
    return <Field component={CodeEditor} {...this.props} {...editorProps} />;
  }
}

export default DynamicTextField;
