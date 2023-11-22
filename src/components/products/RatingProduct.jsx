import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

function RatingProduct({ star, reviews }) {
    const starsArray = Array.from({ length: 5 }, (_, index) => index + 1);

    // Hitung total ulasan
    const totalRatings = reviews ? 1 : 0;

    return (
        <div className="flex items-center space-x-1">
            {starsArray.map((index) => (
                <div key={index}>
                    {index <= star ? (
                        <AiFillStar className="text-yellow-500 h-5 w-5" />
                    ) : (
                        <AiOutlineStar className="text-gray-300 h-5 w-5" />
                    )}
                </div>
            ))}
            <div className="text-gray-500 text-sm">
                {star} ({totalRatings} {totalRatings === 1 ? 'ulasan' : 'ulasan'})
            </div>
        </div>
    );
}

export default RatingProduct;
