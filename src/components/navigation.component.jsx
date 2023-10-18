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
          className=" w- md:hidden "
          data-collapse-toggle="mobile-menu"
          aria-controls="mobile-menu"
          onClick={toogleMenu}
        >
          menú
        </button>
        <ul
          className={`absolute top-12 m-auto w-11/12 flex-col items-center justify-end gap-4 border-t-4 border-zinc-200 bg-zinc-900 pt-4 text-base transition-transform md:hidden ${
            toggled ? "hidden" : " flex"
          }`}
          id="mobile-menu"
        >
          {linksArray.map((element, index) => {
            return (
              <>
                <li
                  key={index}
                  className=" mr-4 flex flex-col items-center justify-center text-center"
                >
                  <NavLink
                    to={`/${element}`}
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "m-auto border-b-4  border-zinc-900 px-1  hover:bg-zinc-200 hover:text-zinc-900 md:px-2"
                        : isActive
                        ? "m-auto border-b-4  px-1  md:px-2"
                        : "m-auto border-b-4  border-zinc-900 px-1   hover:bg-zinc-200 hover:text-zinc-900 md:px-2"
                    }
                  >
                    <span>{element === "" ? "Home" : element}</span>
                  </NavLink>
                </li>
                <span className="w-4/5 border-b-2 border-zinc-700"></span>
              </>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
