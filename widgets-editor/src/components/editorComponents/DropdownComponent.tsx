import React, { Component, ReactNode, useRef, useState } from "react";
import styled from "styled-components";
import { MenuItem, Menu, ControlGroup, InputGroup } from "@blueprintjs/core";
import { BaseButton } from "components/designSystems/blueprint/ButtonComponent";
import { Select, ItemListRenderer, IItemListRendererProps } from "@blueprintjs/select";
import { DropdownOption } from "widgets/DropdownWidget";

const Dropdown = Select.ofType<DropdownOption>();
const StyledDropdown = styled(Dropdown)``;

const DropdownComponent: React.FC<DropdownComponentProps> = ({
  options,
  selectHandler,
  selected,
  autocomplete,
  addItem,
  toggle,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const newItemTextInput = useRef<HTMLInputElement | null>(null);

  const showTextBox = (): void => {
    setIsEditing(true);
  };

  const handleAddItem = (): void => {
    addItem?.addItemHandler(newItemTextInput.current?.value || "");
    setIsEditing(false);
  };

  const renderItemList: ItemListRenderer<DropdownOption> = (
    props: IItemListRendererProps<DropdownOption>
  ) => {
    if (addItem) {
      const renderItems = props.items.map(props.renderItem).filter(Boolean);
      const displayMode = (
        <BaseButton
          icon-right="plus"
          accent="primary"
          filled={true}
          text={addItem.displayText}
          onClick={showTextBox}
        />
      );
      const editMode = (
        <ControlGroup fill={true}>
          <InputGroup inputRef={newItemTextInput} />
          <BaseButton
            filled={true}
            text={addItem.displayText}
            onClick={handleAddItem}
          ></BaseButton>
        </ControlGroup>
      );
      return (
        <Menu ulRef={props.itemsParentRef}>
          {renderItems}
          {!isEditing ? displayMode : editMode}
        </Menu>
      );
    }

    return <React.Fragment />;
  };

  const searchItem = (query: string, option: DropdownOption): boolean => {
    return (
      option.label.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
      option.value.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
      (!!option.label &&
        option.label.toLowerCase().indexOf(query.toLowerCase()) > -1)
    );
  };

  const onItemSelect = (item: DropdownOption): void => {
    selectHandler(item.value);
  };

  const renderItem: ItemRenderer<DropdownOption> = (
    option: DropdownOption,
    { handleClick, modifiers }
  ) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        key={option.value}
        label={option.label ? option.label : ""}
        onClick={handleClick}
        shouldDismissPopover={false}
        text={option.label || option.label}
      />
    );
  };

  const getSelectedDisplayText = () => {
    if (selected) {
      const selectedValue = selected.value;
      const item: DropdownOption | undefined = options.find(
        (option) => option.value === selectedValue
      );

      return item && (item.label || item.label);
    }
    return "";
  };

  return (
    <StyledDropdown
      items={options}
      onItemSelect={onItemSelect}
      itemRenderer={renderItem}
      itemListRenderer={addItem && renderItemList}
      filterable={!!autocomplete}
      itemPredicate={searchItem}
      itemsEqual="value"
      popoverProps={{ minimal: true }}
      activeItem={selected}
      noResults={<MenuItem disabled={true} text="No results." />}
    >
      {toggle || (
        <BaseButton
          accent="secondary"
          text={getSelectedDisplayText()}
          rightIcon="chevron-down"
        />
      )}
    </StyledDropdown>
  );
};

export interface DropdownComponentProps {
  options: DropdownOption[];
  selectHandler: (selectedValue: string) => void;
  selected?: DropdownOption;
  multiselectDisplayType?: "TAGS" | "CHECKBOXES";
  checked?: boolean;
  multi?: boolean;
  autocomplete?: boolean;
  addItem?: {
    displayText: string;
    addItemHandler: (name: string) => void;
  };
  toggle?: ReactNode;
}

export default DropdownComponent;
