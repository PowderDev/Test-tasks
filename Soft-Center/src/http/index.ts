import axios from "axios";

export const $api = axios.create({
  baseURL: "https://bonus-test.evoapp.ru/api/3rdparty",
  headers: {
    Authorization: import.meta.env._APIKEY,
  },
});
