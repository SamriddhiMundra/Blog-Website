import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-800 py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold text-blue-400">Minimal Blog</h1>
        <ul className="flex gap-6 items-center">
          {["/", "/about", "/contact"].map((path) => (
            <li key={path}>
              <Link
                to={path}
                className={`hover:underline ${
                  location.pathname === path ? "font-semibold underline" : ""
                }`}
              >
                {path === "/" ? "Home" : path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
