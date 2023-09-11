import React from "react";

export default function BioScore(props) {
  return (
    <div
      className={`section-container m-12 mx-auto flex ${props.classes} w-4/5 flex-col justify-center gap-8`}
    >
      <div className="mx-auto">
        <h1 className="mt-8 text-left font-sans font-semibold text-blue-50 ">
          Lorem ipsum dolor
        </h1>
        <h2 className="mt-8  text-center  font-serif font-semibold text-blue-50">
          42069
        </h2>
        <h2 className="mt-8  text-center  font-serif font-semibold text-blue-50">
          Lorem ipsum
        </h2>
        <h3 className="mt-8  text-center  font-serif font-semibold text-blue-50">
          Lorem, ipsum, dolor.
        </h3>
      </div>
      <div className="mx-auto flex h-16 flex-row gap-16">
        <div className="mt-8 text-center  font-semibold text-blue-50">
          <div className="flex flex-col">
            <h2>one</h2>
            <h3>0</h3>
          </div>
        </div>
        <div className="mt-8 text-center  font-semibold text-blue-50">
          <div className="flex flex-col">
            <h2>two</h2>
            <h3>0</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
