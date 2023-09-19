import React from "react";
import { Link } from "react-router-dom";
export default function Navigation() {
  return (
    <nav className="container mx-auto flex items-center justify-between">
      <div
        className="logo text-blue-200 hover:text-blue-100"
        onDoubleClick={
          /* ::::::::: NOT Production ::::::::: */
          () => localStorage.clear()
        }
      >
        CrlsRgz
      </div>
      <ul className="flex items-center">
        <li className="mr-6">
          <Link to="/" className="text-blue-200 hover:text-blue-100">
            Home
          </Link>
        </li>
        <li className="mr-6">
          <Link to="/text/" className="text-blue-200 hover:text-blue-100">
            Text
          </Link>
        </li>
        <li className="mr-6">
          <Link to="/score/" className="text-blue-200 hover:text-blue-100">
            Score
          </Link>
        </li>
        <li className="mr-6">
          <Link to="/info" className="text-blue-200 hover:text-blue-100">
            Info
          </Link>
        </li>
        <li className="mr-6">
          <Link to="/about" className="text-blue-200 hover:text-blue-100">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
