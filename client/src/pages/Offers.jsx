import React from "react";
import offers from "../offerdata";

export default function Offers() {
  return (
    <>
      <h1 className="hidden sm:inline text-red-700 hover:underline text-3xl self-auto">
        Offers
      </h1>

      <div>
        <h1>{offers.length}</h1>
      </div>

    </>
  );
}
