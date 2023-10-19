import React from "react";
import { Icon } from "@iconify/react";

export default function ButtonNext(props) {
  return (
    <button
      className={`flex  h-12 w-48 cursor-pointer flex-row items-center justify-center gap-2    ${props.visible} ${props.positionClass}
      rounded-full border-2 p-0 text-center align-middle font-alata text-xl text-zinc-100 hover:border-zinc-300 hover:bg-zinc-300 hover:text-zinc-700 
      `}
      onClick={props.loadNextQuote}
    >
      <p>{props.textContent}</p>
      <Icon icon="majesticons:arrow-right" width={24} height={24} />
    </button>
  );
}
