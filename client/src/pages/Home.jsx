<<<<<<< HEAD
import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
=======
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import fruit01 from "../images/watermelon.jpg";
import fruit02 from "../images/Apple.png";
import fruit03 from "../images/Avocado.png";
import fruit04 from "../images/Guava.png";
import fruit05 from "../images/Orange.png";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  const [refBanner, inViewBanner] = useInView();
  const [refAbout, inViewAbout] = useInView();
  const [refBenifit, inViewBenifit] = useInView();
  const [refItemCard, inViewItemCard] = useInView();
>>>>>>> main

  return (
    <div>
      <Header />
<<<<<<< HEAD
      <Banner />
    </div>
  );
}

=======
      <section ref={refBanner}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: inViewBanner ? 1 : 0, y: inViewBanner ? 0 : -50 }}
          transition={{ duration: 0.5 }}
          className={`min-h-svh bg-[url('images/bg.png')] bg-center bg-cover`}
        >
          <div className="grid grid-cols-2 pt-48 pl-40 pr-8">
          <div className="">
            <span className="text-4xl md:text-6xl font-semibold text-orange-800">Welcome to Fresh4You!</span><br/><br/>
            <h1 className="text-xl md:text-3xl  md:text-justify antialiased">Explore our fresh, delicious fruits sourced from local farms. Let's make healthy
              snacking easy and delightful! Happy browsing!
              <br/><br/><span className="text-5xl">🍎🍌🍇</span>
            </h1>
            <br />
            <button className="border-2 border-orange-600 hover:bg-orange-600 text-orange-600	 text-orange-600 font-bold py-3 px-12 rounded transition-colors hover:text-white hover:bg-orange-500 hover:delay-100">
              SHOP NOW
            </button>
          </div>
          <div></div>
          </div>
        </motion.div>
      </section>
      <section id="about" ref={refAbout}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: inViewAbout ? 1 : 0, y: inViewAbout ? 0 : -50 }}
          transition={{ duration: 0.5 }}
          className={`min-h-svh bg-[url('images/aboutBackground.jpg')] bg-center bg-cover flex justify-center items-center`}
        >
          <div className="p-6 md:p-10 lg:p-20 ">
            <span className="text-4xl md:text-6xl font-semibold">About Us</span><br/><br/>
            <h1 className="text-xl md:text-3xl text-center  antialiased  leading-relaxed">
              <span className="text-orange-700">Welcome to Fresh4You!</span> We're your go-to source for top-quality fruits and unbeatable
              freshness. Founded by Asidu, we're passionate about providing you with the best fruits
              for every occasion. With fair prices and a commitment to social responsibility,
              Fresh4You is your trusted partner for vibrant living. Explore our website and
              experience the taste of freshness today!
              <br />
              <br />
              <hr className="h- border-t border-gray-400" />
              <br />
              <span className="text-5xl">🍎🍌🍇</span>
            </h1>
            <br />
          </div>
        </motion.div>
      </section>
      <section ref={refBenifit}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: inViewBenifit ? 1 : 0, y: inViewBenifit ? 0 : -50 }}
          transition={{ duration: 2 }}
          className={`min-h-svh bg-[url('images/juice_image.jpg')] bg-center bg-cover  justify-center items-center`}
        >
          <div className="p-6 md:p-10 lg:p-20">
            <span className="text-4xl md:text-6xl font-bold text-white">Our Benifits</span>
            <div className="flex flex-col md:flex-row mt-8 gap-8">
              <div className="box bg-orange-600 shadow-orange-500/50 px-8 py-12 md:py-20 lg:py-32 rounded-3xl flex flex-col justify-center items-center transition duration-300 ease-in transform hover:scale-105 origin-center ">
                <h2 className="text-2xl md:text-3xl font-bold text-center">Fresh Fruit</h2>
                <p className="text-center text-lg md:text-xl">
                  Indulge in freshness. Hand-picked and delivered for you to enjoy. Taste the
                  difference today.
                </p>
              </div>
              <div className="box bg-yellow-400 shadow-yellow-500/150 px-8 py-12 md:py-20 lg:py-32 rounded-3xl flex flex-col justify-center items-center transition duration-300 ease-in transform hover:scale-95">
                <h2 className="text-2xl md:text-3xl font-bold text-center">Fast Delivery</h2>
                <p className="text-center text-lg md:text-xl">
                  Experience lightning-fast delivery with us. Get what you need, when you need it.
                  Your satisfaction, our priority.
                </p>
              </div>
              <div className="box bg-lime-600 shadow-white-500/50 px-8 py-12 md:py-20 lg:py-32 rounded-3xl flex flex-col justify-center items-center transition duration-500 ease-in transform hover:scale-105 origin-center ">
                <h2 className="text-2xl md:text-3xl font-bold text-center">Fruit Offer</h2>
                <p className="text-center text-lg md:text-xl">
                  Discover fresh delights with our fruit offer. Premium picks at unbeatable prices.
                  Don't miss out!
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      <section ref={refItemCard}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: inViewItemCard ? 1 : 0, y: inViewItemCard ? 0 : -50 }}
          transition={{ duration: 2 }}
          className={`min-h-svh bg-cover place-content-center screens-md`}
        >
          <ul className="grid gap-5 md:grid-cols-3 lg:grid-cols-5 ml-4 md:ml-10 mr-4 md:mr-10 p-4 md:p-10">
            <li className="border border-gray-200 rounded-md overflow-hidden animate-fade-in shadow-xl transition duration-300 ease-in transform hover:scale-105">
              <div className="flex items-center justify-center">
                <img src={fruit01} alt={"Watermelon"} />
              </div>
            </li>
            <li className="border border-gray-200 rounded-md overflow-hidden animate-fade-in shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
              <div className="flex items-center justify-center">
                <img src={fruit02} alt={"Apple"} />
              </div>
            </li>
            <li className="border border-gray-200 rounded-md overflow-hidden animate-fade-in shadow-xl transition duration-300 ease-in transform hover:scale-105">
              <div className="flex items-center justify-center">
                <img src={fruit03} alt={"Avocado"} />
              </div>
            </li>
            <li className="border border-gray-200 rounded-md overflow-hidden animate-fade-in shadow-xl transition duration-300 ease-in transform hover:scale-105">
              <div className="flex items-center justify-center">
                <img src={fruit04} alt={"Guava"} />
              </div>
            </li>
            <li className="border border-gray-200 rounded-md overflow-hidden animate-fade-in shadow-xl transition duration-300  transform hover:scale-105">
              <div className="flex items-center justify-center">
                <img src={fruit05} alt={"Orange"} />
              </div>
            </li>
          </ul>
        </motion.div>
      </section>
      <section ref={refItemCard}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: inViewItemCard ? 1 : 0, y: inViewItemCard ? 0 : -50 }}
          transition={{ duration: 0.5 }}
          className={`min-h-svh bg-[url('images/bg1.png')] bg-center bg-cover  justify-center items-center`}
        >
        </motion.div>
        </section>
      <Footer />
    </div>
  );
};

export default Home;
>>>>>>> main
