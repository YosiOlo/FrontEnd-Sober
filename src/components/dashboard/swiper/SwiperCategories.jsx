import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';


import 'tailwindcss/tailwind.css'; // Pastikan Anda mengimpor Tailwind CSS

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import { datas } from '../../../utils/data';

// Aktifkan modul navigasi Swiper
SwiperCore.use([Autoplay, Pagination, Navigation]);

function SwiperCategories() {
    // Data untuk SwiperSlides
    const slideData = [
        'slide 1', 'slide 2', 'slide 3', 'slide 4', 'slide 5',
        'slide 6', 'slide 7', 'slide 8', 'slide 9', 'slide 10'
    ];

    return (
        <div className="main-content mx-5 relative mb-10">
            <div className="top flex justify-between mb-5">
                <div className="content_left ">
                    <h3 className='text-4xl font-semibold'>Category</h3>
                </div>
                <div className="contentright flex ">
                    <div className="category-swiper-button-prev z-10 mx-5">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-lg focus:outline-none">
                            <AiOutlineArrowLeft />
                        </button>
                    </div>
                    <div className="category-swiper-button-next z-10 ">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-lg focus:outline-none">
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
                        delay: 4500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={{
                        nextEl: '.category-swiper-button-next',
                        prevEl: '.category-swiper-button-prev',
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
                    {datas.map((slideText, index) => (
                        <SwiperSlide key={index}>
                            <a href="#" className="group block ring-1 ring-slate-900/5 shadow-lg bg-slate-300  hover:bg-sky-500 hover:ring-sky-500">
                                <div className="main px-2 py-1 h-56 mb-8 pb-2  rounded-md justify-center">
                                    <div className="main_slide ">
                                        <div className="swiper_image my-1  flex justify-center">
                                            <img className=' w-24 h-24 justify-center mt-8 group-hover:stroke-white' src={slideText.image} alt='' />
                                        </div>
                                        <div className="swiper_title mt-2 mb-2 justify-center text-center">
                                            <h6 className='text-xl font-semibold group-hover:text-white'>{slideText.title}</h6>
                                        </div>

                                    </div>
                                </div>
                            </a>



                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </div>
    );
}

export default SwiperCategories;
