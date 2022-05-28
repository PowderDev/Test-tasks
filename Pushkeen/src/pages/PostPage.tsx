import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import PostComments from "../components/PostComments";
import { $api } from "../http";
import { Post as PostType } from "../types";

const PostPage = () => {
  const [post, setPost] = useState({} as PostType);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const { data } = await $api.get<PostType>(`/posts/${id}`);
      setPost(data);
    })();
  }, []);

  return (
    <div className="max-w-6xl m-auto p-6 h-full">
      <Post post={post} />
      <PostComments postId={post.id} />
    </div>
  );
};

export default PostPage;
