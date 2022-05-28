export const getCardListAnimationConfig = (i: number, from: "above" | "bellow" = "above") => {
  const rest = i % 3;
  if (rest == 0) return [{ x: 750 }, { x: 0 }];
  else if (rest == 2) return [{ y: (from === "above" ? -215 : 300) * i }, { y: 0 }];
  else return [{ x: -750 }, { x: 0 }];
};
