import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import { VscSignOut } from "react-icons/vsc";
import { MdOutlineArrowDropDown } from "react-icons/md";

const TopBar = ({ title }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const toggleLanguage = () => {
    setLanguageOpen(!languageOpen);
  };

  return (
    <div className="">
        <div className="flex md:hidden justify-around">
            <img src="https://res.cloudinary.com/dap6ohre8/image/upload/v1692042539/roady/sob-logos-1_i6ship.png" className="w-[20%] h-[20%] ml-12" alt="" />
            <button><VscSignOut className="hover:text-yellow-400" size={25} /></button>
        </div>
    <div className="sm:flex items-center justify-between p-3 hidden sm:block flex text-base-300">
      <h1 className="text-xl font-bold text-black">{title}</h1>
      <div className="flex items-center space-x-4 text-black">
        <div className="relative">
          <button className="flex  px-4 py-2 hover:text-yellow-400" onClick={toggleCart}  >
            <FaShoppingCart /> <MdOutlineArrowDropDown />
          </button>
          {cartOpen && (
            <div className="absolute w-[300px] p-2 right-0 mt-2 border border-gray-300 rounded-lg shadow">
              {/* Isi dropdown cart di sini */}
              Cart items will go here.
            </div>
          )}
        </div>
        <div className="changeLang text-[14px]">
          <div className="drop-down-header">
            <select className=" p-2 text-black bg-[#F1F1F1] border-none">
              <option value="id hover:text-yellow-400">Bahasa: Indonesia</option>

              <option value="en hover:text-yellow-400">Bahasa: Inggris</option>
            </select>
          </div>
        </div>
        <button className=" flex justify-between text-[14px] font-semibold px-4 py-2 rounded-lg hover:text-yellow-400">
          View Your Store <RxExit className="mt-1 ml-2"/>
        </button>
      </div>
    </div>
    </div>
  );
};

export default TopBar;
