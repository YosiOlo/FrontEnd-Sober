
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';

import Join from '../../../../public/join-sober.png';
import 'tailwindcss/tailwind.css'; // Pastikan Anda mengimpor Tailwind CSS

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Link } from 'react-router-dom';

// Aktifkan modul navigasi Swiper
SwiperCore.use([Autoplay, Pagination, Navigation]);

function SwiperIngredients({ listData, title }) {

    return (
        <div className="main-content relative bg-gray-200 p-4">
            <div className="top flex justify-between mb-5">
                <div className="content_left flex ">
                    <h3 className='text-4xl font-semibold'>{title}</h3>
                    <span className='text-xl text-green-600 mt-2 ml-10'><Link>View All</Link></span>
                </div>
                <div className="contentright flex ">
                    <div className="inventory-swiper-button-prev z-10 mx-5">
                        <button className=" bg-slate-600 hover:bg-blue-600 text-white px-2 py-1 rounded-lg focus:outline-none">
                            <AiOutlineArrowLeft />
                        </button>
                    </div>
                    <div className="inventory-swiper-button-next z-10 ">
                        <button className=" bg-slate-600 hover:bg-blue-600 text-white px-2 py-1 rounded-lg focus:outline-none">
                            <AiOutlineArrowRight />
                        </button>
                    </div>
                </div>
            </div>
            <div className="swiper ">
                <Swiper
                    spaceBetween={30}
                    slidesPerView={5}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={{
                        nextEl: '.inventory-swiper-button-next',
                        prevEl: '.inventory-swiper-button-prev',
                    }}
                    className="mySwiper"
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                            pagination: {
                                clickable: true,
                            },
                        },
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                            pagination: {
                                clickable: true,
                            },
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                            pagination: {
                                clickable: true,
                            },
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 15,
                            pagination: {
                                clickable: false,
                            },
                        },
                        1280: {
                            slidesPerView: 5,
                            spaceBetween: 30,
                        },
                    }}
                >
                    {listData.map((slideText, index) => (
                        <SwiperSlide key={index}>
                            <div className="main_slide bg-black mb-10 ">
                                <div className="swiper_image">
                                    <img src={Join} alt='' />
                                </div>
                                <div className="swiper_title mt-2 pb-2 justify-center text-center">
                                    <p>{slideText}</p>
                                </div>

                            </div>

                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </div>
    );
}

export default SwiperIngredients;
