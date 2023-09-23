import React from 'react';
import TopAppBar from '../components/TopAppBar';
import MidleBar from '../components/MidleBar';
import HeaderWrapaper from '../components/HeaderWrapaper';
import Footer from '../components/Footer';
import Map from '../components/contact/Map';
import Info from '../components/contact/Info';

const PageContact = () => {
    return (
        <div>
            <TopAppBar />
            <MidleBar />
            <HeaderWrapaper />
        <div className="w-full flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full">
                <h1 className="text-4xl font-bold mb-4 text-center">Contact</h1>
                <Map />
                <Info />
            </div>
        </div>
        <Footer />
        </div>
    );
};

export default PageContact;
