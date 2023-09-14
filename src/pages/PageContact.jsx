import React from 'react';
import Map from '../components/contact/Map';
import Info from '../components/contact/Info';

const PageContact = () => {
    return (
        <div className="w-full flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full">
                <h1 className="text-4xl font-bold mb-4 text-center">Contact</h1>
                <Map />
                <Info />
            </div>
        </div>
    );
};

export default PageContact;
