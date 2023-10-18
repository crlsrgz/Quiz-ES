import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const linksArray = ["Frase", "Marcador", "Info", "Más"];

export default function Navigation() {
  const [toggled, setToggled] = useState(true);

  function toogleMenu() {
    setToggled(!toggled);
  }

  return (
    <>
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
        <ul className="hidden items-center text-base md:flex ">
          {linksArray.map((element, index) => {
            return (
              <li key={index} className=" mr-4 flex justify-center text-center">
                <NavLink
                  to={`/${element}`}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "m-auto border-b-4 border-zinc-900 px-1  hover:bg-zinc-200 hover:text-zinc-900 md:px-2"
                      : isActive
                      ? "m-auto border-b-4 px-1  md:px-2"
                      : "m-auto border-b-4 border-zinc-900 px-1   hover:bg-zinc-200 hover:text-zinc-900 md:px-2"
                  }
                >
                  <span>{element === "" ? "Home" : element}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Collapsable */}
        <button
          className=" md:hidden "
          data-collapse-toggle="mobile-menu"
          aria-controls="mobile-menu"
          onClick={toogleMenu}
        >
          HEllo
        </button>
        <ul
          className={`absolute right-1 top-12 flex-col items-end justify-end text-base transition-transform md:hidden ${
            toggled ? "hidden" : " flex"
          }`}
          id="mobile-menu"
        >
          {linksArray.map((element, index) => {
            return (
              <li key={index} className=" mr-4 flex justify-center text-center">
                <NavLink
                  to={`/${element}`}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "m-auto border-b-4 border-zinc-900 px-1 text-red-500 hover:bg-zinc-200 hover:text-zinc-900 md:px-2"
                      : isActive
                      ? "m-auto border-b-4 px-1 text-red-500 md:px-2"
                      : "m-auto border-b-4 border-zinc-900 px-1 text-red-500  hover:bg-zinc-200 hover:text-zinc-900 md:px-2"
                  }
                >
                  <span>{element === "" ? "Home" : element}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
