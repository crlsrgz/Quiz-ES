import React from "react";
import { Link } from "react-router-dom";
export default function Navigation() {
  return (
    <nav className="font-alata container mx-auto flex items-center justify-between text-zinc-200">
      <div
        className="logo"
        onDoubleClick={
          /* ::::::::: NOT Production ::::::::: */
          () => {
            localStorage.clear();
            window.location.reload(false);
          }
        }
      >
        CrlsRgz
      </div>
      <ul className="flex items-center">
        <li className="mr-6 hover:underline">
          <Link to="/" className="">
            Home
          </Link>
        </li>
        <li className="mr-6 hover:underline">
          <Link to="/text/" className="">
            Text
          </Link>
        </li>
        <li className="mr-6 hover:underline">
          <Link to="/score/" className="">
            Score
          </Link>
        </li>
        <li className="mr-6 hover:underline">
          <Link to="/info" className="">
            Info
          </Link>
        </li>
        <li className="mr-6 hover:underline">
          <Link to="/about" className="">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
