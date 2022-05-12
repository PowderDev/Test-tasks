import React, { useContext, useEffect } from "react";
import { Button, Group, Title } from "@mantine/core";
import AuthModal from "./AuthModal";
import { useToggle } from "@mantine/hooks";
import { StateContext } from "../App";
import { logout } from "../http/auth";
import { User } from "../types";
import PostModal from "./PostModal";

const Navbar = () => {
  const [opened, toggleModal] = useToggle(false, [true, false]);
  const [openedPostModal, togglePostModal] = useToggle(false, [true, false]);
  const { user, setUser } = useContext(StateContext);

  const handleLogout = async () => {
    await logout();
    setUser({} as User);
  };

  return (
    <>
      <Group
        style={{ justifyContent: "space-around", position: "fixed", width: "100%", top: 0 }}
        pt="sm"
      >
        <Button
          disabled={!user.id}
          variant="gradient"
          gradient={{ from: "teal", to: "lime", deg: 105 }}
          onClick={() => togglePostModal()}
        >
          Create Post
        </Button>
        <Title order={3}>MelbeX</Title>
        {!user.id ? (
          <Button
            onClick={() => toggleModal()}
            variant="gradient"
            gradient={{ from: "teal", to: "blue", deg: 60 }}
          >
            Login/Register
          </Button>
        ) : (
          <Button
            onClick={handleLogout}
            variant="gradient"
            gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
          >
            Logout
          </Button>
        )}
      </Group>
      <AuthModal opened={opened} toggleModal={toggleModal} />
      <PostModal opened={openedPostModal} toggleModal={togglePostModal} />
    </>
  );
};

export default Navbar;
