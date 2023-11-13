import React, { useState, useEffect, useCallback } from "react";
import Icon, { IconName, IconSize } from "./Icon";
import { CommonComponentProps, Classes } from "./common";
import Text, { TextType } from "./Text";
import { Popover, Position } from "@blueprintjs/core";
import styled from "constants/DefaultTheme";

export type DropdownOption = {
  label?: string;
  value?: string;
  id?: string;
  icon?: IconName;
  subText?: string;
  iconSize?: IconSize;
  iconColor?: string;
  onSelect?: (value?: string) => void;
};

export type DropdownProps = CommonComponentProps & {
  options: DropdownOption[];
  selected: DropdownOption;
  onSelect?: (value?: string) => void;
  width?: string;
  height?: string;
  showLabelOnly?: boolean;
  optionWidth?: string;
  showDropIcon?: boolean;
  SelectedValueNode?: typeof DefaultDropDownValueNode;
};

export const DropdownContainer = styled.div<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: relative;
`;

const Selected = styled.div<{
  isOpen: boolean;
  disabled?: boolean;
  height: string;
}>`
  // styles remain unchanged
`;

const DropdownWrapper = styled.div<{
  width: string;
}>`
  width: ${(props) => props.width};
  z-index: 1;
  background-color: ${(props) => props.theme.colors.propertyPane.radioGroupBg};
  margin-top: ${(props) => -props.theme.spaces[3]}px;
  padding: ${(props) => props.theme.spaces[3]}px 0;
`;

const OptionWrapper = styled.div<{
  selected: boolean;
}>`
  // styles remain unchanged
`;

const LabelWrapper = styled.div<{ label?: string }>`
  // styles remain unchanged
`;

const StyledSubText = styled(Text)`
  // styles remain unchanged
`;

const SelectedDropDownHolder = styled.div`
  // styles remain unchanged
`;

const SelectedIcon = styled(Icon)`
  // styles remain unchanged
`;

const DefaultDropDownValueNode = ({
  selected,
  showLabelOnly,
}: {
  selected: DropdownOption;
  showLabelOnly?: boolean;
}) => (
  <SelectedDropDownHolder>
    {selected.icon ? (
      <SelectedIcon name={selected.icon} size={IconSize.XXS} />
    ) : null}
    <Text type={TextType.P1}>
      {showLabelOnly ? selected.label : selected.value}
    </Text>
  </SelectedDropDownHolder>
);

export default function Dropdown(props: DropdownProps) {
  const {
    onSelect,
    showDropIcon = true,
    SelectedValueNode = DefaultDropDownValueNode,
  } = { ...props };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<DropdownOption>(props.selected);

  useEffect(() => {
    setSelected(props.selected);
  }, [props.selected]);

  const optionClickHandler = useCallback(
    (option: DropdownOption) => {
      setSelected(option);
      setIsOpen(false);
      onSelect && onSelect(option.value);
      option.onSelect && option.onSelect(option.value);
    },
    [onSelect],
  );
  return (
    <DropdownContainer
      tabIndex={0}
      data-cy={props.cypressSelector}
      width={props.width || "260px"}
      height={props.height || "38px"}
    >
      <Popover
        minimal
        popoverClassName={props.className}
        position={Position.BOTTOM_LEFT}
        isOpen={isOpen && !props.disabled}
        onInteraction={(state) => setIsOpen(state)}
        boundary="scrollParent"
      >
        <Selected
          isOpen={isOpen}
          disabled={props.disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={props.className}
          height={props.height || "38px"}
        >
          <SelectedValueNode
            selected={selected}
            showLabelOnly={props.showLabelOnly}
          />
          {showDropIcon && <Icon name="downArrow" size={IconSize.XXS} />}
        </Selected>
        <DropdownWrapper width={props.optionWidth || "260px"}>
          {props.options.map((option: DropdownOption, index: number) => {
            return (
              <OptionWrapper
                key={index}
                selected={selected.value === option.value}
                onClick={() => optionClickHandler(option)}
                className="t--dropdown-option"
              >
                {option.icon ? (
                  <SelectedIcon
                    name={option.icon}
                    fillColor={option?.iconColor}
                    size={option.iconSize || IconSize.XXS}
                  />
                ) : null}

                {props.showLabelOnly ? (
                  <Text type={TextType.P1}>{option.label}</Text>
                ) : option.label && option.value ? (
                  <LabelWrapper className="label-container">
                    <Text type={TextType.H5}>{option.value}</Text>
                    <Text type={TextType.P1}>{option.label}</Text>
                  </LabelWrapper>
                ) : (
                  <Text type={TextType.P1}>{option.value}</Text>
                )}

                {option.subText ? (
                  <StyledSubText type={TextType.P3}>
                    {option.subText}
                  </StyledSubText>
                ) : null}
              </OptionWrapper>
            );
          })}
        </DropdownWrapper>
      </Popover>
    </DropdownContainer>
  );
}
