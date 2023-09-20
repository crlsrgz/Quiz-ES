import React from "react";
import { Icon } from "@iconify/react";

export default function ButtonNext() {
  return (
    <button
      className={`font-alata m-auto mt-12 flex h-12 w-48 cursor-pointer flex-row items-center  justify-center
      gap-2 rounded-full border-2 p-0 text-center align-middle text-xl text-blue-50 transition duration-200  hover:border-zinc-700  hover:bg-zinc-300 hover:text-zinc-700 md:mt-2
      
        `}
    >
      <p>Siguiente</p>
      <Icon icon="majesticons:arrow-right" width={24} height={24} />
    </button>
  );
}
