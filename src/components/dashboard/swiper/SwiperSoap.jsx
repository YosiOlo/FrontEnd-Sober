import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import 'animate.css';
import SobermartLogo from '/logo-sober-mart-color-grey-1.png';
import 'tailwindcss/tailwind.css';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import CardProduct from '../../products/CardProduct';
import { getProductSoap } from '../../../utils/ApiConfig';
import { authToken } from '../../../utils/ApiConfig';
import { useWishlist } from '../../context/WishlistContext';

SwiperCore.use([Autoplay, Pagination, Navigation]);

function SwiperSoap() {
    const token = `Bearer ${authToken}`;
    const isLoggedIn = !!authToken;
    const [spices, setSpice] = React.useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [favoritespices, setFavoritespices] = useState([]);
    const { wishlist, setWishlist } = useWishlist();

    const headers = {
        'Authorization': token,
        'Content-Type': 'application/json',
    };

    // Fungsi untuk memuat ulang daftar Wishlist/Favorit
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

    useEffect(() => {
        // Memanggil fungsi refreshFavoriteSpices saat komponen dimuat untuk pertama kali
        

        getProductSoap().then((res) => {
            setSpice(res.rows);
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        });
        refreshFavoriteSpices();
    }, []);

    const toggleFavorite = async (spice) => {
        const data = await getProductSoap();

        if (isspiceFavorite(spice.id)) {
            if (isLoggedIn) {
                axios.delete(`https://kuro.asrofur.me/sober/api/users/wishlist/${spice.id}`, { headers })
                    .then((response) => {
                        setFavoritespices(favoritespices.filter(item => item.product_id !== spice.id));
                        console.log('Menghapus favorit');
                    })
                    .catch((error) => {
                        console.error('Gagal menghapus favorit:', error.response.data.message);
                    });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Diperlukan',
                    text: 'Anda harus login untuk menambahkan produk ke daftar favorit.',
                });
                return;
            }
        } else {
            if (isLoggedIn) {
                axios.post(`https://kuro.asrofur.me/sober/api/users/wishlist/${spice.id}`, {}, { headers })
                    .then((response) => {
                        const getspiceId = data.rows.find(item => item.id === spice.id);
                        setFavoritespices([...favoritespices, { product: getspiceId }]);
                        refreshFavoriteSpices(); // Memuat ulang daftar Wishlist/Favorit
                    })
                    .catch((error) => {
                        console.error('Gagal menambahkan favorit:', error.response.data.message);
                    });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Diperlukan',
                    text: 'Anda harus login untuk menambahkan produk ke daftar favorit.',
                });
                return;
            }
        }
    };

    const isspiceFavorite = (spiceId) => {
        return favoritespices.some(item => item.product.id === spiceId);
    };

    useEffect(() => {
        const reduceWish = wishlist.filter(item => !item.product.name.includes(''));
        setWishlist([...favoritespices, ...reduceWish]);
    }, [favoritespices]);

    return (
        <div className="main-content relative p-4">
            <div className="top flex justify-between mb-5">
                <div className="content_left flex">
                    <h3 className='text-4xl font-semibold'>Soap</h3>
                    <span className='text-xl text-green-600 mt-2 ml-10'><Link>View All</Link></span>
                </div>
                <div className="contentright flex">
                    <div className="inventory-swiper-button-prev z-10 mx-5">
                        <button className="bg-slate-600 hover:bg-blue-600 text-white px-2 py-1 rounded-lg focus:outline-none">
                            <AiOutlineArrowLeft />
                        </button>
                    </div>
                    <div className="inventory-swiper-button-next z-10">
                        <button className="bg-slate-600 hover.bg-blue-600 text-white px-2 py-1 rounded-lg focus:outline-none">
                            <AiOutlineArrowRight />
                        </button>
                    </div>
                </div>
            </div>
            <div className="swiper">
                <Swiper
                    spaceBetween={30}
                    slidesPerView={5}
                    autoplay={{
                        delay: 50000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={{
                        nextEl: '.inventory-swiper-button-next',
                        prevEl: '.inventory-swiper-button-prev',
                    }}
                    className="mySwiper bg-white"
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                            pagination: {
                                clickable: true,
                            },
                        },
                        640: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                            pagination: {
                                clickable: true,
                            },
                        },
                        768: {
                            slidesPerView: 5,
                            spaceBetween: 15,
                            pagination: {
                                clickable: true,
                            },
                        },
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 15,
                            pagination: {
                                clickable: false,
                            },
                        },
                        1280: {
                            slidesPerView: 7,
                            spaceBetween: 30,
                        },
                    }}
                >
                    {isLoading ? (
                        Array(12).fill().map((_, index) => (
                            <SwiperSlide key={index}>
                                <div key={index} className='mx-1 flex-col'>
                                    <div className="animate__animated animate__flash animate__infinite animate__slow">
                                        <img src={SobermartLogo} alt="Sobermart Logo" width={300} height={400} />
                                    </div>
                                    <Skeleton count={6} />
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        spices.map((spice, index) => (
                            <SwiperSlide key={index}>
                                <CardProduct
                                    key={index}
                                    product={spice}
                                    isProductFavorite={isspiceFavorite}
                                    toggleFavorite={toggleFavorite}
                                />
                            </SwiperSlide>
                        ))
                    )}
                </Swiper>
            </div>
        </div>
    );
}

export default SwiperSoap;
