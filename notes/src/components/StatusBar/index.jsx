import { observer } from "mobx-react-lite";
import DarkModeInfo from "../DarkModeInfo";
import PublishingTo from "../PublishingTo";

const StatusBar = observer(({ store }) => (
  <div>
    <PublishingTo
      publishingTarget={store.publishingConfig.target}
      onPublishingTargetChange={store.setPublishingTarget}
    />{" "}
    · <DarkModeInfo /> · Status: {store.status}
  </div>
));

export default StatusBar;
