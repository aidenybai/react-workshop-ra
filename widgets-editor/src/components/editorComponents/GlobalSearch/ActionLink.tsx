import React, { useContext } from "react";
import Icon, { IconSize } from "components/ads/Icon";
import { Theme } from "constants/DefaultTheme";
import styled, { withTheme } from "styled-components";
import SearchContext from "./GlobalSearchContext";
import { SearchItem } from "./utils";

const StyledActionLink = styled.span<{ isActiveItem?: boolean }>`
  visibility: ${(props) => (props.isActiveItem ? "visible" : "hidden")};
  display: inline-flex;
`;

const ActionLink = withTheme(
  ({
    item,
    theme,
    isActiveItem,
  }: {
    item: SearchItem;
    theme: Theme;
    isActiveItem?: boolean;
  }) => {
    const searchContext = useContext(SearchContext);
    const handleIconClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      e.stopPropagation(); // to prevent toggleModal getting called twice
      searchContext?.handleItemLinkClick(item, "SEARCH_ITEM_ICON_CLICK");
    };

    return (
      <StyledActionLink isActiveItem={isActiveItem}>
        <Icon
          name="link"
          size={IconSize.LARGE}
          fillColor={theme.colors.globalSearch.searchItemText}
          onClick={handleIconClick}
        />
      </StyledActionLink>
    );
  },
);

export default ActionLink;
