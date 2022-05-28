import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Post as PostType } from "../types";
import { toTitle } from "../utils/textUtils";

const Post: FC<{ post: PostType }> = ({ post }) => {
  const nav = useNavigate();

  return post.id ? (
    <div>
      <div className="flex px-3 justify-between">
        <h1 className="text-4xl">{toTitle(post.title)}</h1>
        <button onClick={() => nav(-1)} className="bg-blue-300 rounded-lg p-2">
          Go Back
        </button>
      </div>
      <hr />
      <p className="p-16 text-xl ">{post.body}</p>
    </div>
  ) : (
    <div></div>
  );
};

export default Post;
