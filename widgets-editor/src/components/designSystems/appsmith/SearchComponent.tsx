import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { InputGroup } from "@blueprintjs/core";
import { debounce } from "lodash";

interface SearchProps {
  onSearch: (value: string) => void;
  placeholder: string;
  value: string;
}

const SearchInputWrapper = styled(InputGroup)`
  &&& input {
    box-shadow: none;
    font-size: 12px;
  }
  &&& svg {
    opacity: 0.6;
  }
  margin: 5px 20px;
  width: 250px;
  min-width: 150px;
`;

const SearchComponent: React.FC<SearchProps> = (props) => {
  const [localValue, setLocalValue] = useState(props.value);

  const onDebouncedSearch = debounce(props.onSearch, 400);

  useEffect(() => {
    if (props.value !== localValue) {
      setLocalValue(props.value);
    }
  }, [props.value, localValue]);

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const search = event.target.value;
    setLocalValue(search);
    onDebouncedSearch(search);
  };

  return (
    <SearchInputWrapper
      leftIcon="search"
      type="search"
      onChange={handleSearch}
      placeholder={props.placeholder}
      value={localValue}
    />
  );
};

export default SearchComponent;
