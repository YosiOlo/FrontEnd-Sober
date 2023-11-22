import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import RatingProduct from './RatingProduct';
import { BiMap } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { FaFacebook, FaTwitter, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { getCart, postCart } from '../../utils/ApiConfig';
import axios from 'axios';
import { authToken } from '../../utils/ApiConfig';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';


function DetailProduct({ data }) {
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('keterangan');
    const [isLoading, setIsLoading] = useState(false);
    const token = `Bearer ${authToken}`;
    const isLoggedIn = !!authToken;
    const [favoritespices, setFavoritespices] = useState([]);
    const { wishlist, cart, setWishlist, setCart } = useWishlist();

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value >= 0) {
            setQuantity(value);
        }
    };


    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleCart = async () => {
        setIsLoading(true);
        try {
            const productId = data.id;
            const attributes = data.product_attribute_set.length !== 0 ? data.product_attribute_set[0].id : 0;
            const response = await postCart(productId, quantity, attributes);

            // Tambahkan SweetAlert2 di sini sesuai respons dari postCart
            Swal.fire({
                icon: 'success',
                title: 'Sukses menambahkan produk ke keranjang',
                text: response.message || 'Produk berhasil ditambahkan ke keranjang.',
            });

            const newListCart = await getCart();

            setCart(newListCart);
            setIsLoading(false);
        } catch (error) {
            console.error('Gagal menambahkan produk ke keranjang', error);
            // SweetAlert2 untuk penanganan error
            Swal.fire({
                icon: 'error',
                title: 'Gagal menambahkan produk ke keranjang',
                text: 'Terjadi kesalahan saat menambahkan produk ke keranjang.',
            });
            setIsLoading(false);
        }
    };

    const headers = {
        'Authorization': token,
        'Content-Type': 'application/json',
    };
    const refreshFavoriteSpices = () => {
        if (isLoggedIn) {
            axios.get('https://kuro.asrofur.me/sober/api/users/wishlist/', { headers })
                .then((response) => {
                    const listData = response.data.data.filter(item => item.product.name.includes(''));
                    setFavoritespices(listData);
                })
                .catch(err => console.log('Error fetching wishlist'));
        }
    };
    const toggleFavorite = async (data) => {
        if (isLoggedIn) {
            if (isspiceFavorite(data.id)) {
                axios
                    .delete(`https://kuro.asrofur.me/sober/api/users/wishlist/${data.id}`, { headers })
                    .then((response) => {
                        setFavoritespices(favoritespices.filter(item => item.product.id !== data.id));
                        Swal.fire({
                            icon: 'success',
                            title: 'Produk dihapus dari daftar favorit!',
                        });
                    })
                    .catch((error) => {
                        console.error('Gagal menghapus favorit:', error.response.data.message);
                        Swal.fire({
                            icon: 'error',
                            title: 'Terjadi kesalahan',
                            text: 'Gagal menghapus produk dari daftar favorit.',
                        });
                    });
            } else {
                const productData = data;

                if (productData) {
                    if (isspiceFavorite(data.id)) {
                        Swal.fire({
                            icon: 'info',
                            title: 'Produk sudah ada di daftar favorit.',
                        });
                    } else {
                        axios
                            .post(`https://kuro.asrofur.me/sober/api/users/wishlist/${data.id}`, {}, { headers })
                            .then((response) => {
                                setFavoritespices([...favoritespices, { product: productData }]);
                                refreshFavoriteSpices();
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Produk ditambahkan ke daftar favorit!',
                                });
                            })
                            .catch((error) => {
                                console.error('Gagal menambahkan favorit:', error.response.data.message);
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Terjadi kesalahan',
                                    text: 'Gagal menambahkan produk ke daftar favorit.',
                                });
                            });
                    }
                } else {
                    console.error('Data produk tidak ditemukan.');
                    Swal.fire({
                        icon: 'error',
                        title: 'Produk tidak ditemukan',
                        text: 'Data produk tidak ditemukan.',
                    });
                }
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Login Diperlukan',
                text: 'Anda harus login untuk menambahkan produk ke daftar favorit.',
            });
            return;
        }
    };
    const isspiceFavorite = (spiceId) => {
        return favoritespices.some(item => item.product.id === spiceId);
    };

    useEffect(() => {
        refreshFavoriteSpices();
        const reduceWish = wishlist.filter(item => !item.product.name.includes(''));
        setWishlist([...favoritespices, ...reduceWish]);
    }, [favoritespices]);



    return (
        <div>
            <div className="top-content md:gap-5 flex flex-col lg:flex-row mt-10">
                <div className="flex gap-5 md:flex-row flex-col-reverse md:w-full lg:w-2/5">
                    <div className="w-32 h-32 ml-16 flex md:flex-col lg:flex md:mb-0 lg:flex-col lg:gap-5 lg:ml-0 ">
                        {data.images && data.images.map((image, index) => (
                            <img
                                key={index}
                                src={image !== '' ? "https://kuro.asrofur.me/sober/" + image : '/logo-sober-mart-color-grey-1.png'}
                                alt={data.name}
                                className={`w-56 h-56 object-contain cursor-pointer ${currentImageIndex === index ? 'border border-blue-500' : ''}`}
                                onClick={() => setCurrentImageIndex(index)}
                            />
                        ))}
                    </div>
                    <div className="images-product flex justify-center">
                        {data.images && data.images.length > 0 && (
                            <img
                                src={
                                    data.images[currentImageIndex] !== ''
                                        ? "https://kuro.asrofur.me/sober/" + data.images[currentImageIndex]
                                        : '/logo-sober-mart-color-grey-1.png'
                                }
                                alt={data.name}
                                className={`object-contain`}
                            />
                        )}
                    </div>

                </div>
                <div className="flex-1  border-l border-gray-300 mt-20 md:mt-10 lg:mt-0">
                    <div className="content ml-4 mr-4 mb-4">
                        <div className="top my-2 mt-1 border-b border-gray-300">
                            <h2 className='text-xl lg:text-2xl xl:text-3xl font-semibold'>{data.name}</h2>
                            <div className="reviews flex mb-4">
                                <p className='text-gray-600 mr-1'>Terjual: {data.terjual}</p>
                                {data.reviews ? (
                                    <RatingProduct star={data.reviews.star} reviews={data.reviews} />
                                ) : null}
                            </div>

                        </div>
                        <div className="reviews my-2 flex mt-2">
                            <p className='text-red-400 text-lg lg:text-xl xl:text-xl font-bold'>
                                Rp.{data.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            </p>
                        </div>
                        <div className="store-name flex my-2 mb-4 ">
                            <p className={`font-semibold text-gray-800 mr-2 `}>
                                Dijual Oleh:
                            </p>
                            <p className="font-semibold text-blue-500">
                                {data.store ? data.store.name : ''}
                            </p>
                        </div>
                        {data.stock_status === 'out_of_stock' ? (
                            <div className="md:3/4 lg:w-1/2 m-4 flex rounded-md border-4 border-red-300 bg-red-100">
                                <div className="text mr-1 ml-4 my-2">
                                    <p className='out-of-stock-product'>
                                        Ketersedian Barang:
                                    </p>
                                </div>
                                <div className="text my-2">
                                    <p className="in-stock text-red-600">Stok Habis</p>
                                </div>
                            </div>
                        ) : (
                            data.stock_status === 'in_stock' ? (
                                <div className="w-2/4 lg:w-full m-4 rounded-md flex border-4 border-green-300 bg-green-100">
                                    <div className="text mr-1 ml-4 my-2">
                                        <p className='out-of-stock-product'>
                                            Ketersedian Barang:
                                        </p>
                                    </div>
                                    <div className="text my-2">
                                        <p className="in-stock text-green-500 font-semibold">Tersedia</p>
                                    </div>
                                </div>
                            ) : null // Menambahkan null jika ingin menghindari tampilan apa pun jika tidak ada kecocokan
                        )}
                        <div className="store-name flex my-2 mt-10">
                            <p className="text-gray-600 mr-2">
                                Kategori:
                            </p>
                            <p className="font-semibold text-blue-500">
                                {data.kategori_1 ? data.kategori_1.name : ''}
                                <span className="text-black">
                                    {data.kategori_1 && data.kategori_2 ? ', ' : ''}
                                </span>
                                {data.kategori_2 ? data.kategori_2.name : ''}
                                <span className="text-black ml-1">
                                    {data.kategori_2 && data.kategori_3 ? ', ' : ''}
                                </span>
                                {data.kategori_3 ? data.kategori_3.name : ''}
                            </p>
                        </div>
                        <div className="store-name flex my-2">
                            <p className={`text-gray-800 mr-2`}>
                                Alamat:
                            </p>
                            <p className="font-semibold">
                                {data.store ? data.store.city : 'Null'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="list">
                        <div className="kuantitas flex justify-start">
                            <p className="font-semibold">Kuantitas</p>
                        </div>
                        <div className="input-text my-2 flex items-center w-full border border-gray-300 rounded-md">
                            <button className="min py-2 px-4 rounded-l-md " onClick={handleDecrement}><FiMinus /></button>
                            <input
                                type="number"
                                className="text border-none focus:outline-none text-center py-2 px-4 w-full"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min="1"
                            />
                            <button className="plus py-2 px-4 rounded-r-md" onClick={handleIncrement}><FiPlus /></button>
                        </div>
                        <div className="button-cart w-full">
                            <button onClick={handleCart} disabled={isLoading} className='bg-blue-500 text-white rounded-md py-2 px-4 border-none w-full hover:bg-blue-800'>Masukan Ke Keranjang</button>
                        </div>
                        <div className="keranjang my-1 w-full">
                            <Link to="/checkout" className="hover:text-blue-600 text-center mt-2">
                                <button disabled={isLoading} className='bg-gray-500 text-white rounded-md py-2 px-4 border-none w-full hover:bg-gray-800'>Beli Sekarang</button>
                            </Link>
                        </div>
                        <div
                            className={` cursor-pointer my-2`}
                            onClick={() => toggleFavorite(data)}
                        >
                            {isspiceFavorite(data.id) ? (
                                <AiFillHeart className="text-2xl text-red-500" />
                            ) : (
                                <AiOutlineHeart className="text-2xl text-red-500" />
                            )}
                        </div>

                        <div className="wishlist"></div>

                    </div>

                </div>
            </div>
            <div className="mid-content md:my-4">
                <div className="content flex flex-col mt-6 md:mt-28 md:flex-row">
                    <div className="left-content flex-col md:w-1/4 md:ml-16">
                        <div className="keterangan flex justify-center ">
                            <button
                                className={`border-t  font-semibold w-5/6 sm:w-3/4 h-16 hover:bg-slate-500 hover:text-white ${activeTab === 'keterangan' ? 'bg-slate-500 text-white' : ''
                                    }`}
                                onClick={() => handleTabClick('keterangan')}
                            >
                                <p className='ml-2 text-lg flex justify-start'>Keterangan</p>
                            </button>
                        </div>
                        <div className="ulasan flex justify-center">
                            <button
                                className={`border-t border-b font-semibold w-5/6 sm:w-3/4 h-16 hover:bg-slate-500 hover:text-white ${activeTab === 'ulasan' ? 'bg-slate-500 text-white' : ''
                                    }`}
                                onClick={() => handleTabClick('ulasan')}
                            >
                                <p className='ml-2 text-lg flex justify-start'>Ulasan</p>
                            </button>
                        </div>
                        <div className="info-penjual flex justify-center">
                            <button
                                className={`border-b font-semibold w-5/6 sm:w-3/4 h-16 hover:bg-slate-500 hover:text-white ${activeTab === 'info-penjual' ? 'bg-slate-500 text-white' : ''
                                    }`}
                                onClick={() => handleTabClick('info-penjual')}
                            >
                                <p className='ml-2 text-lg flex justify-start'>Info Penjual</p>
                            </button>
                        </div>
                    </div>
                    <div className="right-content md:w-3/4">
                        {activeTab === 'keterangan' && (
                            <div className='keterangan' dangerouslySetInnerHTML={{ __html: data.content }} />
                        )}
                        {activeTab === 'ulasan' && (
                            <div className="ulasan">
                                {/* Isi dengan konten ulasan */}
                            </div>
                        )}
                        {activeTab === 'info-penjual' && (
                            <div className="info-penjual ">
                                <div className="store-content flex flex-col my-10 justify-between bg-slate-200 w-full lg:flex-row md:my-0 ">
                                    <div className="content flex flex-row">
                                        <div className="store-images avatar ">
                                            <div className="images w-36 rounded-full my-6 mx-4">
                                                <img
                                                    src={
                                                        data.store && data.store.logo !== ''
                                                            ? "https://kuro.asrofur.me/sober/" + data.store.logo
                                                            : '/logo-sober-mart-color-grey-1.png'
                                                    }
                                                    alt={data.store ? data.store.name : ''}
                                                    className={`object-contain`}
                                                />
                                            </div>
                                        </div>
                                        <div className="store ml-8 mt-2">
                                            <div className="store-name">
                                                <h2 className='text-2xl font-bold'>
                                                    {data.store ? data.store.name : ''}
                                                </h2>
                                            </div>
                                            <div className="store-reviews my-3">
                                                <h2>
                                                    Reviews
                                                </h2>
                                            </div>
                                            <div className="store-adres flex-col ">
                                                <div className="store-address flex my-2" >
                                                    <div className="icon mr-1"><BiMap size={20} /></div>
                                                    <div className="store">
                                                        {data.store && (
                                                            <p>
                                                                {data.store.address && `Jalan: ${data.store.address}`}
                                                                {data.store.kelurahan && `, Kelurahan: ${data.store.kelurahan}`}
                                                                {data.store.kecamatan && `, Kecamatan: ${data.store.kecamatan}`}
                                                                {data.store.city && `, Kota: ${data.store.city}`}
                                                                {data.store.state && `, Provinsi: ${data.store.state}`}
                                                                {data.store.country && `, ${data.store.country}`}
                                                                {data.store.zip_code && `, ${data.store.zip_code}`}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="store-email flex">
                                                    <div className="icon mr-1"><AiOutlineMail size={20} /></div>
                                                    <div className="email">
                                                        {data.store && (
                                                            <p>
                                                                {data.store.address && `Email: ${data.store.email}`}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right-content flex flex-col ml-4 mb-2">
                                        <div className="icon-sosmed flex mt-4 mr-4">
                                            <button className="icon-fb p-2 mr-2 rounded-lg bg-blue-600 hover:bg-blue-700">
                                                <FaFacebook className="text-white text-2xl" />
                                            </button>
                                            <button className="icon-x p-2 mx-2 rounded-lg bg-blue-400 hover:bg-blue-500">
                                                <FaTwitter className="text-white text-2xl" />
                                            </button>
                                            <button className="icon-yt p-2 mx-2 rounded-lg bg-red-600 hover:bg-red-700">
                                                <FaYoutube className="text-white text-2xl" />
                                            </button>
                                            <button className="icon-in p-2 mx-2 rounded-lg bg-blue-800 hover:bg-blue-900">
                                                <FaLinkedin className="text-white text-2xl" />
                                            </button>
                                        </div>
                                        <div className="store-date flex mt-3">
                                            <p className='mr-1'>Dimulai dari:</p>
                                            <p className='text-base font-bold'>
                                                {data.created_at &&
                                                    new Date(data.created_at).toLocaleDateString('id-ID', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    }).replace(' ', ', ')}
                                            </p>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>


                {/* Tambahkan detail lainnya sesuai kebutuhan */}
            </div>
            <div className="bottom-content">

            </div>
        </div>
    );
}

export default DetailProduct;
