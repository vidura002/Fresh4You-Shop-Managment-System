import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div>
      <Header />
      <section className="min-h-svh bg-[url('images/bg1.png')] bg-center bg-cover ">
        <div className="p-6 md:p-10 lg:p-20 space-y-8"> {/* Added space-y-8 class */}
          <span className="text-4xl md:text-6xl font-semibold">About Us</span><br/><br/>
          <h1 className="text-xl md:text-3xl text-center antialiased leading-relaxed font-medium">
            <span className=" font-bold text-4xl ">Welcome to Fresh4You!</span> We're your go-to source for top-quality fruits and unbeatable
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
        </div>
      </section>
      <Footer/>
    </div>
  );
}
