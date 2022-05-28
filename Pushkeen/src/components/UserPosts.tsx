import React, { FC, useEffect, useState } from "react";
import { $api } from "../http";
import { Post } from "../types";
import { textCut, toTitle } from "../utils/textUtils";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import gsap from "gsap";
import { getCardListAnimationConfig } from "../utils/animations";
import { useNavigate } from "react-router-dom";

const UserPosts: FC<{ id: number }> = ({ id }) => {
  const [posts, setPosts] = useState([] as Post[]);
  const [page, setPage] = useState(1);
  const [buttonHidden, setButtonHidden] = useState(true);

  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await $api.get<Post[]>(`/posts?userId=${id}`);
      setPosts(data);
    })();
  }, []);

  useEffect(() => {
    setButtonHidden(true);
    setTimeout(() => setButtonHidden(false), 2400);
  }, [posts, page]);

  return (
    <div className="flex flex-col gap-5 mt-10 items-center py-10">
      <h2 className="text-4xl">Посты</h2>
      <TransitionGroup>
        <div className="grid grid-cols-3 gap-2">
          {posts.slice(0, 3 * page).map((post, i) => (
            <CSSTransition
              in={true}
              key={post.id}
              timeout={1500}
              data-index={i + 1}
              onEnter={enter}
            >
              <div
                className="shadow-lg border-2 border-gray-400 flex flex-col rounded-xl cursor-pointer"
                key={post.id}
                onClick={() => nav(`/post/${post.id}`)}
              >
                <h3 className="p-2 text-xl text-center">{toTitle(post.title)}</h3>
                <p className="p-4">{toTitle(textCut(post.body, 75))}</p>
              </div>
            </CSSTransition>
          ))}
        </div>
      </TransitionGroup>
      {page < 4 && !buttonHidden && (
        <button className="bg-slate-400 px-4 py-2 rounded-lg" onClick={() => setPage(page + 1)}>
          Загрузить еще
        </button>
      )}
    </div>
  );
};

const enter = (el: HTMLElement) => {
  const index = Number(el.dataset.index);
  const tl = gsap.timeline({ defaults: { duration: 1.5, delay: ((index % 3) + 1) * 0.2 } });
  const [from, to] = getCardListAnimationConfig(index, "bellow");
  tl.fromTo(el, from, to);
};

export default UserPosts;
