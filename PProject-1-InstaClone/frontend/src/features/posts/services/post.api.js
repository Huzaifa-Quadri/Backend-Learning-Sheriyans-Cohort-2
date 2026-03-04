import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

async function getFeed() {
  const response = await api.get("/posts/feed");
  return response.data;
}

async function createPost(imageFile, caption) {
  const formData = new FormData();

  formData.append("image", imageFile);
  formData.append("caption", caption);

  const response = await api.post("/posts/create", formData);
  return response.data;
}

async function likePost(postId) {
  const response = await api.post(`/posts/like/${postId}`);
  return response.data;
}

async function unlikePost(postId) {
  const response = await api.post(`/posts/unlike/${postId}`);
  return response.data;
}

export { getFeed, createPost, likePost, unlikePost };
