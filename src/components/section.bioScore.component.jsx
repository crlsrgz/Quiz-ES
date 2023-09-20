import React from "react";
import { Icon } from "@iconify/react";

export default function BioScore(props) {
  return (
    <div
      className={`section-container m-4 mx-auto flex ${props.classes} w-4/5 flex-col justify-center`}
    >
      <div className="font-besley mx-auto mt-8 text-left text-xl text-zinc-100">
        <h1 className="text-3xl">Lorem ipsum dolor</h1>
        <h2 className="mt-8 text-center text-xl font-semibold text-blue-50">
          42069
        </h2>
        <h2 className="mt-2 text-center text-xl font-semibold text-blue-50">
          Lorem ipsum
        </h2>
        <h3 className="mt-2 text-center text-xl font-semibold text-blue-50">
          Lorem, ipsum, dolor.
        </h3>
      </div>
      <div className="font-alata mx-auto mt-16 flex h-16 flex-row gap-16">
        <div className="text-center  text-blue-50">
          <div className="flex flex-col text-4xl">
            <h2 className="">one</h2>
            <h3 className="mt-6">0</h3>
            <div className="m-auto">
              <Icon icon="ic:baseline-check" width={32} height={32} />
            </div>
          </div>
        </div>
        <div className="text-center  text-blue-50">
          <div className="flex flex-col text-4xl">
            <h2 className="">two</h2>
            <h3 className="mt-6">0</h3>
            <div className="m-auto">
              <Icon icon="ic:baseline-close" width={32} height={32} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
