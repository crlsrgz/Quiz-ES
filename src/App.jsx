import React from "react";
import names from "./data/names";
import Name from "./components/name.component";
import Navigation from "./components/navigation.component";

export default function App() {
  return (
    <>
      <Navigation />
      <div className="main-container m-0 h-screen p-0 ">
        <div className="container m-12 mx-auto flex w-4/5 flex-col justify-center gap-8">
          <div className="mx-auto">
            <h1 className="mt-8 text-left font-sans font-semibold text-blue-100">
              &quot; Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Blanditiis adipisci tenetur sit fugit, labore commodi hic? Modi,
              sunt beatae. Minus. &quot;
            </h1>
          </div>
          <div className="mx-auto mt-6 flex w-7/12 flex-col gap-4">
            {names.map((name, index) => {
              return <Name name={name} key={index} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
