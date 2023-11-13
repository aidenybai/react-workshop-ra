import React, { SyntheticEvent, useEffect, useState } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Hits,
  SearchBox,
  Highlight,
  Configure,
  PoweredBy,
} from "react-instantsearch-dom";
import "instantsearch.css/themes/algolia.css";
import { connect } from "react-redux";
import styled from "styled-components";
import { HelpIcons } from "icons/HelpIcons";
import { HelpBaseURL } from "constants/HelpConstants";
import { getDefaultRefinement } from "selectors/helpSelectors";
import { getAppsmithConfigs } from "configs";
import { AppState } from "reducers";
import {
  setHelpDefaultRefinement,
  setHelpModalVisibility,
} from "actions/helpActions";
import { Icon } from "@blueprintjs/core";
import moment from "moment";
import { getCurrentUser } from "selectors/usersSelectors";
import { User } from "constants/userConstants";

const {
  algolia,
  appVersion,
  cloudHosting,
  intercomAppID,
} = getAppsmithConfigs();
const searchClient = algoliasearch(algolia.apiId, algolia.apiKey);

// Styled components and icons remain unchanged

// Hit component remains unchanged

// DefaultHelpMenuItem component remains unchanged

// SearchContainer styled component remains unchanged

// Header styled component remains unchanged

// StyledPoweredBy styled component remains unchanged

// HelpContainer styled component remains unchanged

// HelpFooter styled component remains unchanged

// HelpBody styled component remains unchanged

type Props = {
  hitsPerPage: number;
  defaultRefinement: string;
  dispatch: any;
  hideSearch?: boolean;
  hideMinimizeBtn?: boolean;
  user?: User;
};
type State = { showResults: boolean };

type HelpItem = {
  label: string;
  link?: string;
  id?: string;
  icon: React.ReactNode;
};

const HELP_MENU_ITEMS: HelpItem[] = [
  // Updated HELP_MENU_ITEMS
];

const DocumentationSearch: React.FC<Props> = ({
  hitsPerPage,
  defaultRefinement,
  dispatch,
  hideSearch,
  hideMinimizeBtn,
  user,
}) => {
  const [showResults, setShowResults] = useState(defaultRefinement.length > 0);

  useEffect(() => {
    if (cloudHosting && intercomAppID && window.Intercom) {
      window.Intercom("boot", {
        app_id: intercomAppID,
        user_id: user?.username,
        name: user?.name,
        email: user?.email,
      });
    }
  }, [cloudHosting, intercomAppID, user]);

  const onSearchValueChange = (event: SyntheticEvent<HTMLInputElement, Event>) => {
    const value = event.currentTarget.value;
    if (value === "" && showResults) {
      setShowResults(false);
    } else if (value !== "" && !showResults) {
      setShowResults(true);
    }
  };

  const handleClose = () => {
    dispatch(setHelpModalVisibility(false));
    dispatch(setHelpDefaultRefinement(""));
  };

  if (!algolia.enabled) return null;

  return (
    <SearchContainer className="ais-InstantSearch t--docSearchModal">
      {!hideMinimizeBtn && (
        <Icon
          className="t--docsMinimize"
          style={{
            position: "absolute",
            top: 6,
            right: 10,
            cursor: "pointer",
            zIndex: 1,
          }}
          icon="minus"
          color="white"
          iconSize={14}
          onClick={handleClose}
        />
      )}
      <InstantSearch indexName={algolia.indexName} searchClient={searchClient}>
        <Configure hitsPerPage={hitsPerPage} />
        <HelpContainer>
          {!hideSearch && (
            <Header>
              <StyledPoweredBy />
              <SearchBox
                onChange={onSearchValueChange}
                defaultRefinement={defaultRefinement}
              />
            </Header>
          )}
          <HelpBody hideSearch={hideSearch}>
            {showResults ? (
              <Hits hitComponent={Hit as any} />
            ) : (
              <ul className="ais-Hits-list">
                {HELP_MENU_ITEMS.map((item) => (
                  <DefaultHelpMenuItem
                    key={item.label}
                    item={item}
                    onSelect={handleClose}
                  />
                ))}
              </ul>
            )}
          </HelpBody>
          {appVersion.id && (
            <HelpFooter>
              <span>Appsmith {appVersion.id}</span>
              <span>Released {moment(appVersion.releaseDate).fromNow()}</span>
            </HelpFooter>
          )}
        </HelpContainer>
      </InstantSearch>
    </SearchContainer>
  );
};

const mapStateToProps = (state: AppState) => ({
  defaultRefinement: getDefaultRefinement(state),
  user: getCurrentUser(state),
});

export default connect(mapStateToProps)(DocumentationSearch);
