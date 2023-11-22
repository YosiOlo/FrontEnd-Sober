import React from 'react';

const SideProductBar = ({ setCategoryFilter }) => {
    return (
        <div className="side-content bg-gray-200">
            <h2 className="text-lg font-semibold mb-4">Kategori Produk</h2>
            <ul className="text-sm text-gray-600">
                <li className="mb-2">
                    <button
                        onClick={() => setCategoryFilter('Xiaomi')}
                        className="focus:outline-none"
                        
                    >
                        Fashion Muslim
                    </button>
                </li>
                <li className="mb-2">
                    <button
                        onClick={() => setCategoryFilter('Fashion Wanita')}
                        className="focus:outline-none"
                    >
                        Fashion Wanita
                    </button>
                </li>
                <li className="mb-2">
                    <button
                        onClick={() => setCategoryFilter('Ibu dan Bayi')}
                        className="focus:outline-none"
                    >
                        Ibu dan Bayi
                    </button>
                </li>
                {/* Tambahkan kategori produk lainnya sesuai kebutuhan */}
            </ul>
        </div>
    );
};

export default SideProductBar;
