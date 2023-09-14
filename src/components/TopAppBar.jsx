import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserData, logoutUser, memberShip } from '../utils/ApiConfig'; // Mengimpor fetchUserData dan logoutUser dari ApiConfig.jsx
import Swal from 'sweetalert2';


function TopAppBar() {
  const authToken = localStorage.getItem('authToken');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authToken) {
      setIsLoading(true);
      fetchUserData(authToken)
        .then((userData) => {
          if (userData) {
            const { name } = userData;
            setName(name);
            localStorage.setItem('nama_pengguna', name);
          }
        })
        .catch((error) => {
          console.error('Kesalahan Permintaan API:', error.response.data.message);
        })
        .finally(() => setIsLoading(false));
    }
  }, [authToken]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await memberShip();
      // ... kode lain untuk mengolah data ...
    };
    fetchData();
  }, []);


  const confirmLogout = () => {
    Swal.fire({
      title: 'Anda yakin ingin keluar?',
      text: 'Anda akan keluar dari akun Anda.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Keluar',
      cancelButtonText: 'Tidak',
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        // Panggil fungsi logoutUser di sini jika pengguna menekan "Ya, Keluar"
        logoutUser();
        // Kemudian, arahkan pengguna ke halaman login atau tindakan logout lainnya
        // Misalnya:
        window.location.href = '/login';
      }
    });
  };


  return (
    <div className="responsive md:block hidden">
      <div className="flex justify-between items-center p-2 bg-gray-100 text-black text-sm border-b border-gray-300">
        <div className="space-x-4 flex items-center">
          <Link to="/about" className="hover:text-blue-600">Tentang Kami</Link>
          <span className="border-l border-gray-400 h-3 my-1 mx-2"></span>
          <Link to="/favorite-list" className="hover:text-blue-600">Daftar Favorit</Link>
        </div>
        <div className="space-x-4 flex items-center">
          <select className="bg-transparent text-black hover:text-blue-600">
            <option value="id">Bahasa: Indonesia</option>
            <option value="en">Bahasa: Inggris</option>
          </select>
          <select className="bg-transparent text-black hover:text-blue-600">
            <option value="idr">Mata Uang: IDR</option>
            <option value="usd">Mata Uang: USD</option>
          </select>
          <span className="border-l border-gray-400 h-3 my-1 mx-2"></span>

          {/* Menampilkan nama pengguna dan tombol logout */}
          {isLoading ? (
            <span className="text-gray-500">Memuat...</span>
          ) : (
            name ? (
              <div className="user">
                <span className="hover:text-blue-600">{name}</span>
                <span
                  className="border-l border-gray-400 h-3 my-1 mx-2 cursor-pointer hover:text-blue-600"
                  onClick={confirmLogout}
                >
                  Keluar
                </span>
              </div>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-600">Masuk</Link>
                <span className="border-l border-gray-400 h-3 my-1 mx-2"></span>
                <Link to="/register" className="hover:text-blue-600">Daftar</Link>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default TopAppBar;
