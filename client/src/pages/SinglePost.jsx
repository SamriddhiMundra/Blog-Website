import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`/posts/${id}`)
      .then(res => setPost(res.data.data.post))
      .catch(() => setPost(null));
  }, [id]);

  if (!post) return <p>Post not found or loading...</p>;

  return (
    <div className="max-w-3xl mx-auto fade-in">
      <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
      <p className="text-lg leading-relaxed">{post.content}</p>
    </div>
  );
};

export default SinglePost;
