import { observer } from "mobx-react-lite";
import "./index.css";

const PublishingTo = observer(({ publishingTarget, onPublishingTargetChange }) => {
  const handleButtonClick = () => {
    const newTarget = prompt("New target?");
    onPublishingTargetChange(newTarget);
  };

  return (
    <>
      Publishing to: {publishingTarget}{" "}
      <button
        className="publishing-to__button"
        onClick={handleButtonClick}
      >
        (edit)
      </button>
    </>
  );
});

export default PublishingTo;
