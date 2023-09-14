// ApiConfig.jsx
import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL_API;
// https://kuro.asrofur.me/sober/api/membership
export const memberShip = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/membership`);
        console.log('Respon API:', response.data); // Pindahkan ini ke atas return
        return response.data.datas;
    } catch (error) {
        console.error('Kesalahan Permintaan API:', error.response.data.message);
        return null;
    }
};


export const loginUser = async (username, password, rememberMe) => {
    const data = {
        email: username,
        password: password,
        is_remember: rememberMe,
    };

    try {
        const response = await axios.post(`${BASE_URL}/auth/signin`, data);
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        console.log('Respon API:', response.data);
        return true; // Berhasil login
    } catch (error) {
        console.error('Kesalahan Permintaan API:', error);
        return false; // Gagal login
    }
};
export const logoutUser = () => {
    localStorage.removeItem('authToken');
    // Tambahkan logika lain yang diperlukan saat logout
};
export const registerUser = async (username, useremail, password, repassword, referralCode, selectedPackage) => {
    const data = {
        nama: username,
        email: useremail,
        password: password,
        repassword: repassword,
        referral: referralCode,
        tier: selectedPackage,
    };

    try {
        const response = await axios.post(`${BASE_URL}/auth/signup`, data);
        console.log('Respon API:', response.data);
        return true; // Berhasil registrasi
    } catch (error) {
        console.error('Kesalahan Permintaan API:', error);
        return false; // Gagal registrasi
    }
};

export const fetchUserData = async (authToken) => {
    try {
        if (authToken) {
            const response = await axios.get(`${BASE_URL}/auth/check`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            return response.data.datas;
        }
        return null;
    } catch (error) {
        console.error('Kesalahan Permintaan API:', error.response.data.message);
        return null;
    }
};
