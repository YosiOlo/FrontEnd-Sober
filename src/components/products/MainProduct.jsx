import React from 'react';
import { AiOutlineAppstore, AiOutlineUnorderedList } from 'react-icons/ai';


const MainProduct = () => {
    return (
        <div className="main-product flex flex-col">
            <div className="top bg-slate-400 flex h-1/4">
                <div className="top-left  h-full w-1/2">Title</div>
                <div className="top-right flex bg-slate-500 h-full w-1/2">
                    <div className="top-right-top w-1/2 flex justify-end">
                        <p>Sort By</p>
                        <div className="sort-by">
                            <div className="dropdown">
                                <label tabIndex={0} className="btn m-1">Click</label>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a>Item 1</a></li>
                                    <li><a>Item 2</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="top-right-bottom w-1/2 flex justify-end">
                        <p>View</p>
                        <div className="view flex mr-10">
                            <div className="grid ml-6">
                                <AiOutlineAppstore size={40} /> {/* Ikon grid */}
                            </div>
                            <div className="list ml-4">
                                <AiOutlineUnorderedList size={40} /> {/* Ikon list */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom bg-black h-3/4"> p</div>

        </div>
    );
};

export default MainProduct;
