import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/posts")
      .then(res => setPosts(res.data.data.posts))
      .catch(err => console.error("Failed to fetch posts:", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/posts/${id}`);
      setPosts(posts.filter(post => post._id !== id));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-extrabold text-blue-700 dark:text-blue-400">
          Blog Posts
        </h2>
        <Link
          to="/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow-md transition-all"
        >
          Create New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-lg text-gray-600 dark:text-gray-300">
          No posts available.
        </p>
      ) : (
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 justify-items-center">
          {posts.map(post => (
            <div
              key={post._id}
              className="w-full max-w-2xl p-8 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl fade-in transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
            >
              <h3 className="text-3xl font-semibold mb-4 text-blue-800 dark:text-blue-300">
                <Link to={`/post/${post._id}`} className="hover:underline">
                  {post.title}
                </Link>
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-4 mb-6">
                {post.content}
              </p>

              {post.author === localStorage.getItem("author") && (
                <div className="flex gap-4 mt-4">
                  <Link
                    to={`/edit/${post._id}`}
                    className="text-sm px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-sm px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
