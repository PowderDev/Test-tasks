import React, { FC } from "react";
import { Link } from "react-router-dom";
import { User } from "../types/user";

const Card: FC<{ user: User }> = ({ user }) => {
  return (
    <div className="card">
      <div className="card__info">
        <p className="field">
          <span className="label">ФИО:</span>
          <span className="value">{user.name}</span>
        </p>
        <p className="field">
          <span className="label">Город:</span>
          <span className="value">{user.address.city}</span>
        </p>
        <p className="field">
          <span className="label">Компания:</span>
          <span className="value">{user.company.name}</span>
        </p>
      </div>
      <div className="card__actions">
        <Link to={`/edit/${user.id}`}>
          <figure className="details-link">Подробности</figure>
        </Link>
      </div>
    </div>
  );
};

export default Card;
