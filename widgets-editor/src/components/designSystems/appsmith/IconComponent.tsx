import React from "react";
import { Icon, Intent } from "@blueprintjs/core";
import { IconName } from "@blueprintjs/icons";
import { noop } from "utils/AppsmithUtils";

export type IconType = IconName | string;

interface IconComponentProps {
  iconSize?: number;
  iconName?: IconType;
  intent?: Intent;
  disabled?: boolean;
  onClick?: () => void;
  color: string;
}

class IconComponent extends React.Component<IconComponentProps> {
  render() {
    const { iconSize, iconName, intent, disabled, onClick, color } = this.props;
    const cursorStyle = onClick && !disabled ? "pointer" : "auto";

    return (
      <Icon
        style={{ cursor: cursorStyle }}
        icon={iconName as IconName}
        iconSize={iconSize}
        intent={intent}
        onClick={disabled ? noop : onClick}
        color={color}
      />
    );
  }
}

export default IconComponent;
