import React, { useEffect } from "react";
import "../style/feed.scss";
import Post from "../components/post";
import { usePost } from "../hook/usePost";

const Feed = () => {
  const { feed, handleGetFeed, loading, handleLikePost, handleUnlikePost } =
    usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
    return (
      <main>
        <h1>Feed is Loading...</h1>
      </main>
    );
  }

  console.log("Here is Our Feed : ", feed);

  return (
    <main className="feed-page">
      <div className="feed">
        <div className="posts">
          {feed.map((post) => {
            return (
              <Post
                key={post._id}
                user={post.user}
                post={post}
                handleLike={handleLikePost}
                handleUnlike={handleUnlikePost}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;
