import React from "react";
import { CommonComponentProps, Variant } from "./common";
import styled from "styled-components";
import { toast, ToastOptions, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReduxActionType } from "constants/ReduxActionConstants";
import { useDispatch } from "react-redux";

type ToastProps = ToastOptions &
  CommonComponentProps & {
    text: string;
    variant?: Variant;
    duration?: number;
    onUndo?: () => void;
    dispatchableAction?: { type: ReduxActionType; payload: any };
    hideProgressBar?: boolean;
  };

const WrappedToastContainer = styled.div`
  /* styles remain unchanged */
`;

export const StyledToastContainer = (props: ToastOptions) => {
  return (
    <WrappedToastContainer>
      <ToastContainer {...props} />
    </WrappedToastContainer>
  );
};

const ToastBody = styled.div<{
  variant?: Variant;
  isUndo?: boolean;
  dispatchableAction?: { type: ReduxActionType; payload: any };
}>`
  /* styles remain unchanged */
`;

const FlexContainer = styled.div`
  /* styles remain unchanged */
`;

const ToastComponent = (props: ToastProps & { undoAction?: () => void }) => {
  const dispatch = useDispatch();

  return (
    <ToastBody
      variant={props.variant || Variant.info}
      isUndo={!!props.onUndo}
      dispatchableAction={props.dispatchableAction}
      className="t--toast-action"
    >
      <FlexContainer>
        {/* icon and text rendering logic remains unchanged */}
      </FlexContainer>
      <div className="undo-section">
        {/* undo logic remains unchanged */}
      </div>
    </ToastBody>
  );
};

export const Toaster = {
  show: (config: ToastProps) => {
    // validation and toast logic remains unchanged
  },
  clear: () => toast.dismiss(),
};
