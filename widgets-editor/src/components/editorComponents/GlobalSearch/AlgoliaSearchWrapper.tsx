import React, { useState, useEffect } from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";
import { getAppsmithConfigs } from "configs";

const { algolia } = getAppsmithConfigs();
const searchClient = algoliasearch(algolia.apiId, algolia.apiKey);

type SearchProps = {
  query: string;
  children: React.ReactNode;
};

const AlgoliaSearchWrapper = ({ query, children }: SearchProps) => {
  const [queryInState, setQueryInState] = useState(query);

  useEffect(() => {
    setQueryInState(query);
  }, [query]);

  return (
    <InstantSearch
      searchState={{ query: queryInState }}
      indexName={algolia.indexName}
      searchClient={searchClient}
    >
      {children}
    </InstantSearch>
  );
};

export default AlgoliaSearchWrapper;
