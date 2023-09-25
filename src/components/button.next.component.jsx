import React from "react";
import { Icon } from "@iconify/react";

export default function ButtonNext(props) {
  return (
    <button
      className={`m-auto mt-4 flex h-12 w-48 cursor-pointer flex-row items-center justify-center  gap-2 ${props.visible}
      rounded-full border-2 p-0 text-center align-middle font-alata text-xl text-zinc-100 hover:border-zinc-300 hover:bg-zinc-300 hover:text-zinc-700 
      md:mt-2`}
      onClick={props.loadNextQuote}
    >
      <p>Siguiente</p>
      <Icon icon="majesticons:arrow-right" width={24} height={24} />
    </button>
  );
}
