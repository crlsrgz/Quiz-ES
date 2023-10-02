import React from "react";
//: DEVELOPMENT, delete at Production

export default function PageTitle(props) {
  return (
    <div className="mb-4 mt-8 text-left font-alata text-4xl text-blue-50">
      <h1>{props.pageTitle}</h1>
    </div>
  );
}
