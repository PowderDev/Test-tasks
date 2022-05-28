import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types";

const UserProfileHeader: FC<{ user: User }> = ({ user }) => {
  const nav = useNavigate();

  return (
    <div className="user-profile-header">
      <div className="flex px-3 justify-between">
        <h2>{user.name}</h2>
        <button onClick={() => nav(-1)} className="bg-blue-300 rounded-lg p-2">
          Go Back
        </button>
      </div>
      <hr />
      <div className="info-list">
        <div className="info-list-item">
          <small>City</small>
          <div>{user.address.city}</div>
        </div>
        <div className="info-list-item">
          <small>Email</small>
          <div>{user.email}</div>
        </div>
        <div className="info-list-item">
          <small>Phone</small>
          <div>{user.phone}</div>
        </div>
        <div className="info-list-item">
          <small>Website</small>
          <div>{user.website}</div>
        </div>
        <div className="info-list-item">
          <small>Company name</small>
          <div>{user.company.name}</div>
        </div>
        <div className="info-list-item">
          <small>Company bs</small>
          <div>{user.company.bs}</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
