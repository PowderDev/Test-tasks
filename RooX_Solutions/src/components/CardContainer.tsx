import React, { FC, useEffect, useState } from "react";
import { User } from "../types/user";
import Card from "./Card";
import gsap from "gsap";

const CardContainer: FC<{ users: User[] }> = ({ users }) => {
  useEffect(() => {
    gsap.fromTo(
      ".card",
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, stagger: 0.1, duration: 1 }
    );
  }, [users]);

  return (
    <div className="main-container">
      <div className="card-container">
        <h2>Список пользователей</h2>
        {users.map((user) => (
          <Card key={user.id} user={user} />
        ))}
        <h3 className="count">Найдено {users.length} пользователей</h3>
      </div>
    </div>
  );
};

export default CardContainer;
