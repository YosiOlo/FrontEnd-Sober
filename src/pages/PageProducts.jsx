import React from 'react';
import TopAppBar from '../components/TopAppBar';
import MidleBar from '../components/MidleBar';
import HeaderWrapaper from '../components/HeaderWrapaper';
import Footer from '../components/Footer';
import MainProduct from '../components/products/MainProduct';

const PageProduct = () => {
    return (
        <div>
        <TopAppBar />
        <MidleBar />
        <HeaderWrapaper />
        <MainProduct/>
        <Footer />
        </div>
    );
};

export default PageProduct;
