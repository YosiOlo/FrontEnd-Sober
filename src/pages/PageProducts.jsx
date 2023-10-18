import React, { useState } from 'react';
import TopAppBar from '../components/TopAppBar';
import MidleBar from '../components/MidleBar';
import HeaderWrapaper from '../components/HeaderWrapaper';
import Footer from '../components/Footer';
import TopProductBar from '../components/products/TopProductBar';
import SideProductBar from '../components/products/SideProductBar';
import MainProduct from '../components/products/MainProduct';

const PageProduct = () => {
    const viewType = 'grid';
    const [productView, setProductView] = useState(viewType);

    const handleProductViewChange = (newView) => {
        setProductView(newView);
    };

    return (
        <div>
            <TopAppBar />
            <MidleBar />
            <HeaderWrapaper />
            <div className="product flex flex-col mx-2">
                <TopProductBar viewType={productView} onViewChange={handleProductViewChange} />
                <div className="flex mx-2">
                    <div className="side-product w-1/4">
                        <SideProductBar />
                    </div>
                    <div className="main-product w-3/4">
                        <MainProduct viewType={productView} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PageProduct;
