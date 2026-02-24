import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:300/api/auth",
  withCredentials: true,
});

export async function login(username, password) {
  try {
    const response = await api.post("/login", { username, password });
    return response.data;
  } catch (error) {
    console.error("Error Loggin in User ", error);
  }
}

export async function register(username, email, password) {
  try {
    const response = await api.post("/register", { username, email, password });
    return response.data;
  } catch (error) {
    console.error("Error Registering User ", error);
  }
}

export async function getMe() {
  try {
    const response = await api.get("/get-me");
    return response.data;
  } catch (error) {
    console.error("Error Fetching User Data ", error);
  }
}
