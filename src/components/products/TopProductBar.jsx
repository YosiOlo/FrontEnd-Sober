import React, { useState } from 'react';
import { AiOutlineAppstore, AiOutlineUnorderedList } from 'react-icons/ai';

const TopProductBar = ({ onViewChange }) => {
    const [view, setView] = useState('grid');

    const handleViewChange = (newView) => {
        setView(newView);
        console.log('Mengubah tampilan:', newView);
        onViewChange(newView);
    };


    return (
        <div className="top-content flex h-1/4 my-8">
            <div className="top-left h-full w-1/2 text-5xl font-semibold ml-4">Toko</div>
            <div className="top-right flex w-1/2 justify-end mx-4">
                <div className="top-right-top flex mr-2">
                    <p className="hidden md:block mt-4 mr-2">Sort By</p>

                    <div className="msort-by">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn m-1">
                                Click
                            </label>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li><a>Item 1</a></li>
                                <li><a>Item 2</a></li>
                            </ul>
                        </div>
                    </div>
                </div>


                <div className="top-right-bottom  flex ">
                    <p className="hidden md:block mt-4">View</p>

                    <div className="view flex mr-10">
                        <div
                            className={`grid ml-6 ${view === 'grid' ? 'text-blue-500' : 'text-gray-500'}`}
                            onClick={() => handleViewChange('grid')}
                        >
                            <AiOutlineAppstore size={40} />
                        </div>
                        <div
                            className={`list ml-4 ${view === 'list' ? 'text-blue-500' : 'text-gray-500'}`}
                            onClick={() => handleViewChange('list')}
                        >
                            <AiOutlineUnorderedList size={40} />
                        </div>
                    </div>
                </div>
            </div>


        </div>

    );
};

export default TopProductBar;
