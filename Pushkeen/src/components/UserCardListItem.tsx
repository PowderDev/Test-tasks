import { FC, useEffect, useRef } from "react";
import { User } from "../types";
import gsap from "gsap";
import { getCardListAnimationConfig } from "../utils/animations";
import { useNavigate } from "react-router-dom";

const UserCardListItem: FC<{ user: User; index: number }> = ({ user, index }) => {
  const cardRef = useRef({} as HTMLDivElement);
  const nav = useNavigate();

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1.5, delay: index * 0.2 } });
    gsap.set(cardRef.current, { zIndex: 10 - index });
    const [from, to] = getCardListAnimationConfig(index);
    tl.fromTo(cardRef.current, from, to);
  }, []);

  return (
    <div ref={cardRef} className="user-list-item">
      <h2>{user.name.split(" ")[0]}</h2>
      <h2>{user.name.split(" ").slice(1).join(" ")}</h2>
      <button onClick={() => nav(`/user/${user.id}`)}>Смотреть профиль</button>
    </div>
  );
};

export default UserCardListItem;
