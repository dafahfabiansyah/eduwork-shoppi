import React from 'react';

import { Link } from 'react-router-dom';
import heroImg from '../img/DrawKit-Vector-Illustration-ecommerce-09.png';

const Hero = () => {
  return (
    <section className="h-[800px] bg-orange-50 bg-no-repeat bg-cover bg-center py-24" id="home">
      <div className="container mx-auto flex justify-around h-full">
        <div className="flex flex-col justify-center mr-3">
          <div className="font-semibold flex items-center uppercase ml-2">
            <div className="w-10 h-[2px] bg-red-500 mr-3"></div>FlashSale
          </div>
          <h1 className="text-[70px] loading-[1.1] font-light mb-4">
            Gratis Ongkir <br />
            <span className="font-semibold"> 11.11 WAR</span>
          </h1>
          <Link to={'/'} className="self-start uppercase font-semibold border-b-2 border-primary">
            Discover More
          </Link>
        </div>
        <div className="hidden mt-10 w-1/2- lg:block  ">
          <img src={heroImg} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
