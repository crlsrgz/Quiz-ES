import React from "react";

import Navigation from "./components/navigation.component";
import SectionText from "./components/section.text.component";

export default function App() {
  return (
    <>
      <Navigation />
      <div className="main-container m-0 h-5/6 p-0 ">
        <SectionText classes={""} />
        <div className="section-container m-12 mx-auto flex hidden w-4/5 flex-col justify-center gap-8">
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
        <div className="section-container m-12 mx-auto flex hidden w-4/5 flex-col justify-center gap-8">
          <div className="mt-8 text-left font-sans font-semibold text-blue-50">
            <h1>Hello World</h1>
          </div>
          <div className="mt-8 text-left font-sans font-semibold text-blue-50">
            Beatae ipsam repellat explicabo enim, officia laboriosam ex?
            Reprehenderit pariatur accusantium vitae provident, illo perferendis
            ratione distinctio ea at soluta placeat molestias tempore similique.
            Illum tenetur aspernatur eligendi accusamus recusandae.
          </div>
          <div className="mt-8 text-left font-sans font-semibold text-blue-50">
            Tempore ratione aspernatur, recusandae quis porro incidunt illum
            laboriosam repellendus excepturi sed modi esse non dolore cumque!
          </div>
        </div>
        <div className="section-container m-12 mx-auto flex hidden w-4/5 flex-col justify-center gap-8">
          <div className="mt-8 text-left font-sans font-semibold text-blue-50">
            <h1>Hello World Again</h1>
          </div>

          <div className="mt-8 text-left font-sans font-semibold text-blue-50">
            Tempore ratione aspernatur, recusandae quis porro incidunt illum
            laboriosam repellendus excepturi sed modi esse non dolore cumque!
          </div>
        </div>
      </div>
    </>
  );
}
