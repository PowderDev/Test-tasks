import axios from "axios";

export const $api = axios.create({
  baseURL: "https://bonus-test.evoapp.ru/api/3rdparty",
  headers: {
    Authorization: "435b7c13-ecaf-4265-83c8-186cca3242cc",
  },
});
