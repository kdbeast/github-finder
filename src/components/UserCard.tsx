import { FaGithubAlt, FaUserMinus, FaUserPlus } from "react-icons/fa";
import type { GitHubUser } from "../types";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  checkIfFollowingUser,
  followGithubUser,
  unfollowGithubUser,
} from "../api/github";
import { toast } from "sonner";

const UserCard = ({ data }: { data: GitHubUser }) => {
  // Query to check if user is following
  const { data: isFollowing, refetch } = useQuery({
    queryKey: ["is-following", data.login],
    queryFn: () => checkIfFollowingUser(data.login),
    enabled: !!data.login,
  });

  // Mutation to follow the user
  const followMutation = useMutation({
    mutationFn: () => followGithubUser(data.login),
    onSuccess: () => {
      toast.success(`You are now following ${data.login}`);
      refetch();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // Mutation to unfollow the user
  const unfollowMutation = useMutation({
    mutationFn: () => unfollowGithubUser(data.login),
    onSuccess: () => {
      toast.success(`You are no longer following ${data.login}`);
      refetch();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleFollow = () => {
    if (isFollowing) {
      // User is already following, unfollow
      unfollowMutation.mutate();
    } else {
      // User is not following, follow
      followMutation.mutate();
    }
  };

  return (
    <div className="user-card">
      <img src={data.avatar_url} alt={data.name} className="avatar" />
      <h2>{data.name}</h2>
      <p>{data.bio}</p>
      <div className="user-card-buttons">
        <button
          disabled={followMutation.isPending || unfollowMutation.isPending}
          onClick={handleFollow}
          className={`follow-btn ${isFollowing ? "following" : ""}`}
        >
          {isFollowing ? (
            <>
              <FaUserMinus className="follow-icon" /> Following
            </>
          ) : (
            <>
              <FaUserPlus className="follow-icon" /> Follow User
            </>
          )}
        </button>
        <a
          href={data.html_url}
          className="profile-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithubAlt /> View Github Profile
        </a>
      </div>
    </div>
  );
};

export default UserCard;
