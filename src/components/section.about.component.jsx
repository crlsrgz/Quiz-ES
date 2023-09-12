import React from "react";
/* ═══ Required ═══ */
import PageTitle from "./element.pageTitle.component";

export default function About(props) {
  return (
    <div
      className={`section-container m-12 mx-auto flex ${props.classes} w-4/5 flex-col justify-center gap-8`}
    >
      <PageTitle pageTitle="About" />

      <div className="mt-8 text-left font-sans font-semibold text-blue-50">
        Tempore ratione aspernatur, recusandae quis porro incidunt illum
        laboriosam repellendus excepturi sed modi esse non dolore cumque! Lorem
        ipsum, dolor sit amet consectetur adipisicing elit. Non magni nobis
        culpa quisquam alias a atque, distinctio sed reprehenderit ducimus
        necessitatibus eveniet voluptatum repellat soluta error esse fugit
        nesciunt quae?
      </div>
    </div>
  );
}
