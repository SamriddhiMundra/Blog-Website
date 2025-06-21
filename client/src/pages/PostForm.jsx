import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api";

const PostForm = ({ isEdit }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: localStorage.getItem("author") || ""
  });

  useEffect(() => {
    if (isEdit && id) {
      axios.get(`/posts/${id}`).then(res => {
        const post = res.data.data.post;
        setForm({ title: post.title, content: post.content, author: post.author });
      });
    }
  }, [isEdit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.author) {
      const inputName = prompt("Enter your name:");
      if (!inputName) return;
      localStorage.setItem("author", inputName);
      form.author = inputName;
    }

    try {
      if (isEdit) {
        await axios.patch(`/posts/${id}`, form);
      } else {
        await axios.post("/posts", form);
      }
      navigate("/");
    } catch (err) {
      console.error("Error saving post", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 fade-in">
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 border dark:bg-gray-700 dark:border-gray-600 rounded"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Content"
        className="w-full p-2 border dark:bg-gray-700 dark:border-gray-600 rounded"
        rows={6}
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
      >
        {isEdit ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
};

export default PostForm;
