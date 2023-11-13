import React, { useEffect, useCallback } from "react";
import { connectHits } from "react-instantsearch-dom";
import { Hit as IHit } from "react-instantsearch-core";
import { debounce } from "lodash";
import { DocSearchItem, SearchItem, SEARCH_ITEM_TYPES } from "./utils";

type Props = {
  setDocumentationSearchResults: (item: DocSearchItem) => void;
  hits: IHit[];
};

const SetSearchResults = ({ hits, setDocumentationSearchResults }: Props) => {
  const debouncedSetter = useCallback(
    debounce((filteredHits: IHit[]) => {
      const filteredDocs = filteredHits.filter(
        (doc: SearchItem) => doc.kind === SEARCH_ITEM_TYPES.document
      );
      setDocumentationSearchResults(filteredDocs as any);
    }, 100),
    [setDocumentationSearchResults]
  );

  useEffect(() => {
    debouncedSetter(hits);
  }, [hits, debouncedSetter]);

  return null;
};

export default connectHits<Props, IHit>(SetSearchResults);
