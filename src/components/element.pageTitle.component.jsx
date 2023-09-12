import React from "react";

export default function PageTitle(props) {
  return (
    <div className="mt-8 text-left font-sans font-semibold text-blue-50">
      <h1>{props.pageTitle}</h1>
    </div>
  );
}
