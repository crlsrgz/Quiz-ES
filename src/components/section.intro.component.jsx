import React from "react";
import PageTitle from "./element.pageTitle.component";

export default function Intro(props) {
  return (
    <div
      className={`section-container m-12 mx-auto flex ${props.classes} w-4/5 flex-col justify-center text-xl md:w-2/5 lg:w-2/6`}
    >
      <PageTitle pageTitle="Welcome" />
      <div className="w- mt-4 text-left font-alata  text-blue-50">
        <div className="">
          Beatae ipsam repellat explicabo enim, officia laboriosam ex?
          Reprehenderit pariatur accusantium vitae provident, illo perferendis
          ratione distinctio ea at soluta placeat molestias tempore similique.
          Illum tenetur aspernatur eligendi accusamus recusandae.
        </div>
        <div className="mt-4">
          Tempore ratione aspernatur, recusandae quis porro incidunt illum
          laboriosam repellendus excepturi sed modi esse non dolore cumque!
        </div>
      </div>
    </div>
  );
}
