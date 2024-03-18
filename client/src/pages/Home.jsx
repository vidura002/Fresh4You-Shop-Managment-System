import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h1 className="hidden sm:inline text-red-700 hover:underline text-3xl self-auto">
        Home
      </h1>

      <Link to="Offers">Offers</Link>

      
    </>
  );
}
