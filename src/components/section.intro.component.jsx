import React from "react";
import PageTitle from "./element.pageTitle.component";
export default function Intro(props) {
  return (
    <div
      className={`section-container m-12 mx-auto flex ${props.classes} w-4/5 flex-col justify-center gap-8`}
    >
      <PageTitle pageTitle="Welcome" />
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
  );
}
