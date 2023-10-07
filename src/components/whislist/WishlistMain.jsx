import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { FaShoppingCart, FaTrash } from 'react-icons/fa'; // Mengimpor ikon yang Anda butuhkan

const WishlistMain = () => {
    const { wishlist } = useWishlist();

    return (
        <div className="whislist-main mx-20 border rounded-t-lg rounded-b-lg mb-2">
            <div className="whislist-main-header flex bg-blue-100 p-5 rounded-t-lg">
                <div className="product w-1/2">
                    <p className="font-semibold">Produk</p>
                </div>
                <div className="price w-1/2 hidden md:block">
                    <p className="font-semibold">Harga</p>
                </div>

            </div>

            <div className="whislist-main-content ">
                {wishlist.map((item, index) => {
                    console.log("wishlist", item);
                    return (
                        <div key={item.product.id} className={`md:flex md:flex-row flex-col text-sm flex md:items-center mb-4 ${index !== wishlist.length - 1 ? 'border-b border-gray-300 pb-4' : ''}`}>

                            <div className="whislist-left-content-image m-2 sm:m-2 md:ml-2 md:w-2/4 lg:w-1/2 lg:ml-2 mt-4 lg:flex lg:flex-row flex-col lg:items-center">
                                <div className="image-wishlist">
                                    <img
                                        src={
                                            item.product.images[0] !== ''
                                                ? "https://kuro.asrofur.me/sober/" + item.product.images[0]
                                                : '/logo-sober-mart-color-grey-1.png'
                                        }
                                        alt={item.product.name.length > 2 ? item.product.name.slice(0, 40) + "..." : item.product.name}
                                        className="md:w-32 object-contain rounded-md"
                                        style={{ imageRendering: 'pixelated' }}
                                    />
                                </div>
                                <div className="sm:ml-0">
                                    <div className="whislist-main-content-detail-title text-lg font-semibold">
                                        <div className="ml-2 product-name">
                                            {item.product.name}
                                        </div>
                                    </div>
                                    <div className="whislist-main-content-detail-title text-lg font-semibold hidden md:flex lg:flex">
                                        <p className='text-base font-bold ml-2 '>Jumlah :</p>
                                        <div className="ml-2 product-name">
                                            {item.product.quantity}
                                        </div>
                                    </div>
                                    {/* Menampilkan harga di bawah gambar pada tampilan mobile */}
                                    <div className="whislist-main-content-detail-price flex text-lg font-semibold mt-2 md:hidden justify-between ml-2">
                                        <p className='text-base font-bold '>Jumlah :</p>
                                        <p className='text-red-500'>
                                            {`${item.product.quantity}`}
                                        </p>
                                    </div>
                                    <div className="whislist-main-content-detail-price flex text-lg font-semibold mt-2 md:hidden justify-between ml-2">
                                        <div className="price"><p className='text-base font-bold '>Harga :</p></div>
                                        <div className="sale-price flex justify-between">
                                            <div className="price-item ">
                                                <p className='text-red-500'>
                                                    {`Rp.${item.product.sale_price}`}
                                                </p>
                                            </div>
                                            <div className="price-discount ml-1">
                                                <p className="text-base font-bold text-gray-400 line-through">{`Rp.${item.product.price}`}</p>
                                            </div>


                                        </div>


                                    </div>

                                </div>
                            </div>

                            <div className="whislist-main-content-detail w-1/2 md:w-1/4 md:ml-1 hidden sm:block">
                                {/* Menampilkan harga hanya pada tampilan desktop */}
                                {/* <div className="whislist-main-content-detail-price text-red-500 text-lg font-semibold mt-4 md:mt-0 hidden md:block ">
                                    <div className="product-price justify-between">
                                        <p className="text-base font-bold text-gray-400 line-through">{`Rp.${item.product.price}`}</p>
                                        <p>{`Rp. ${item.product.sale_price}`}</p>

                                    </div>
                                </div> */}
                                <div className="sale-price  hidden md:block lg:flex">
                                    <div className="price-item ">
                                        <p className='text-red-500'>
                                            {`Rp.${item.product.sale_price}`}
                                        </p>
                                    </div>
                                    <div className="price-discount ">
                                        <p className="font-bold text-gray-400 line-through ml-1">{`Rp.${item.product.price}`}</p>
                                    </div>


                                </div>
                            </div>

                            <div className="whislist-right-content-detail w-full  md:w-1/4 ml-1">
                                <div className="whislist-main-content-detail-button mt-2 flex mr-4">
                                    <button className="btn btn-primary w-2/3" onClick={() => handleAddToCart(item)}>
                                        <FaShoppingCart /> {/* Hanya menampilkan ikon keranjang */}
                                    </button>
                                    <button className="btn btn-danger mx-2 w-1/3" onClick={() => handleRemoveFromWishlist(item)}>
                                        <FaTrash /> {/* Hanya menampilkan ikon sampah */}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WishlistMain;
