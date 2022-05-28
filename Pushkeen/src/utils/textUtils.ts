export const toTitle = (str: string) => str[0].toUpperCase() + str.slice(1);

export const textCut = (text: string, to: number) => {
  return text.slice(0, to) + (text.length > to ? "..." : "");
};
