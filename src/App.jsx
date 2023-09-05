import React from "react";
import names from "./data/names";
import Name from "./components/name.component";

export default function App() {
  return (
    <>
      <div className="main-container m-0 h-screen p-0 ">
        <div className="container m-12 mx-auto flex w-4/5 flex-col justify-center gap-8">
          <h1 className="title text-center font-semibold">CrlsRgz</h1>
          <div className="mx-auto">
            <h2 className="mt-8 text-center font-serif font-semibold">
              &quot; Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Blanditiis adipisci tenetur sit fugit, labore commodi hic? Modi,
              sunt beatae. Minus. &quot;
            </h2>
          </div>
          <div className="mx-auto mt-8 flex flex-col gap-4">
            {names.map((name, index) => {
              return <Name name={name} key={index} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
