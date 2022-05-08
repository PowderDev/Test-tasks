import React, { useEffect, useState } from "react";
import CardContainer from "../components/CardContainer";
import Sidebar from "../components/Sidebar";
import { User } from "../types/user";

const Main = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSort = (type: "city" | "company") => {
    let sortedUsers: User[];

    if (type === "city") {
      sortedUsers = [...users.sort((a, b) => (a.address.city > b.address.city ? 1 : -1))];
    } else {
      sortedUsers = [...users.sort((a, b) => (a.company.name > b.company.name ? 1 : -1))];
    }

    setUsers(sortedUsers);
  };

  return (
    <>
      <Sidebar handleSort={handleSort} />
      <CardContainer users={users} />
    </>
  );
};

export default Main;
