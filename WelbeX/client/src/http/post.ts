import $api from ".";
import { BlogPost } from "../types";

export async function getAllPosts() {
  try {
    const { data } = await $api.get<BlogPost[]>(`/posts/all`);
    return data;
  } catch (err: any) {
    if (err.response.data.message) {
      console.error(err.response.data.message);
    } else {
      console.error(err);
    }
  }
}

export async function createPost(values: any) {
  try {
    const { data } = await $api.post<BlogPost>(`/posts/create`, values);
    return data;
  } catch (err: any) {
    if (err.response.data.message) {
      console.error(err.response.data.message);
    } else {
      console.error(err);
    }
  }
}

export async function editPost(postId: number, values: any) {
  try {
    const { data } = await $api.put<BlogPost>(`/posts/edit/${postId}`, values);
    return data;
  } catch (err: any) {
    if (err.response.data.message) {
      console.error(err.response.data.message);
    } else {
      console.error(err);
    }
  }
}

export async function getPostById(id: number) {
  try {
    const { data } = await $api.get<BlogPost>(`/posts/${id}`);
    return data;
  } catch (err: any) {
    if (err.response.data.message) {
      console.error(err.response.data.message);
    } else {
      console.error(err);
    }
  }
}

export async function deletePost(postId: number) {
  try {
    await $api.delete(`/posts/delete/${postId}`);
  } catch (err: any) {
    if (err.response.data.message) {
      console.error(err.response.data.message);
    } else {
      console.error(err);
    }
  }
}
