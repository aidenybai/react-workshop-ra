import { Avatar, AvatarGroup } from "@mui/material";
import { useSelector } from "react-redux";
import avatar1 from "./avatar1.jpg";
import avatar2 from "./avatar2.jpg";
import avatar3 from "./avatar3.jpg";

const ActiveAuthors = () => {
  const activeThisMonth = useSelector((state) =>
    state.users.filter(
      (user) =>
        new Date(user.lastActiveDate).getFullYear() === 2023 &&
        new Date(user.lastActiveDate).getMonth() === 0
    )
  );

  return (
    <div className="primary-pane__authors">
      <div className="primary-pane__authors-last-active">
        {`${activeThisMonth.length} users active this month: ${activeThisMonth.map((user) => user.name).join(", ")}`}
      </div>
      <AvatarGroup max={2}>
        <Avatar src={avatar1} />
        <Avatar src={avatar2} />
        <Avatar src={avatar3} />
      </AvatarGroup>
    </div>
  );
}

export default ActiveAuthors;
