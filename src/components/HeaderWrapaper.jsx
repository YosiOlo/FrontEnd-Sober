import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function HeaderWrapaper() {
    return (
        <div className="p-2 bg-white text-black text-sm ">
            <div className="responsif-lg lg:block hidden">
            <div className="header-wrapper flex justify-between ">
                <div className="header-items-left flex items-center ml-2  ">
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

                    <div className="header-items-midle flex  ">

                        <div className=" w-full relative flex">
                            <Link to="/specialprice" className="hover:text-blue-600 mx-4 font-semibold">Harga Spesial </Link>
                            <select className="bg-transparent text-black hover:text-blue-600 mx-4 font-semibold" >
                                <option value="id">Halaman</option>

                                <option value="en">Produk</option>
                            </select>
                            <Link to="/specialprice" className="hover:text-blue-600 mx-4 font-semibold">Spesial Harga</Link>
                            <select className="bg-transparent text-black hover:text-blue-600 font-semibold">
                                <option value="id">Produk</option>

                                <option value="en">Bahasa: Inggris</option>
                            </select>
                            <Link to="/stores" className="hover:text-blue-600 mx-4 font-semibold">Toko</Link>
                            <Link to="/faqs" className="hover:text-blue-600 mx-4 font-semibold">FAQs</Link>
                            <Link to="/contact" className="hover:text-blue-600 mx-4 font-semibold">Kontak</Link>
                            <Link to="/members" className="hover:text-blue-600 mx-4 font-semibold">Member Paket</Link>

                        </div>

                    </div>

                </div>







            </div>
            </div>
            
        </div>
    );
}

export default HeaderWrapaper;
