import React, { useState } from "react";
import { Popover, Classes, PopoverInteractionKind, Position } from "@blueprintjs/core";
import styled from "styled-components";
import { Colors } from "constants/Colors";
import CompactIcon from "assets/icons/control/compact.svg";
import TableActionIcon from "components/designSystems/appsmith/TableComponent/TableActionIcon";

const DropDownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  z-index: 1;
  border-radius: 4px;
  border: 1px solid ${Colors.ATHENS_GRAY};
  padding: 8px;
`;

const OptionWrapper = styled.div<{ selected?: boolean }>`
  display: flex;
  width: calc(100% - 20px);
  justify-content: space-between;
  align-items: center;
  height: 32px;
  box-sizing: border-box;
  padding: 8px;
  color: ${Colors.OXFORD_BLUE};
  opacity: ${(props) => (props.selected ? 1 : 0.7)};
  min-width: 200px;
  cursor: pointer;
  margin-bottom: 4px;
  background: ${(props) => (props.selected ? Colors.POLAR : Colors.WHITE)};
  border-left: ${(props) =>
    props.selected ? "4px solid rgb(3, 179, 101)" : "none"};
  border-radius: 4px;
  .option-title {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
  }
  &:hover {
    background: ${Colors.POLAR};
  }
`;

type CompactMode = "SHORT" | "DEFAULT" | "TALL";

interface TableCompactModeProps {
  compactMode?: CompactMode;
  updateCompactMode: (mode: CompactMode) => void;
}

const TableCompactMode = (props: TableCompactModeProps) => {
  const [selected, setSelected] = useState(false);

  return (
    <Popover
      minimal
      enforceFocus={false}
      interactionKind={PopoverInteractionKind.CLICK}
      position={Position.BOTTOM}
      onClose={() => {
        setSelected(false);
      }}
      isOpen={selected}
    >
      <TableActionIcon
        tooltip="Row Height"
        selected={selected}
        selectMenu={(selected: boolean) => {
          setSelected(selected);
        }}
        className="t--table-compact-mode-toggle-btn"
      >
        <CompactIcon />
      </TableActionIcon>
      <DropDownWrapper>
        {compactModes.map((mode, index) => (
          <OptionWrapper
            selected={props.compactMode === mode}
            key={index}
            onClick={() => {
              props.updateCompactMode(mode);
            }}
            className={`${Classes.POPOVER_DISMISS} t--table-compact-mode-option`}
          >
            {mode.toLowerCase()}
          </OptionWrapper>
        ))}
      </DropDownWrapper>
    </Popover>
  );
};

export default TableCompactMode;
