import React from "react";

export default function Info(props) {
  return (
    <div
      className={`section-container m-12 mx-auto flex ${props.classes} w-4/5 flex-col justify-center gap-8`}
    >
      <div className="mt-8 text-left font-sans font-semibold text-blue-50">
        <h1>Hello World Again</h1>
      </div>

      <div className="mt-8 text-left font-sans font-semibold text-blue-50">
        Tempore ratione aspernatur, recusandae quis porro incidunt illum
        laboriosam repellendus excepturi sed modi esse non dolore cumque!
      </div>
    </div>
  );
}
