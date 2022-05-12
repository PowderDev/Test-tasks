import $api from ".";
import { User } from "../types";

export async function authSubmit(type: "register" | "login", values: any) {
  try {
    const { data } = await $api.post<{ accessToken: string }>(`/auth/${type}`, values);
    localStorage.setItem("token", data.accessToken);
  } catch (err: any) {
    if (err.response.data.message) {
      console.error(err.response.data.message);
    } else {
      console.error(err);
    }
  }
}

export async function getMe() {
  try {
    const { data } = await $api.get<User>("/user/me");
    return data;
  } catch (err: any) {
    if (err.response.data.message) {
      console.error(err.response.data.message);
    } else {
      console.error(err);
    }
  }
}

export async function logout() {
  try {
    await $api.post(`/auth/logout`);
    localStorage.removeItem("token");
  } catch (err: any) {
    if (err.response.data.message) {
      console.error(err.response.data.message);
    } else {
      console.error(err);
    }
  }
}
