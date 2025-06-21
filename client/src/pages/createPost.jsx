import React from "react";
import PostForm from "../components/PostForm";

const CreatePost = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Create New Post</h2>
      <PostForm isEdit={false} />
    </div>
  );
};

export default CreatePost;
