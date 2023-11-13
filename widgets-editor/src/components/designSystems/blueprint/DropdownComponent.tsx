import React, { ReactNode } from "react";
import { ComponentProps } from "components/designSystems/appsmith/BaseComponent";
import { DropdownOption, SelectionType } from "widgets/DropdownWidget";
import { Select, MultiSelect, IItemRendererProps } from "@blueprintjs/select";
import _ from "lodash";
import styled from "styled-components";
import { Colors } from "constants/Colors";
import Fuse from "fuse.js";

const FUSE_OPTIONS = {
  shouldSort: true,
  threshold: 0.5,
  location: 0,
  minMatchCharLength: 3,
  findAllMatches: true,
  keys: ["label", "value"],
};

const SingleDropDown = Select.ofType<DropdownOption>();
const MultiDropDown = MultiSelect.ofType<DropdownOption>();

const DropdownContainer = styled.div`
  /* Your styles here */
`;

class DropDownComponent extends React.Component<DropDownComponentProps> {
  render() {
    // Your render logic here
  }

  itemListPredicate(query: string, items: DropdownOption[]) {
    const fuse = new Fuse(items, FUSE_OPTIONS);
    return query ? fuse.search(query) : items;
  }

  onItemSelect = (item: DropdownOption): void => {
    this.props.onOptionSelected(item);
  };

  onItemRemoved = (_tag: string, index: number) => {
    this.props.onOptionRemoved(this.props.selectedIndexArr[index]);
  };

  renderTag = (option: DropdownOption) => {
    return option.label;
  };

  isOptionSelected = (selectedOption: DropdownOption) => {
    // Your logic here
  };

  renderSingleSelectItem = (
    option: DropdownOption,
    itemProps: IItemRendererProps,
  ) => {
    // Your logic here
  };

  renderMultiSelectItem = (
    option: DropdownOption,
    itemProps: IItemRendererProps,
  ) => {
    // Your logic here
  };
}

export interface DropDownComponentProps extends ComponentProps {
  selectionType: SelectionType;
  disabled?: boolean;
  onOptionSelected: (optionSelected: DropdownOption) => void;
  onOptionRemoved: (removedIndex: number) => void;
  placeholder?: string;
  label?: string;
  selectedIndex?: number;
  selectedIndexArr: number[];
  options: DropdownOption[];
  isLoading: boolean;
  width: number;
  height: number;
}

export default DropDownComponent;
