import React, { useEffect, useState } from "react";
import { $api } from "../http";
import { User } from "../types";
import UserCardListItem from "./UserCardListItem";

const UserCardList = () => {
  const [users, setUsers] = useState([] as User[]);

  useEffect(() => {
    (async () => {
      const { data } = await $api.get<User[]>("/users");
      setUsers(data);
    })();
  }, []);
  return (
    <div className="user-list">
      {users.map((user, i) => (
        <UserCardListItem key={user.id} user={user} index={i + 1} />
      ))}
    </div>
  );
};

export default UserCardList;
