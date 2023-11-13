import React, { forwardRef, Ref, useCallback, useState, useEffect } from "react";
import { CommonComponentProps, Classes } from "./common";
import styled from "styled-components";
import Icon, { IconSize } from "./Icon";

export enum SearchVariant {
  BACKGROUND = "BACKGROUND",
  SEAMLESS = "SEAMLESS",
}

export type TextInputProps = CommonComponentProps & {
  placeholder?: string;
  fill?: boolean;
  defaultValue?: string;
  variant?: SearchVariant;
  onChange?: (value: string) => void;
};

const StyledInput = styled.input<
  TextInputProps & { value?: string; isFocused: boolean }
>`
  /* styles remain unchanged */
`;

const InputWrapper = styled.div<{
  value?: string;
  isFocused: boolean;
  variant?: SearchVariant;
  fill?: boolean;
}>`
  /* styles remain unchanged */
`;

const SearchIcon = styled.div<{
  value?: string;
  isFocused: boolean;
}>`
  /* styles remain unchanged */
`;

const CloseIcon = styled.div`
  /* styles remain unchanged */
`;

const SearchInput = forwardRef(
  (props: TextInputProps, ref: Ref<HTMLInputElement>) => {
    /* component logic remains unchanged */
  },
);

SearchInput.defaultProps = {
  fill: false,
};

SearchInput.displayName = "SearchInput";

export default SearchInput;
