import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OnboardingHelperConfig, OnboardingStep } from "constants/OnboardingConstants";
import { getHelperConfig } from "sagas/OnboardingSagas";
import { getCurrentUser } from "selectors/usersSelectors";
import { showOnboardingHelper, setHelperConfig } from "actions/onboardingActions";
import { getOnboardingWelcomeState } from "utils/storage";
import { RootState } from "store";
import OnboardingHelper from "./Helper";

const WelcomeHelper = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const showWelcomeHelper = useSelector((state: RootState) => state.ui.onBoarding.showWelcomeHelper);
  const helperConfig = getHelperConfig(OnboardingStep.WELCOME) as OnboardingHelperConfig;

  useEffect(() => {
    const isInOnboarding = async () => {
      const inOnboarding = await getOnboardingWelcomeState();

      if (inOnboarding && currentUser) {
        dispatch(showOnboardingHelper(true));
      }
    };

    dispatch(setHelperConfig(helperConfig));
    isInOnboarding();
  }, [currentUser, dispatch]);

  if (!showWelcomeHelper) return null;

  return <OnboardingHelper />;
};

export default WelcomeHelper;
