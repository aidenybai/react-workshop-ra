import { useContext } from "react";
import Button from "@mui/material/Button";
import { DarkModeContext } from "../DarkModeContext";
import "./index.css";

const DarkModeInfo = () => {
  const { mode } = useContext(DarkModeContext);

  const handleClick = () => alert("Ha, thought you can click me?");

  return (
    <span>
      Mode:{" "}
      <Button
        classes={{ root: "dark-mode-info__button" }}
        size="small"
        onClick={handleClick}
      >
        {mode}
      </Button>
    </span>
  );
}

export default DarkModeInfo;
