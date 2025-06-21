import React from "react";
import PostForm from "../components/PostForm";

const EditPost = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Edit Post</h2>
      <PostForm isEdit={true} />
    </div>
  );
};

export default EditPost;
