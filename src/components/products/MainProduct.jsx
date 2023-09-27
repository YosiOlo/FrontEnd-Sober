import React, { useEffect, useState } from 'react';
import { AiOutlineAppstore, AiOutlineUnorderedList, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FiMapPin } from 'react-icons/fi';
import { product_data, BASE_URL } from '../../utils/ApiConfig';
import SobermartLogo from '../../../public/logo-sober-mart-color-grey-1.png';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import 'animate.css';
import axios from 'axios';
import { authToken } from '../../utils/ApiConfig';

const MainProduct = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [isHovered, setIsHovered] = useState(false);
    const [favoriteProducts, setFavoriteProducts] = useState([]);

    const token = `Bearer ${authToken}`;

    // Header dengan token bearer
    const headers = {
        'Authorization': token,
        'Content-Type': 'application/json',
    };

    useEffect(() => {
        axios.get('https://kuro.asrofur.me/sober/api/users/wishlist/', { headers })
            .then((response) => setFavoriteProducts(response.data.data))
            .catch(err => console.log('Error fetching wishlist'));

        const fetchData = async () => {
            const data = await product_data();
            setProducts(data.rows);
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        };
        fetchData();

    }, []);


    const toggleFavorite = (product) => {
        if (favoriteProducts.some(item => item.product_id === product.id)) {
            //delete
            axios.delete(`https://kuro.asrofur.me/sober/api/users/wishlist/${product.id}`, { headers })
                .then((response) => {
                    // Tangani respons dari API jika berhasil
                    console.log('Menghapus favorit', response.data);
                })
                .catch((error) => {
                    // Tangani kesalahan jika permintaan gagal
                    console.error('Gagal :', error.response.data.message);
                });
        } else {
            axios.post(`https://kuro.asrofur.me/sober/api/users/wishlist/${product.id}`, {}, {headers})
                .then((response) => {
                    console.log('Tambahkan favorit', response.data);
                })
                .catch((error) => {
                    console.error('Gagal :', error.response.data.message);
                });
        }
    };

    const isProductFavorite = (productId) => {
        if (favoriteProducts.length !== 0) return favoriteProducts.some(item => item.product_id === productId);
    };

    const sendFavoriteDataToApi = (idProduct) => {
        // Kirim data ID produk favorit ke API dengan header yang sesuai
        console.log(headers)
        axios.post(`https://kuro.asrofur.me/sober/api/users/wishlist/${idProduct}`, { headers })
            .then((response) => {
                // Tangani respons dari API jika berhasil
                console.log('Favorit berhasil', response.data);
            })
            .catch((error) => {
                // Tangani kesalahan jika permintaan gagal
                console.error('Gagal mengirim data favorit ke API', error);
            });
    };

    return (
        <div className="main-product flex flex-col">
            <div className="top bg-slate-400 flex h-1/4">
                <div className="top-left  h-full w-1/2">Title</div>
                <div className="top-right flex bg-slate-500 h-full w-1/2">
                    <div className="top-right-top w-1/2 flex justify-end">
                        <p>Sort By</p>
                        <div className="sort-by">
                            <div className="dropdown">
                                <label tabIndex={0} className="btn m-1">
                                    Click
                                </label>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a>Item 1</a></li>
                                    <li><a>Item 2</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="top-right-bottom w-1/2 flex justify-end">
                        <p>View</p>
                        <div className="view flex mr-10">
                            <div className="grid ml-6">
                                <AiOutlineAppstore size={40} /> {/* Ikon grid */}
                            </div>
                            <div className="list ml-4">
                                <AiOutlineUnorderedList size={40} /> {/* Ikon list */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom bg-black h-3/4">
                <div className="bg-white">
                    <div className="flex">
                        <div className="left-content w-1/4 bg-gray-200 p-4">
                            <h2 className="text-lg font-semibold mb-4">Kategori Produk</h2>
                            <ul className="text-sm text-gray-600">
                                <li className="mb-2">Kategori 1</li>
                                <li className="mb-2">Kategori 2</li>
                                <li className="mb-2">Kategori 3</li>
                                {/* Tambahkan kategori produk lainnya sesuai kebutuhan */}
                            </ul>
                        </div>
                        <div className="right-content w-3/4 p-4">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {isLoading ? (
                                    Array(12).fill().map((_, index) => (
                                        <div key={index} className='mx-1'>
                                            <div className="animate__animated animate__flash animate__infinite animate__slow">
                                                <img src={SobermartLogo} alt="Sobermart Logo" width={200} height={300} />
                                            </div>
                                            <Skeleton count={6} />
                                        </div>
                                    ))
                                ) : (
                                    products.map((product, index) => (
                                        <div key={index} className="transition duration-300 ease-in-out p-4">
                                            <div className="overflow-hidden relative h-40 group-hover:opacity-70 transition-opacity"
                                                onMouseEnter={() => setIsHovered(true)}
                                                onMouseLeave={() => setIsHovered(false)}>
                                                <img
                                                    src={
                                                        product.images[0] !== ''
                                                            ? "https://kuro.asrofur.me/sober/" + product.images[0]
                                                            : '/logo-sober-mart-color-grey-1.png'
                                                    }
                                                    alt={product.name.length > 2 ? product.name.slice(0, 40) + "..." : product.name}
                                                    className={`w-full h-full object-cover ${product.stock_status === 'out_of_stock' ? 'grayscale' : ''
                                                        }`}
                                                    style={{ imageRendering: 'pixelated' }}
                                                />
                                                {product.fee && (
                                                    <div className="discount absolute top-1 left-1 bg-red-500 text-white rounded">
                                                        <p className="px-1 text-sm">{product ? product.discount : ''}</p>
                                                    </div>
                                                )}
                                                {product.stock_status === 'out_of_stock' && (
                                                    <p className="absolute top-1/2 -translate-y-1/2 ml-6 bg-red-500 text-white px-2 py-1 rounded">
                                                        Barang Stok Habis
                                                    </p>
                                                )}
                                                {/* Tombol ikon favorit */}
                                                <div
                                                    className={`favorite absolute top-2 right-2 cursor-pointer
                                                        }`}
                                                    onClick={() => toggleFavorite(product)}
                                                >
                                                    {isProductFavorite(product.id) ? (
                                                        <AiFillHeart className="text-2xl text-red-500" />
                                                    ) : (
                                                        <AiOutlineHeart className="text-2x text-red-500" />
                                                    )}
                                                </div>
                                            </div>
                                            <h2 className="text-lg font-semibold mt-2 text-gray-800">{product.store ? product.store.name : ''}</h2>
                                            <h3 className="text-md  mt-2 text-blue-500">
                                                {product.name.length > 2 ? product.name.slice(0, 20) + "..." : product.name}
                                            </h3>
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
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainProduct;
