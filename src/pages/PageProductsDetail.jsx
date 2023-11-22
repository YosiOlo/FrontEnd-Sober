import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../utils/ApiConfig';
import TopAppBar from '../components/TopAppBar';
import MidleBar from '../components/MidleBar';
import HeaderWrapaper from '../components/HeaderWrapaper';
import BreadCrumb from '../components/BreadCrumb';
import DetailProduct from '../components/products/DetailProduct';
import SwiperProduct from '../components/products/SwiperProduct';
import Footer from '../components/Footer';
import axios from 'axios';

function PageProductDetail() {
    const { id } = useParams();
    const [productData, setProductData] = useState({});
    const [breadcrumbItems, setBreadcrumbItems] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    useEffect(() => {
        axios.get(`${BASE_URL}/api/product/${id}`)
            .then((response) => {
                // console.log(response.data.data.related_products);
                setProductData(response.data.data);
                setRelatedProducts(response.data.data.related_products);
                
                setBreadcrumbItems([
                    { label: 'Home', url: '/' },
                    { label: 'Product', url: '/product' },
                    { label: `${response.data.data.name}`, url: `/product/${id}` },
                ]);
            });
    }, [id]);

    return (
        <div>
            <TopAppBar />
            <MidleBar />
            <HeaderWrapaper />
            <BreadCrumb items={breadcrumbItems} />
            <div className="product flex flex-col mx-2">
                <DetailProduct data={productData} />
            </div>
            <SwiperProduct related={relatedProducts} /> 
            <Footer />
        </div>
    );
}

export default PageProductDetail;
