export interface User {
  id: number;
  nickname: string;
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  authorId: number;
  author: User;
}
