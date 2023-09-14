import React from 'react';
import Hero from '../../../public/hero_product.png';

const HeroProduct = () => {
  return (
    <div className="hero-content flex justify-center items-center">
      <div className="hero w-full max-w-screen-lg mx-auto">
        <img src={Hero} alt="Sobermart Hero" className="w-full h-auto object-cover rounded-lg" />
      </div>
    </div>
  );
};

export default HeroProduct;
