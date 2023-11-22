import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';


const CardProduct = ({ product, isProductFavorite, toggleFavorite, viewType, index }) => {
    const productName = product.name;
    const formattedName = productName.toLowerCase().replace(/ /g, '-');
    return (
        <div className={`card-product transition duration-300 ease-in-out p-4 
        ${viewType === 'list' && 'flex gap-4'}`}>
            <div className="overflow-hidden relative group-hover:opacity-70 transition-opacity">
                {/* Gambar produk */}
                <Link to={`/product/${formattedName}`} key={index}>
                    <img
                        src={
                            product.images[0] !== ''
                                ? "https://kuro.asrofur.me/sober/" + product.images[0]
                                : '/logo-sober-mart-color-grey-1.png'
                        }
                        alt={product.name}
                        className={`w-full ${viewType === 'grid' ? 'h-full object-cover' : 'h-32 object-contain '} ${product.stock_status === 'out_of_stock' ? 'grayscale' : ''}`}
                    />

                </Link>

                {/* Diskon jika ada */}
                {product.fee && (
                    <div className="discount absolute top-1 left-1 bg-red-500 text-white rounded">
                        <p className="px-1 text-sm">{product.discount}</p>
                    </div>
                )}
                {product.stock_status === 'out_of_stock' && (
                    <p className={`absolute top-1/2 -translate-y-1/2 ml-6 ${viewType === 'grid' ? 'bg-red-500 text-white px-2 py-1 rounded' : 'text-red-500'}`}>
                        Barang Stok Habis
                    </p>
                )}
                {/* Tombol ikon favorit */}
                <div
                    className={`favorite absolute top-2 right-2 cursor-pointer`}
                    onClick={() => toggleFavorite(product)}
                >
                    {isProductFavorite(product.id) ? (
                        <AiFillHeart className="text-2xl text-red-500" />
                    ) : (
                        <AiOutlineHeart className="text-2xl text-red-500" />
                    )}
                </div>
            </div>
            <div className={`${viewType === 'grid' && 'mt-4'}`}>
                <h2 className={`${viewType === 'list' ? 'text-xl' : 'text-lg'} font-semibold text-gray-800`}>
                    {product.store ? product.store.name : ''}
                </h2>
                
                <Link to={`/product/${formattedName}`} key={index} className="hover:text-blue-500">
                    <h3 className={`${viewType === 'list' ? 'text-lg' : 'text-md'}`}>
                        {product.name}
                    </h3>
                </Link>
                {/* <RatingProduct star={product.reviews.star} /> */}
                {product.hpp}


                <div className="sale_price flex justify-between">
                    <p className="text-base font-semibold text-red-500">Rp{product.sale_price}</p>
                    <p className="text-base font-bold text-gray-400 line-through">Rp{product.price}</p>
                </div>
                <div className="city flex justify-start">
                    <FiMapPin size={20} />
                    <h4 className="text-xs font-semibold mt-2 text-gray-600 ml-2">{product.store ? product.store.city : 'Null'}</h4>
                </div>
                <div className="sale_product flex justify-between">
                    <p className="text-xs text-gray-600 mt-2">Terjual</p>
                    <p className="text-xs text-gray-600 mt-2">{product.terjual}</p>
                </div>
            </div>
        </div>
    );
};

export default CardProduct;


