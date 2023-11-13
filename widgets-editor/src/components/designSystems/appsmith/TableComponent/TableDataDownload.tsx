import React, { useState } from "react";
import { IconWrapper } from "constants/IconConstants";
import { Colors } from "constants/Colors";
import DownloadIcon from "assets/icons/control/download-table.svg";
import { ReactTableColumnProps } from "components/designSystems/appsmith/TableComponent/Constants";
import { TableIconWrapper } from "components/designSystems/appsmith/TableComponent/TableStyledWrappers";
import TableActionIcon from "components/designSystems/appsmith/TableComponent/TableActionIcon";
import { isString } from "lodash";

interface TableDataDownloadProps {
  data: Array<Record<string, unknown>>;
  columns: ReactTableColumnProps[];
  widgetName: string;
}

const TableDataDownload = (props: TableDataDownloadProps) => {
  const [selected, setSelected] = useState(false);

  const downloadTableData = () => {
    setSelected(true);
    // ... (rest of the function remains unchanged)
    setSelected(false);
  };

  if (props.columns.length === 0) {
    return (
      <TableIconWrapper disabled>
        <IconWrapper width={20} height={20} color={Colors.CADET_BLUE}>
          <DownloadIcon />
        </IconWrapper>
      </TableIconWrapper>
    );
  }
  return (
    <TableActionIcon
      tooltip="Download"
      selected={selected}
      selectMenu={downloadTableData}
      className="t--table-download-btn"
    >
      <DownloadIcon />
    </TableActionIcon>
  );
};

export default TableDataDownload;
