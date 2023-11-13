import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import * as Sentry from "@sentry/react";

type Props = { children: ReactNode };
type State = { hasError: boolean };

const ErrorBoundaryContainer = styled.div`
  height: 100%;
  width: 100%;

  > div {
    height: 100%;
    width: 100%;
  }
`;

const RetryLink = styled.span`
  color: ${(props) => props.theme.colors.primaryDarkest};
  cursor: pointer;
`;

const ErrorBoundary: React.FC<Props> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const handleRetry = () => {
    setHasError(false);
  };

  const handleCatch = (error: any, errorInfo: any) => {
    console.error({ error, errorInfo });
    Sentry.captureException(error);
  };

  return (
    <ErrorBoundaryContainer>
      {hasError ? (
        <p>
          Oops, Something went wrong.
          <br />
          <RetryLink onClick={handleRetry}>
            Click here to retry
          </RetryLink>
        </p>
      ) : (
        children
      )}
    </ErrorBoundaryContainer>
  );
};

export default ErrorBoundary;
