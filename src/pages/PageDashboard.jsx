import React from 'react';
import TopAppBar from '../components/TopAppBar';
import MidleBar from '../components/MidleBar';
import HeaderWrapaper from '../components/HeaderWrapaper';
import Hero from '../components/dashboard/Hero'
import SwiperCategories from '../components/dashboard/swiper/SwiperCategories';
import SwiperIngredients from '../components/dashboard/swiper/SwiperIngredients';
import SwiperOil from '../components/dashboard/swiper/SwiperOil';
import SwiperSoap from '../components/dashboard/swiper/SwiperSoap';
import SwiperNodles from '../components/dashboard/swiper/SwiperNodles';
import BottomBlog from '../components/dashboard/BottomBlog';
import Footer from '../components/Footer';



function PageDashboard() {
  

    return (
            <div className="main-content bg-gray-100">
                <TopAppBar />
                <MidleBar />
                <HeaderWrapaper />
                <Hero />
                <SwiperCategories />
                <SwiperIngredients />
                <SwiperOil />
                <SwiperSoap />
                <SwiperNodles />
                <BottomBlog />
                <Footer />
            </div>
    );
}

export default PageDashboard;
