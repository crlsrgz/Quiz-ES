import React from "react";
export default function Navigation() {
  return (
    <nav className="container mx-auto flex items-center justify-between">
      <div className="logo">CrlsRgz</div>
      <ul className="flex items-center">
        <li className="mr-6">
          <a href="/" className="text-gray-700 hover:text-gray-900">
            Home
          </a>
        </li>
        <li className="mr-6">
          <a href="/" className="text-gray-700 hover:text-gray-900">
            About
          </a>
        </li>
      </ul>
    </nav>
  );
}
