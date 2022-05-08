import React, { useEffect } from "react";
import UserForm from "../components/UserForm";
import gsap from "gsap";

const Edit = () => {
  useEffect(() => {
    gsap.fromTo(".edit-container", { x: "-100%" }, { x: 0, duration: 1 });
  }, []);

  return (
    <div className="edit-container">
      <h2>Профиль пользователя</h2>
      <UserForm />
    </div>
  );
};

export default Edit;
