import React from "react";
export default function Navigation() {
  return (
    <nav className="container mx-auto flex items-center justify-between">
      <div className="logo text-blue-200 hover:text-blue-100">CrlsRgz</div>
      <ul className="flex items-center">
        <li className="mr-6">
          <a href="/" className="text-blue-200 hover:text-blue-100">
            Home
          </a>
        </li>
        <li className="mr-6">
          <a href="/" className="text-blue-200 hover:text-blue-100">
            About
          </a>
        </li>
      </ul>
    </nav>
  );
}
