import React, { useRef, useEffect, MutableRefObject, forwardRef, Ref } from "react";
import styled from "styled-components";
import Prism from "prismjs";
import themes from "./themes";
import { Skin } from "constants/DefaultTheme";

Prism.languages["appsmith-binding"] = {
  punctuation: {
    pattern: /^{{|}}$/,
  },
  property: {
    pattern: /(\.\w+)/,
  },
};

const StyledCode = styled.div<{ skin: Skin }>`
  position: relative;
  ${(props) => (props.skin === Skin.DARK ? themes.DARK : themes.LIGHT)};
  padding: 0 0px;
`;

export enum SYNTAX_HIGHLIGHTING_SUPPORTED_LANGUAGES {
  JAVASCRIPT = "language-javascript",
  APPSMITH = "language-appsmith-binding",
}

type HighlightedCodeProps = {
  codeText: string;
  language?: SYNTAX_HIGHLIGHTING_SUPPORTED_LANGUAGES;
  skin: Skin;
  multiline?: boolean;
  onClick?: () => void;
  className?: string;
};

export const HighlightedCode = forwardRef(
  (props: HighlightedCodeProps, ref: Ref<HTMLDivElement>) => {
    const codeRef: MutableRefObject<HTMLElement | null> = useRef(null);

    useEffect(() => {
      if (codeRef.current) {
        Prism.highlightElement(codeRef.current);
      }
    }, [props.codeText, props.language, codeRef]);

    const language =
      props.language || SYNTAX_HIGHLIGHTING_SUPPORTED_LANGUAGES.JAVASCRIPT;

    return (
      <StyledCode
        skin={props.skin}
        onClick={props.onClick}
        ref={ref}
        className={props.className}
      >
        {!props.multiline && (
          <code ref={codeRef} className={language}>
            {props.codeText}
          </code>
        )}
      </StyledCode>
    );
  },
);

export default HighlightedCode;
