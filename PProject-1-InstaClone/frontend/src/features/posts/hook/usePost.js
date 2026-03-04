import { useContext } from "react";
import {
  getFeed,
  createPost,
  likePost,
  unlikePost,
} from "../services/post.api";
import { PostContext } from "../post.context";

export const usePost = () => {
  const context = useContext(PostContext);

  const { loading, setLoading, post, setPost, feed, setFeed } = context;

  const handleGetFeed = async () => {
    setLoading(true);
    const data = await getFeed();
    setFeed(data.posts.reverse()); //? Reversing the posts to show the latest post first
    setLoading(false);
  };

  const handleCreatePost = async (imageFile, caption) => {
    setLoading(true);
    const data = await createPost(imageFile, caption);
    setFeed([data.post, ...feed]);
    setLoading(false);
  };

  const handleLikePost = async (postId) => {
    // Optimistic Update locally
    setFeed((currentFeed) =>
      currentFeed.map((p) => (p._id === postId ? { ...p, isLiked: true } : p)),
    );
    try {
      await likePost(postId);
    } catch (e) {
      // Revert if API fails
      setFeed((currentFeed) =>
        currentFeed.map((p) =>
          p._id === postId ? { ...p, isLiked: false } : p,
        ),
      );
    }
  };

  const handleUnlikePost = async (postId) => {
    // Optimistic Update locally
    setFeed((currentFeed) =>
      currentFeed.map((p) => (p._id === postId ? { ...p, isLiked: false } : p)),
    );
    try {
      await unlikePost(postId);
    } catch (e) {
      // Revert if API fails
      setFeed((currentFeed) =>
        currentFeed.map((p) =>
          p._id === postId ? { ...p, isLiked: true } : p,
        ),
      );
    }
  };

  return {
    loading,
    post,
    feed,
    handleGetFeed,
    handleCreatePost,
    handleLikePost,
    handleUnlikePost,
  };
};
