import { Accordion, Button, Group, Stack, Text, Title } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import RichTextEditor from "@mantine/rte";
import { useContext, useEffect, useRef, useState } from "react";
import { StateContext } from "../App";
import { User } from "../types";
import PostModal from "./PostModal";
import gsap from "gsap";
import { deletePost } from "../http/post";

interface Props {
  title: string;
  author: User;
  id: number;
  setPostId: (id: number) => void;
  toggleModal: () => void;
}

function AccordionLabel({ title, author, id, setPostId, toggleModal }: Props) {
  const [mine, setMine] = useState(false);
  const { user, setPosts } = useContext(StateContext);

  useEffect(() => {
    setMine(author.id === user.id);
  }, [user]);

  const handleDelete = async (e: any) => {
    e.stopPropagation();
    await gsap.to(`.postId-${id}`, { opacity: 0, x: "-100%", duration: 1 });
    await deletePost(id);
    gsap.set(`.postId-${id}`, { opacity: 1, x: 0 });
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    setPostId(id);
    toggleModal();
  };

  return (
    <Group style={{ justifyContent: mine ? "space-between" : "flex-start" }}>
      <Stack>
        <Title order={4}>{title}</Title>
        <Text size="sm" color="dimmed">
          By: {author.nickname}
        </Text>
      </Stack>
      {mine && (
        <Group>
          <Button onClick={handleClick}>Edit</Button>
          <Button color="red" onClick={handleDelete}>
            Delete
          </Button>
        </Group>
      )}
    </Group>
  );
}

const PostList = () => {
  const [opened, toggleModal] = useToggle(false, [true, false]);
  const [firstRender, setFirstRender] = useState(true);
  const [postId, setPostId] = useState<number>(NaN);
  const { posts } = useContext(StateContext);

  useEffect(() => {
    if (firstRender) {
      gsap.fromTo(
        ".post",
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1.5, stagger: 0.1 }
      );
      setFirstRender(false);
    }
  }, [posts]);

  return (
    <>
      <Accordion iconPosition="right" style={{ width: "100%" }}>
        {posts.map((post) => (
          <Accordion.Item
            key={post.id}
            className={`postId-${post.id} post`}
            label={<AccordionLabel {...{ ...post, setPostId, toggleModal }} />}
          >
            <RichTextEditor readOnly value={post.content} onChange={() => {}} />
          </Accordion.Item>
        ))}
      </Accordion>
      <PostModal postId={postId} opened={opened} toggleModal={toggleModal} />
    </>
  );
};

export default PostList;
