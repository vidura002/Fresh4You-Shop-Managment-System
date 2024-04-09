import React from "react";

function Banner() {
  return (
    <div>
      <div className="min-h-svh bg-[url('images/bg.png')] bg-center bg-cover  screens-md">
        <div className="p-32">
          <span className="text-6xl font-semibold">Welcome to Fresh4You!</span>
          <h1 className="grid grid-cols-2 text-3xl text-justify antialiased">
            <br />
            <br />
            Welcome to Fresh4You! Explore our fresh, delicious fruits sourced
            from local farms. Let's make healthy snacking easy and delightful!
            Happy browsing!
            <br /> 🍎🍌🍇
          </h1>
          <br />
          <button class="border-2	 border-orange-600 hover:bg-orange-600,text-white text-orange-600 font-bold py-3 px-12 rounded transition-colors hover:text-white hover:bg-orange-500 hover:delay-100">
            SHOP NOW
          </button>
          <a href="/OfferCatalog">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
              View Offers
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Banner;
