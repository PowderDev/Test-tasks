import axios from "axios"

export const api = axios.create({
  baseURL: "https://api.fastforex.io",
  params: {
    api_key: import.meta.env._API_KEY,
  },
})
