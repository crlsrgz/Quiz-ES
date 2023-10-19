import React from "react";
import PageTitle from "./element.pageTitle.component";
import ButtonNext from "./button.next.component";
import { Link } from "react-router-dom";

export default function Info(props) {
  return (
    <div
      className={`section-container m-12 mx-auto flex ${props.classes} w-4/5 flex-col justify-center text-xl md:w-2/5 lg:w-2/6`}
    >
      <PageTitle pageTitle="Info, Hello again" />

      <div className="mt-8 text-left font-sans font-semibold text-blue-50">
        Tempore ratione aspernatur, recusandae quis porro incidunt illum
        laboriosam repellendus excepturi sed modi esse non dolore cumque!
      </div>
      <div className="m-auto mt-10">
        <Link to="/frase">
          <ButtonNext
            textContent={"Quiz"}
            visible={" "}
            loadNextQuote={""}
            positionClass={
              "absolute -translate-x-1/2 bottom-16 md:m-auto md:mt-16 md:relative md:translate-x-0"
            }
          />
        </Link>
      </div>
    </div>
  );
}
