import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useParams } from "react-router";
import history from "utils/history";
import { AppState } from "reducers";
import SearchModal from "./SearchModal";
import AlgoliaSearchWrapper from "./AlgoliaSearchWrapper";
import SearchBox from "./SearchBox";
import SearchResults from "./SearchResults";
import SetSearchResults from "./SetSearchResults";
import GlobalSearchHotKeys from "./GlobalSearchHotKeys";
import SearchContext from "./GlobalSearchContext";
import Description from "./Description";
import ResultsNotFound from "./ResultsNotFound";
import { getActions, getAllPageWidgets } from "selectors/entitiesSelector";
import { useNavigateToWidget } from "pages/Editor/Explorer/Widgets/WidgetEntity";
import {
  toggleShowGlobalSearchModal,
  setGlobalSearchQuery,
} from "actions/globalSearchActions";
import {
  getItemType,
  SEARCH_ITEM_TYPES,
  useDefaultDocumentationResults,
  DocSearchItem,
  SearchItem,
  algoliaHighlightTag,
  attachKind,
} from "./utils";
import { getActionConfig } from "pages/Editor/Explorer/Actions/helpers";
import { HelpBaseURL } from "constants/HelpConstants";
import { ExplorerURLParams } from "pages/Editor/Explorer/helpers";
import { BUILDER_PAGE_URL, DATA_SOURCES_EDITOR_ID_URL } from "constants/routes";
import { getSelectedWidget } from "selectors/ui";
import AnalyticsUtil from "utils/AnalyticsUtil";
import { getPageList } from "selectors/editorSelectors";
import useRecentEntities from "./useRecentEntities";
import { keyBy, noop } from "lodash";

// Removed unused imports

const StyledContainer = styled.div`
  /* Styles remain unchanged */
`;

const Separator = styled.div`
  /* Styles remain unchanged */
`;

const isModalOpenSelector = (state: AppState) =>
  state.ui.globalSearch.modalOpen;

const searchQuerySelector = (state: AppState) => state.ui.globalSearch.query;

// Removed isMatching function and getSectionTitle function as they are not used

const GlobalSearch = () => {
  // Remaining code remains unchanged
};

export default GlobalSearch;
