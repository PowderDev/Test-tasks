import { Button, Modal, Stack, TextInput, Title } from "@mantine/core";
import RichTextEditor from "@mantine/rte";
import React, { FC, useContext, useEffect, useState } from "react";
import { StateContext } from "../App";
import { createPost, editPost, getPostById } from "../http/post";

interface Props {
  opened: boolean;
  toggleModal: () => void;
  postId?: number;
}

const PostModal: FC<Props> = ({ opened, toggleModal, postId }) => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const { user, setPosts } = useContext(StateContext);

  useEffect(() => {
    const get = async () => {
      if (postId && !Number.isNaN(postId)) {
        const post = await getPostById(postId);
        if (post) {
          setTitle(post.title);
          setValue(post.content);
        }
      }
    };

    get();
  }, [postId, opened]);

  const handleSubmit = async () => {
    if (postId) {
      const post = await editPost(postId, { title, authorId: user.id, content: value });
      if (post)
        setPosts((prev) => {
          const idx = prev.findIndex((p) => p.id === post.id);
          return [...prev.slice(0, idx), post, ...prev.slice(idx + 1)];
        });
    } else {
      const post = await createPost({ title, content: value });
      if (post) setPosts((prev) => [post, ...prev]);
    }
    setValue("");
    setTitle("");
    toggleModal();
  };

  return (
    <Modal
      onClick={(e) => e.stopPropagation()}
      size={"1000px"}
      opened={opened}
      onClose={() => toggleModal()}
    >
      <Title order={3} align="center">
        {postId ? "Edit my Blog Post" : "My new Blog Post"}
      </Title>
      <TextInput
        mb={"md"}
        label="Title:"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="My new story..."
      />
      <Stack align="center">
        <RichTextEditor
          style={{ minHeight: "450px", width: "100%" }}
          value={value}
          onChange={setValue}
          placeholder="Once upon a time..."
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </Stack>
    </Modal>
  );
};

export default PostModal;
