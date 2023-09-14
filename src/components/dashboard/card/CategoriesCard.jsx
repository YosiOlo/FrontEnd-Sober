import React from 'react';
import Join from '../../public/join-sober.png';
const CategoriesCard = (props) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                <img src={Join} alt={Join} className="w-24 h-24" />
            </div>
            <h5 className="text-lg font-semibold mt-4">Judul</h5>
        </div>
    );   
}
export default CategoriesCard;