import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { WbSunnyIcon, Brightness2Icon } from "@mui/icons-material";
import { useContext } from "react";
import { DarkModeContext } from "../DarkModeContext";
import "./index.css";

const DarkModeSwitcher = () => {
  const { mode, setMode } = useContext(DarkModeContext);

  return (
    <div className="theme-switcher">
      <ToggleButtonGroup
        size="small"
        value={mode}
        exclusive
        onChange={(_e, value) => setMode(value)}
        aria-label="theme switcher"
      >
        <ToggleButton value="light">
          <WbSunnyIcon />
        </ToggleButton>
        <ToggleButton value="dark">
          <Brightness2Icon />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

export default DarkModeSwitcher;
