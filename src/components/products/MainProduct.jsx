import React, { useEffect, useState } from 'react';
import { product_data, BASE_URL } from '../../utils/ApiConfig';
import SobermartLogo from '../../../public/logo-sober-mart-color-grey-1.png';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import 'animate.css';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { authToken } from '../../utils/ApiConfig';
import { useWishlist } from '../context/WishlistContext';
import CardProduct from './CardProduct';
import Swal from 'sweetalert2';

const MainProduct = ({ viewType }) => {
    const token = `Bearer ${authToken}`;
    const isLoggedIn = !!authToken;
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [filteredProduct, setFilteredProducts] = useState([]);
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const { setWishlist } = useWishlist();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isCtgClicked, setIsCtgClicked] = useState(false);

    const categoryProducts = ["Fashion", "Makanan", "Minuman", "Elektronik", "Kecantikan", "Kesehatan",]

    const headers = {
        'Authorization': token,
        'Content-Type': 'application/json',
    };

    const setCategoryFilter = (category) => {
        setIsCtgClicked(true);

        axios.get(`${BASE_URL}/api/product?page=1&limit=&search=${category}&orderby=&kategori=&kategori_2=`)
            .then(res => {

                setFilteredProducts(res.data.data.rows);
            })
            .catch(err => console.log('Error fetching category'))
            .finally()

    };

    const refreshFavoriteProducts = () => {
        if (isLoggedIn) {
            axios.get('https://kuro.asrofur.me/sober/api/users/wishlist/', { headers })
                .then((response) => setFavoriteProducts(response.data.data))
                .catch(err => console.log('Error fetching wishlist'));
        } else {
            const localFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
            setFavoriteProducts(localFavorites);
        }
    };

    const toggleFavorite = async (product) => {
        const data = await product_data();
        if (isProductFavorite(product.id)) {
            if (isLoggedIn) {
                axios.delete(`https://kuro.asrofur.me/sober/api/users/wishlist/${product.id}`, { headers })
                    .then((response) => {
                        console.log('Menghapus favorit');
                        setFavoriteProducts(favoriteProducts.filter(item => item.product_id !== product.id));
                    })
                    .catch((error) => {
                        console.error('Gagal menghapus favorit:', error.response.data.message);
                    });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Diperlukan',
                    text: 'Anda harus login untuk menambahkan produk ke daftar favorit.',
                });
                return;
            }
        } else {
            if (isLoggedIn) {
                axios.post(`${BASE_URL}/api/users/wishlist/${product.id}`, {}, { headers })
                    .then((response) => {
                        const getProductId = data.rows.find(item => item.id === product.id);
                        setFavoriteProducts([...favoriteProducts, { product: getProductId }]);
                        refreshFavoriteProducts();
                    })
                    .catch((error) => {
                        console.error('Gagal menambahkan favorit:', error.response.data.message);
                    });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Diperlukan',
                    text: 'Anda harus login untuk menambahkan produk ke daftar favorit.',
                });
                return;
            }
        }
    };

    const isProductFavorite = (productId) => {
        return favoriteProducts.some(item => item.product.id === productId);
    };

    useEffect(() => setWishlist(favoriteProducts), [favoriteProducts]);

    useEffect(() => {
        refreshFavoriteProducts();

        const fetchData = async () => {
            const data = await product_data();
            console.log('Data dari respons API:', data); 
            setProducts(data.rows);
            setFilteredProducts(data.rows);
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
            
        };
        fetchData();
    }, []);

    const handleReset = () => {
        setIsCtgClicked(false)
        setFilteredProducts(products);
    }

    return (
        <div className="main-product bg-white flex">
            <div className="side-content bg-gray-200 w-1/4">
                <h2 className="text-4xl font-semibold mb-4 ml-8 mt-4 ">Kategori Produk</h2>
                <ul className="text-sm text-gray-600">
                    {isCtgClicked && <li className="mb-2">
                        <button
                            onClick={handleReset}
                            className={`focus:outline-none text-xl font-medium ml-8 mb-1 hover:text-blue-600 hover:font-bold `}
                        >
                            Semua Kategori
                        </button>
                    </li>}
                    {categoryProducts.map((category, index) => (
                        <li className="mb-2" key={index}>
                            <button
                                onClick={() => setCategoryFilter(category)}
                                className={`focus:outline-none text-xl font-medium ml-8 mb-1 hover:text-blue-600 hover:font-bold`}
                            >
                                {category}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={`main-product w-3/4 bg-white ${viewType === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4' : ''}`}>
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
                    filteredProduct.map((product, index) => {
                        // const productName = product.name;
                        // const formattedName = productName.toLowerCase().replace(/ /g, '-');
                        return (
                            // <Link to={`/product/${formattedName}`} key={index}>

                            // </Link>
                            <CardProduct
                                key={index}
                                product={product}
                                isProductFavorite={isProductFavorite}
                                toggleFavorite={toggleFavorite}
                                viewType={viewType}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default MainProduct;
