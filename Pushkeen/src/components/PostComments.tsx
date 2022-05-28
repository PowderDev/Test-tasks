import React, { FC, useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { $api } from "../http";
import { Comment } from "../types";
import gsap from "gsap";

const PostComments: FC<{ postId: number }> = ({ postId }) => {
  const [comments, setComments] = useState([] as Comment[]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await $api.get<Comment[]>(`/comments?postId=${postId}`);
      setComments(data);
    })();
  }, [postId]);

  const onSubmit = async () => {
    const { data } = await $api.post<Comment>(`/comments?postId=${postId}`, { name, email, body });
    setComments((prev) => [data, ...prev]);
    setName("");
    setEmail("");
    setBody("");
  };

  return (
    <div className="mt-16 flex flex-col">
      <div className="flex flex-col shadow-xl p-4 gap-2">
        <div className="flex flex-col items-start">
          <label htmlFor="name" className="text-sm">
            Name:
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="border-2 outline-none w-72 h-10 rounded-lg"
          />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="email" className="text-sm">
            Email:
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="border-2 outline-none w-72 h-10 rounded-lg"
          />
        </div>
        <div className="flex items-center gap-5">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="border-2 outline-none resize-none"
            cols={60}
            rows={4}
          />
          <button onClick={onSubmit} className="bg-blue-400 py-7 px-3 rounded-lg active:scale-95">
            Отправить
          </button>
        </div>
      </div>
      <TransitionGroup>
        <div className="flex flex-col gap-5 py-7">
          {comments.map((comment, i) => (
            <CSSTransition timeout={1000} in={true} key={comment.id} data-index={i} onEnter={enter}>
              <div className="flex flex-col shadow-lg border-2 border-gray-400 rounded-lg p-5">
                <div className="flex gap-2 items-center">
                  <small>Name:</small>
                  <figure>{comment.name}</figure>
                </div>
                <div className="flex gap-2 items-center">
                  <small>Email:</small>
                  <figure>{comment.email}</figure>
                </div>
                <p className="p-4 whitespace-pre">{comment.body}</p>
              </div>
            </CSSTransition>
          ))}
        </div>
      </TransitionGroup>
    </div>
  );
};

function enter(el: HTMLElement) {
  gsap.fromTo(
    el,
    { opacity: 0 },
    { opacity: 1, duration: 1, delay: Number(el.dataset.index) * 0.2 }
  );
}

export default PostComments;
