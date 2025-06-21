import React from "react";

const About = () => {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">About This Blog</h2>
      <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        This blog is a minimal and beautiful web application built using the MERN stack.
        You can browse blog posts created by users, and each user has full control to update or delete their own posts.
        The UI is fully responsive and supports dark mode for a better reading experience.
      </p>
    </div>
  );
};

export default About;
