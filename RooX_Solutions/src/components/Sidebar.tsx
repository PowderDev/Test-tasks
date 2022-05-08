import React, { FC } from "react";

const Sidebar: FC<{ handleSort: (type: "city" | "company") => void }> = ({ handleSort }) => {
  return (
    <div className="sidebar">
      <div className="sidebar__buttons">
        <h3 className="title">Сортировка</h3>
        <button className="button" onClick={() => handleSort("city")}>
          По городу
        </button>
        <button className="button" onClick={() => handleSort("company")}>
          По компании
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
