export interface CreatePostDTO {
  authorId: number;
  content: string;
  title: string;
}

export interface PostDTO extends CreatePostDTO {
  id: number;
}
