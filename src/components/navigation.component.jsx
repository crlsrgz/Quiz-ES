import React from "react";
import { NavLink } from "react-router-dom";

const linksArray = ["", "Text", "Score", "Info", "About"];

export default function Navigation() {
  return (
    <nav className="container mx-auto flex items-center justify-between p-3 font-alata text-zinc-200">
      <div
        className="logo text-xl"
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
      <ul className="flex items-center text-base">
        {linksArray.map((element, index) => {
          return (
            <li
              key={index}
              className=" mr-6 flex w-12 justify-center text-center"
            >
              <NavLink
                to={`/${element}`}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "m-auto w-12 border-b-4 border-slate-900 hover:bg-zinc-200 hover:text-slate-900"
                    : isActive
                    ? "m-auto w-12 border-b-4"
                    : "m-auto w-12 border-b-4 border-slate-900  hover:bg-zinc-200 hover:text-slate-900"
                }
              >
                <span>{element === "" ? "Home" : element}</span>
              </NavLink>
            </li>
          );
        })}

        {/* <li className="mr-6 w-16  text-center ">
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? "" : isActive ? "border-b-4" : ""
            }
          >
            Home
          </NavLink>
        </li>
        <li className="mr-6 w-16 text-center  hover:bg-zinc-200 hover:text-slate-950 ">
          <NavLink to="/text/" className="">
            Text
          </NavLink>
        </li>
        <li className="mr-6 w-16 text-center  hover:bg-zinc-200 hover:text-slate-950">
          <NavLink to="/score/" className="">
            Score
          </NavLink>
        </li>
        <li className="mr-6 w-16 text-center  hover:bg-zinc-200 hover:text-slate-950">
          <NavLink to="/info" className="">
            Info
          </NavLink>
        </li>
        <li className="mr-6 w-16 text-center  hover:bg-zinc-200 hover:text-slate-950">
          <NavLink to="/about" className="">
            About
          </NavLink>
        </li> */}
      </ul>
    </nav>
  );
}
