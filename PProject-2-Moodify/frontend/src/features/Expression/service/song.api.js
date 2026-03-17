import axios from "axios";

const api = axios.create({
  baseURL: "/api/songs",
  withCredentials: true,
});

export async function getSong({ mood }) {
  const response = await api.get(`/getSong?mood=${mood}`);
  return response.data;
}
