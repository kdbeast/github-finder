import { FaGithubAlt } from "react-icons/fa";
import type { GitHubUser } from "../types";

const UserCard = ({ data }: { data: GitHubUser }) => {
  return (
    <div className="user-card">
      <img src={data.avatar_url} alt={data.name} className="avatar" />
      <h2>{data.name}</h2>
      <p>{data.bio}</p>
      <a
        href={data.html_url}
        className="profile-btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithubAlt /> View Github Profile
      </a>
    </div>
  );
};

export default UserCard;
