import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { BASE_URL } from './ApiConfig';

function Component() {
    const authToken = localStorage.getItem('authToken');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (authToken) {
            setIsLoading(true);
            axios.get(`${BASE_URL}/auth/check`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
                .then((response) => {
                    const { name } = response.data.datas;
                    setName(name);
                    localStorage.setItem('nama_pengguna', name);
                    console.log('Nama pengguna:', name);

                    // Tampilkan hasil respon di konsol
                    console.log('Hasil Respon:', response.data);
                })
                .catch((error) => {
                    console.error('Kesalahan Permintaan API:', error.response.data.message);
                })
                .finally(() => setIsLoading(false))
        }
    }, [authToken]);

    const renderLoggedInUser = () => {
        return (
            <>
                {isLoading ? (
                    <span className="text-gray-500">Memuat...</span>
                ) : (
                    <>
                        {name ? (
                            <span className="hover:text-blue-600">{name}</span>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-blue-600">Masuk</Link>
                                <span className="border-l border-gray-400 h-3 my-1 mx-2"></span>
                                <Link to="/register" className="hover:text-blue-600">Daftar</Link>
                            </>
                        )}
                    </>
                )
                }
            </>
        );
    };

    return (
        <div>
            {renderLoggedInUser()}
        </div>
    );
}

export default Component;
