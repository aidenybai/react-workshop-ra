import React, { useState } from "react";
import styled from "styled-components";
import { Tree, Classes, ITreeNode } from "@blueprintjs/core";
import KeyValuePair from "./KeyValuePair";
import ReadOnlyEditor from "components/editorComponents/ReadOnlyEditor";

const StyledTreeContainer = styled.div`
  /* styles remain the same */
`;

const RequestView = (props: {
  requestURL: string;
  requestMethod: string;
  requestHeaders: Record<string, string[]>;
  requestBody: string;
}) => {
  const [generalExpanded, setGeneralExpanded] = useState(true);
  const [requestHeadersExpanded, setRequestHeadersExpanded] = useState(true);
  const [requestBodyExpanded, setRequestBodyExpanded] = useState(true);

  const headers = Object.keys(props.requestHeaders).map((hKey: string, index: number) => {
    return {
      id: index,
      label: <KeyValuePair hKey={`${hKey}:  `} hValue={props.requestHeaders[hKey].join(", ")} />,
    };
  });

  const setExpanded = (id: number | string, expanded: boolean) => {
    if (id === 1) setGeneralExpanded(expanded);
    if (id === 2) setRequestHeadersExpanded(expanded);
    if (id === 3) setRequestBodyExpanded(expanded);
  };

  const handleNodeClick = (nodeData: ITreeNode) => {
    setExpanded(nodeData.id, !nodeData.isExpanded);
  };

  const handleNodeExpand = (nodeData: ITreeNode) => {
    setExpanded(nodeData.id, true);
  };

  const handleNodeCollapse = (nodeData: ITreeNode) => {
    setExpanded(nodeData.id, false);
  };

  return (
    <StyledTreeContainer>
      <Tree
        contents={[
          {
            id: 1,
            isExpanded: generalExpanded,
            label: "General",
            childNodes: [
              {
                id: 2,
                label: <KeyValuePair hKey="Request URL:  " hValue={props.requestURL} />,
              },
              {
                id: 3,
                label: <KeyValuePair hKey="Request Method:  " hValue={props.requestMethod} />,
              },
            ],
          },
          {
            id: 2,
            isExpanded: requestHeadersExpanded,
            label: "Request Headers",
            childNodes: headers,
          },
          {
            id: 3,
            isExpanded: requestBodyExpanded,
            label: "Request Body",
            className: "request-body",
            childNodes: [
              {
                id: 1,
                label: <ReadOnlyEditor input={{ value: props.requestBody }} height={"100%"} folding={true} />,
              },
            ],
          },
        ]}
        onNodeClick={handleNodeClick}
        onNodeCollapse={handleNodeCollapse}
        onNodeExpand={handleNodeExpand}
        className={Classes.ELEVATION_0}
      />
    </StyledTreeContainer>
  );
};

export default RequestView;
