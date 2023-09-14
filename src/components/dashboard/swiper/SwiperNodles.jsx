
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

// Aktifkan modul navigasi Swiper
SwiperCore.use([Autoplay, Pagination, Navigation]);

function SwiperNodles() {
    // Data untuk SwiperSlides
    const slideData = [
        'slide 1', 'slide 2', 'slide 3', 'slide 4', 'slide 5',
        'slide 6', 'slide 7', 'slide 8', 'slide 9', 'slide 10'
    ];

    return (
        <div className="main-content mx-5 relative">
            <div className="top flex justify-between mb-5">
                <div className="content_left ">
                    <h3 className='text-2xl font-semibold'>Mie</h3>
                </div>
                <div className="contentright flex ">
                    <div className="produk-swiper-button-prev z-10 mx-5">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-lg focus:outline-none">
                            <AiOutlineArrowLeft />
                        </button>
                    </div>
                    <div className="produk-swiper-button-next z-10 ">
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
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={{
                        nextEl: '.produk-swiper-button-next',
                        prevEl: '.produk-swiper-button-prev',
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
                    {slideData.map((slideText, index) => (
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

export default SwiperNodles;
