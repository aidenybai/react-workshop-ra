import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { getCurrentStep, inOnboarding } from "sagas/OnboardingSagas";
import { OnboardingStep } from "constants/OnboardingConstants";

type BoxedProps = {
  step: OnboardingStep;
  show?: boolean;
  alternative?: ReactNode;
  children: ReactNode;
};

const Boxed: React.FC<BoxedProps> = (props: BoxedProps) => {
  const currentStep = useSelector(getCurrentStep);
  const onboarding = useSelector(inOnboarding);

  if (onboarding && currentStep < props.step && !props.show) {
    if (props.alternative) {
      return <>{props.alternative}</>;
    }
    return null;
  }

  return <>{props.children}</>;
};

Boxed.defaultProps = {
  show: false,
};

export default Boxed;
