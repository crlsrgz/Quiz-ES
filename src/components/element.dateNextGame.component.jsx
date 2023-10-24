import React from "react";

export default function DateNextGame() {
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 1);
  let formatNextDate = nextDate
    .toISOString()
    .slice(0, 10)
    .toLocaleString("en-US", { timeZone: "America/Mexico_City" });

  formatNextDate = `
  ${formatNextDate.slice(8, 11)}-${formatNextDate.slice(
    5,
    7,
  )}-${formatNextDate.slice(0, 4)}`;

  return (
    <div
      className=" m-auto flex  h-12 w-48 flex-col items-center justify-center gap-2  
      p-0 text-center align-middle font-alata text-xl text-zinc-100 "
    >
      <hr className="border-1 w-full border-zinc-50 drop-shadow-xl" />
      <h2 className="mt-4 text-xl">Next game</h2>
      <h3 className="text-3xl">{formatNextDate}</h3>
      <h4 className=" text-base">Hora estándar del centro</h4>
    </div>
  );
}
