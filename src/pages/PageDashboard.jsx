import React from "react";
import TopAppBar from "../components/TopAppBar";
import MidleBar from "../components/MidleBar";
import HeaderWrapaper from "../components/HeaderWrapaper";
import Footer from "../components/Footer";
import Hero from "../components/dashboard/Hero";
import SwiperCategories from "../components/dashboard/swiper/SwiperCategories";
import SwiperIngredients from "../components/dashboard/swiper/SwiperIngredients";
import SwiperOil from "../components/dashboard/swiper/SwiperOil";
import SwiperBrands from "../components/dashboard/swiper/SwiperBrands";
import SwiperSoap from "../components/dashboard/swiper/SwiperSoap";
import SwiperNodles from "../components/dashboard/swiper/SwiperNodles";
import BottomBlog from "../components/dashboard/BottomBlog";

function PageDashboard() {
  const slideData = [
    "bumbu 1",
    "bumbu 2",
    "bumbu 3",
    "bumbu 4",
    "bumbu 5",
    "bahan 6",
    "bahan 7",
    "bahan 8",
    "bahan 9",
    "bahan 10",
  ];

  return (
    <div className="main-content">
      <TopAppBar />
      <MidleBar />
      <HeaderWrapaper />

      <Hero />
      <SwiperCategories />
      <SwiperIngredients listData={slideData} title="Bumbu dan Bahan Makanan" />
      <SwiperBrands />
      <SwiperOil />
      <SwiperSoap />
      <SwiperNodles />
      <BottomBlog />
      <Footer />
    </div>
  );
}

export default PageDashboard;
