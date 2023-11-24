import React, { useContext, useState } from 'react';
import { FaRegMoon, FaRegSun } from 'react-icons/fa';
import { DarkMode } from '../contexts/DarkModeContext';
import Product from '../fragment/cardProduct/CardProduct';
import Hero from '../fragment/Hero';
import Header from '../fragment/Header';
import Footer from '../components/Footer';
import DrinkCategory from '../fragment/cardProduct/DrinkCategory';
import FoodCategory from '../fragment/cardProduct/FoodCategory';
import CamilanCategory from '../fragment/cardProduct/CamilanCategory';
import ClothesCategory from '../fragment/cardProduct/ClothesCategory';
import ElectronicCategory from '../fragment/cardProduct/ElectronicCategory';
import IndomieTag from '../fragment/cardProduct/IndomieTag';
import SweetTag from '../fragment/cardProduct/sweetTag';
import ChocolateTag from '../fragment/cardProduct/chocolateTag';
import StyleTag from '../fragment/cardProduct/styleTag';

const Home = () => {
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);

  const [search, setSearch] = useState('');
  const [showType, setShowType] = useState('all');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownClick = (type) => {
    setShowType(type);
    setShowDropdown(false);
  };

  return (
    <div>
      <Header />
      <Hero />
      <section className={`py-16 ${isDarkMode && 'bg-slate-900 text-white transition'}`}>
        <div className="container mx-auto">
          <div className="relative">
            <button className="absolute right-2 top-2 bg-blue-600 p-2 hover:bg-yellow-300 text-white rounded mt-20 mr-2" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <FaRegSun /> : <FaRegMoon />}
            </button>

            <input
              type="text"
              placeholder="Search..."
              className="text-black w-[60%] mb-[50px] justify-center flex mx-auto px-5 py-5 rounded rounded-[20px] border border-blue-200 hover:border-blue-500 transition duration-300"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />

            <div className="flex space-x-4 mx-auto mb-8">
              <button className={`button ${showType === 'all' ? 'active' : ''}hover:text-orange-500`} onClick={() => setShowType('all')}>
                All
              </button>
              <button className={`button ${showType === 'drink' ? 'active' : ''}hover:text-orange-500`} onClick={() => setShowType('drink')}>
                Drink
              </button>
              <button className={`button ${showType === 'food' ? 'active' : ''}hover:text-orange-500`} onClick={() => setShowType('food')}>
                Food
              </button>
              <button className={`button ${showType === 'camilan' ? 'active' : ''}hover:text-orange-500`} onClick={() => setShowType('camilan')}>
                Snack
              </button>
              <button className={`button ${showType === 'clothes' ? 'active' : ''}hover:text-orange-500`} onClick={() => setShowType('clothes')}>
                Clothes
              </button>
              <button className={`button ${showType === 'electronic' ? 'active' : ''}hover:text-orange-500`} onClick={() => setShowType('electronic')}>
                Electronic
              </button>
              <button className={`button ${showDropdown ? 'active' : ''}hover:text-orange-500`} onClick={() => setShowDropdown(!showDropdown)}>
                Tag
              </button>
            </div>

            {showDropdown && (
              <div className={`absolute mt-2 mr-16 w-40 rounded-2xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                <div className={`${isDarkMode && 'bg-slate-700 text-white transition rounded-2xl'}`}>
                  <button className={`button ${showType === 'indomie' ? 'active' : ''}hover:text-green-500 flex items-center justify-center w-full`} onClick={() => setShowType('indomie')}>
                    Indomie
                  </button>
                  <button className={`button ${showType === 'chocolate' ? 'active' : ''}hover:text-orange-950 flex items-center justify-center w-full`} onClick={() => setShowType('chocolate')}>
                    Chocolate
                  </button>
                  <button className={`button ${showType === 'sweet' ? 'active' : ''}hover:text-pink-400  flex items-center justify-center w-full`} onClick={() => setShowType('sweet')}>
                    Sweet
                  </button>
                  <button className={`button ${showType === 'style' ? 'active' : ''} hover:text-sky-900 flex items-center justify-center w-full`} onClick={() => setShowType('style')}>
                    Style
                  </button>
                </div>
              </div>
            )}

            {(showType === 'all' && <Product search={search} className="mb-2" />) ||
              (showType === 'drink' && <DrinkCategory search={search} />) ||
              (showType === 'food' && <FoodCategory search={search} />) ||
              (showType === 'camilan' && <CamilanCategory search={search} />) ||
              (showType === 'clothes' && <ClothesCategory search={search} />) ||
              (showType === 'electronic' && <ElectronicCategory search={search} />) ||
              (showType === 'indomie' && <IndomieTag search={search} />) ||
              (showType === 'chocolate' && <ChocolateTag search={search} />) ||
              (showType === 'style' && <StyleTag search={search} />) ||
              (showType === 'sweet' && <SweetTag search={search} />)}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
