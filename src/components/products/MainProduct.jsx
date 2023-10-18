import React, { useEffect, useState } from 'react';
import { AiOutlineAppstore, AiOutlineUnorderedList, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FiMapPin } from 'react-icons/fi';
import { product_data, BASE_URL } from '../../utils/ApiConfig';
import SobermartLogo from '../../../public/logo-sober-mart-color-grey-1.png';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import 'animate.css';
import axios from 'axios';
import { authToken } from '../../utils/ApiConfig';
import { useWishlist } from '../context/WishlistContext';
import CardProduct from './CardProduct';
import Swal from 'sweetalert2';

const MainProduct = ({ viewType }) => {
    const token = `Bearer ${authToken}`;
    const isLoggedIn = !!authToken;
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const { addToWishlist, setWishlist } = useWishlist();

    const headers = {
        'Authorization': token,
        'Content-Type': 'application/json',
    };

    // Fungsi untuk memuat ulang daftar Wishlist/Favorit
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
                // Tampilkan pemberitahuan SweetAlert2 jika pengguna belum login
                Swal.fire({
                    icon: 'error',
                    title: 'Login Diperlukan',
                    text: 'Anda harus login untuk menambahkan produk ke daftar favorit.',
                });
                return; // Hentikan eksekusi jika pengguna belum login
            }
        } else {
            if (isLoggedIn) {
                axios.post(`https://kuro.asrofur.me/sober/api/users/wishlist/${product.id}`, {}, { headers })
                    .then((response) => {
                        const getProductId = data.rows.find(item => item.id === product.id);
                        setFavoriteProducts([...favoriteProducts, { product: getProductId }]);
                        refreshFavoriteProducts(); // Memuat ulang daftar Wishlist/Favorit
                    })
                    .catch((error) => {
                        console.error('Gagal menambahkan favorit:', error.response.data.message);
                    });
            } else {
                // Tampilkan pemberitahuan SweetAlert2 jika pengguna belum login
                Swal.fire({
                    icon: 'error',
                    title: 'Login Diperlukan',
                    text: 'Anda harus login untuk menambahkan produk ke daftar favorit.',
                });
                return; // Hentikan eksekusi jika pengguna belum login
            }
        }
    };

    const isProductFavorite = (productId) => {
        return favoriteProducts.some(item => item.product.id === productId);
    };

    useEffect(() => setWishlist(favoriteProducts), [favoriteProducts]);

    useEffect(() => {
        // Memanggil fungsi refreshFavoriteProducts saat komponen dimuat untuk pertama kali
        refreshFavoriteProducts();

        const fetchData = async () => {
            const data = await product_data();
            setProducts(data.rows);
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        };
        fetchData();
    }, []);

    return (
        <div className="main-product bg-white">
            <div className={`main-product bg-white ${viewType === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4' : ''}`}>
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
                        <CardProduct
                            key={index}
                            product={product}
                            isProductFavorite={isProductFavorite}
                            toggleFavorite={toggleFavorite}
                            viewType={viewType}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default MainProduct;
