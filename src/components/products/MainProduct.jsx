import { useEffect, useState } from 'react';
import { product_data, BASE_URL } from '../../utils/ApiConfig';
import SobermartLogo from '../../../public/logo-sober-mart-color-grey-1.png';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import 'animate.css';

const MainProduct = () => {
    const [isLoading, setIsLoading] = useState(true); // Set awal isLoading ke true

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await product_data();
            setProducts(data.rows);
            // setIsLoading(false); // Set isLoading ke false setelah data produk dimuat
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        };
        fetchData();
    }, []);

    return (
        <div className="main-product flex flex-col">
            <div className="top flex h-1/4 mb-8">
                {/* ... (Kode sebelumnya) */}
            </div>
            <div className="bottom bg-black h-3/4">
                <div className="bg-white">
                    <div className="flex">
                        {/* Sidebar (Kategori Produk) */}
                        <div className="left-content w-1/4 bg-gray-200 p-4">
                            {/* Tambahkan konten kategori produk di sini */}
                            <h2 className="text-lg font-semibold mb-4">Kategori Produk</h2>
                            <ul className="text-sm text-gray-600">
                                <li className="mb-2">Kategori 1</li>
                                <li className="mb-2">Kategori 2</li>
                                <li className="mb-2">Kategori 3</li>
                                {/* Tambahkan kategori produk lainnya sesuai kebutuhan */}
                            </ul>
                        </div>

                        {/* Konten Produk */}
                        <div className="right-content w-3/4 p-4">

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {isLoading ? (
                                    Array(12).fill().map((_, index) => (
                                        <div key={index} className='mx-1'>
                                            <div className="animate__animated animate__flash animate__infinite animate__slow">
                                                <img src={SobermartLogo} alt="Sobermart Logo" width={200} height={300} />
                                            </div>
                                            <Skeleton count={6} />
                                        </div>
                                    ))
                                ) : (
                                    products.map((product, index) => (
                                        <div key={index} className="transition duration-300 ease-in-out p-4 bg-gray-200">
                                            <div className="overflow-hidden relative h-40 ">
                                                <img
                                                    src={product.images[0] !== '' ? "https://kuro.asrofur.me/sober/" + product.images[0] : '/logo-sober-mart-color-grey-1.png'}
                                                    // src={'/logo-sober-mart-color-grey-1.png'}
                                                    alt={product.name.length > 2 ? product.name.slice(0, 40) + "..." : product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                {product.fee && (
                                                    <div className="discount absolute top-1 left-1 bg-red-500 text-white  rounded">
                                                        <p className='px-1 text-xs '>-11%</p>
                                                    </div>
                                                )}
                                            </div>

                                            <h2 className="text-lg font-semibold mt-2 text-gray-800">{product.store ? product.store.name : ''}</h2>
                                            <h3 className="text-md  mt-2 text-blue-500">
                                                {product.name.length > 2 ? product.name.slice(0, 20) + "..." : product.name}
                                            </h3>
                                            <div className="sale_price flex justify-between">
                                            <p className="text-base font-semibold text-red-500">Rp{product.sale_price}</p>
                                            <p className="text-base font-bold text-gray-400 line-through">Rp{product.price}</p>
                                            </div>
                                            
                                            <h4 className="text-xs font-semibold mt-2 text-gray-600">{product.store ? product.store.city : ''}</h4>
                                            <div className="sale_product flex justify-between">
                                                <p className="text-xs text-gray-600 mt-2">Terjual</p>
                                                <p className="text-xs text-gray-600 mt-2">{product.terjual}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainProduct;
