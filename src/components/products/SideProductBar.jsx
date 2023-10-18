import React from 'react';



const SideProductBar = () => {

    return (
        <div className="side-content bg-gray-200">
            <h2 className="text-lg font-semibold mb-4">Kategori Produk</h2>
            <ul className="text-sm text-gray-600">
                <li className="mb-2">Kategori 1</li>
                <li className="mb-2">Kategori 2</li>
                <li className="mb-2">Kategori 3</li>
                {/* Tambahkan kategori produk lainnya sesuai kebutuhan */}
            </ul>
        </div>

    );
};

export default SideProductBar;
