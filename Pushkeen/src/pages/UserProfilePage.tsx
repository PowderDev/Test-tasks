import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserPosts from "../components/UserPosts";
import UserProfileHeader from "../components/UserProfileHeader";
import { $api } from "../http";
import { User } from "../types";

const UserProfile = () => {
  const [user, setUser] = useState({} as User);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const { data } = await $api.get<User>(`/users/${id}`);
      setUser(data);
    })();
  }, []);

  return user.id ? (
    <div className="user-profile">
      <UserProfileHeader user={user} />
      <UserPosts id={user.id} />
    </div>
  ) : (
    <div></div>
  );
};

export default UserProfile;
