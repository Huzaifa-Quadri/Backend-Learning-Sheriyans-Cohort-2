import React, { useRef, useState } from "react";
import "../style/createpost.scss";
import { usePost } from "../hook/usePost";
import { useNavigate } from "react-router";
const CreatePost = () => {
  const [caption, setCaption] = useState("");
  //? we handle image two way binding like this(with useRef) not with setstate mentioned below
  const postImageInputFieldRef = useRef(null);
  // const [image, setImage] = useState(null); //! we don't use this

  const { loading, handleCreatePost } = usePost();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //* Getting the image from the input field (from ref), using .files[0] we get the first file, now it will return only one in files but can get multiple by adding "multiple" in input tag
    const image = postImageInputFieldRef.current.files[0];
    console.log(image);
    await handleCreatePost(image, caption);
    navigate("/");
  };

  return (
    <main className="create-post-page">
      <div className="form-container">
        <h1>Create Post</h1>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="postImage">
            <h3>Upload Image</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.7134 8.12811L20.4668 8.69379C20.2864 9.10792 19.7136 9.10792 19.5331 8.69379L19.2866 8.12811C18.8471 7.11947 18.0555 6.31641 17.0677 5.87708L16.308 5.53922C15.8973 5.35653 15.8973 4.75881 16.308 4.57612L17.0252 4.25714C18.0384 3.80651 18.8442 2.97373 19.2761 1.93083L19.5293 1.31953C19.7058 0.893489 20.2942 0.893489 20.4706 1.31953L20.7238 1.93083C21.1558 2.97373 21.9616 3.80651 22.9748 4.25714L23.6919 4.57612C24.1027 4.75881 24.1027 5.35653 23.6919 5.53922L22.9323 5.87708C21.9445 6.31641 21.1529 7.11947 20.7134 8.12811ZM2.9918 3H14V5H4V19L14 9L20 15V11H22V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3ZM20 17.8284L14 11.8284L6.82843 19H20V17.8284ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"></path>
            </svg>
          </label>
          <input
            ref={postImageInputFieldRef}
            hidden
            type="file"
            name="postImage"
            id="postImage"
          />
          <input
            type="text"
            name="caption"
            id="caption"
            placeholder="Enter Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <button type="submit" className="button primary-btn">
            Create Post
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;
