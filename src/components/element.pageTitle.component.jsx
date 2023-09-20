import React from "react";
//: DEVELOPMENT, delete at Production

export default function PageTitle(props) {
  return (
    <div className="font-alata mb-4 mt-8 text-left text-2xl text-blue-50">
      <h1>{props.pageTitle}</h1>
    </div>
  );
}
