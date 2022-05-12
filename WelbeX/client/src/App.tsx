import { Container, Stack } from "@mantine/core";
import { createContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import { getMe } from "./http/auth";
import { getAllPosts } from "./http/post";
import { BlogPost, User } from "./types";

export const StateContext = createContext({
  user: {} as User,
  setUser: {} as (u: User) => void,
  posts: [] as BlogPost[],
  setPosts: {} as (p: (posts: BlogPost[]) => BlogPost[]) => void,
});

function App() {
  const [user, setUser] = useState({} as User);
  const [posts, setPosts] = useState([] as BlogPost[]);

  useEffect(() => {
    const get = async () => {
      if (localStorage.getItem("token")) {
        const me = await getMe();
        if (me) setUser(me);
      }
      const p = await getAllPosts();
      if (p) setPosts(p);
    };

    get();
  }, []);

  return (
    <StateContext.Provider value={{ user, setUser, posts, setPosts }}>
      <Container style={{ minHeight: "100vh" }} size="lg">
        <Stack justify={"center"} align="center" pt={"7.5rem"} style={{ minHeight: "100vh" }}>
          <Navbar />
          <PostList />
        </Stack>
      </Container>
    </StateContext.Provider>
  );
}

export default App;
