import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function HeaderWrapaper() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <div className="p-2 bg-white text-black text-base">
            <div className="responsif-lg lg:block hidden">
                <div className="header-wrapper flex justify-between">
                    <div className="header-items-left flex items-center ml-2">
                        <div className="category w-48 h-10 mr-10 bg-blue-800 flex rounded-md">
                            <div className="burger w-1/4 bg-transparent rounded-sm flex items-center justify-center">
                                <button className="hover:text-blue-600">
                                    <FiMenu className="w-6 h-6 text-white hover:text-blue-600" />
                                </button>
                            </div>
                            <div className="allcategory w-3/4 rounded-sm flex items-center">
                                <span className="text-white text-center">KATEGORI BELANJA</span>
                            </div>
                        </div>

                        <div className="header-items-middle flex">
                            <Link to="/specialprice" className="hover:text-blue-600 mx-4 font-semibold text-base lg:text-base xl:text-xl">Spesial Harga</Link>
                            <div className="inline-flex mx-4" onMouseLeave={closeDropdown}>
                                <a
                                    href="product"
                                    className="font-semibold hover:text-blue-500 hover:bg-gray-50 rounded-l-md text-base lg:text-base xl:text-xl"
                                >
                                    Product
                                </a>

                                <div className="relative" onMouseEnter={toggleDropdown}>
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center h-full px-2 text-gray-600 border-l border-gray-100 hover:text-blue-600 rounded-r-md hover:bg-gray-50"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>

                                    {isOpen && (
                                        <div className="absolute right-0 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg">
                                            <div className="p-2">
                                                <a
                                                    href="#"
                                                    className="font-semibold block px-4 py-2 hover:text-blue-500 hover:bg-gray-50 text-base lg:text-base xl:text-xl"
                                                >
                                                    Semua Product
                                                </a>
                                                <a
                                                    href="#"
                                                    className="font-semibold block px-4 py-2 hover:text-blue-500 hover:bg-gray-50 text-base lg:text-base xl:text-xl"
                                                >
                                                    Portofolio Product
                                                </a>
                                                <a
                                                    href="#"
                                                    className="font-semibold block px-4 py-2 hover:text-blue-500 hover:bg-gray-50 text-base lg:text-base xl:text-xl"
                                                >
                                                    Rincian Product
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <Link to="/stores" className="hover:text-blue-600 mx-4 font-semibold text-base lg:text-base xl:text-xl">Toko</Link>
                            <Link to="/faqs" className="hover:text-blue-600 mx-4 font-semibold text-base lg:text-base xl:text-xl">FAQs</Link>
                            <Link to="/contact" className="hover:text-blue-600 mx-4 font-semibold text-base lg:text-base xl:text-xl">Kontak</Link>
                            <Link to="/members" className="hover:text-blue-600 mx-4 font-semibold text-base lg:text-base xl:text-xl">Member Paket</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderWrapaper;
