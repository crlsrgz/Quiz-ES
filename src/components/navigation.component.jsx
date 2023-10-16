import React from "react";
import { NavLink } from "react-router-dom";

const linksArray = ["Frase", "Marcador", "Info", "Más"];

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
        {" "}
        <NavLink to="/">CrlsRgz</NavLink>
      </div>
      <ul className="flex items-center text-base">
        {linksArray.map((element, index) => {
          return (
            <li key={index} className=" mr-4 flex justify-center text-center">
              <NavLink
                to={`/${element}`}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "m-auto border-b-4 border-zinc-900 px-1 hover:bg-zinc-200 hover:text-zinc-900 md:px-2"
                    : isActive
                    ? "m-auto border-b-4 px-1 md:px-2"
                    : "m-auto border-b-4 border-zinc-900 px-1 hover:bg-zinc-200  hover:text-zinc-900 md:px-2"
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
