// ApiConfig.jsx
import { Try } from '@mui/icons-material';
import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL_API;
// https://kuro.asrofur.me/sober/api/membership

// Fungsi untuk menyimpan token ke localStorage
export const setAuthToken = (token) => {
    localStorage.setItem('authToken', token);
  };
  
  // Fungsi untuk mendapatkan token dari localStorage
  export const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };    
 
  const authToken = getAuthToken();
export const memberShip = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/membership`);
        console.log('Respon API:', response.data); // Pindahkan ini ke atas return
        return response.data.datas;
    } catch (error) {
        console.error('Kesalahan Permintaan API:', error.response.data.message);
        return null;
    }
};
// ?page&limit&search=&orderby=etalase
// export const product = async (page, limit, search, orderby) => {
//     try {
//         const response = await axios.get(`${BASE_URL}/product?page=${page}&limit=${limit}&search=${search}&orderby=${orderby}`);
//         console.log('Respon API Product:', response.data); // Pindahkan ini ke atas return
//         return response.data.datas;
//     } catch (error) {
//         console.error('Kesalahan Permintaan API:', error.response.data.message);
//         return null;
//     }
// };
export const product_data = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/product?page=1&limit=72&search=&orderby=`);
        console.log('Respon API Product:', response.data); // Pindahkan ini ke atas return
        return response.data.data;
    } catch (error) {
        console.error('Kesalahan Permintaan API:', error.response.data.message);
        return null;
    }
};
function formatDate(datestring) {
    return new Date(datestring).toLocaleDateString("en-ID", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }
  export { formatDate };
  


export const loginUser = async (username, password, rememberMe) => {
    const data = {
        email: username,
        password: password,
        is_remember: rememberMe,
    };

    try {
        const response = await axios.post(`${BASE_URL}/api/auth/signin`, data);
        const { token } = response.data;
        // localStorage.setItem('authToken', token);
        setAuthToken(token);
        console.log('Respon API:', response.data);
        return true; // Berhasil login
    } catch (error) {
        console.error('Kesalahan Permintaan API:', error);
        return false; // Gagal login
    }
};


export const getOrders = async () => {
    const authToken = getAuthToken();
    try {
      const response = await axios.get(`${BASE_URL}/transaction/vendor/?limit=30`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      // Mengembalikan data respons untuk digunakan di komponen lain
      return response?.data.data.rows;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Melempar kembali kesalahan untuk penanganan lebih lanjut jika diperlukan
    }
  };

  export const getCoupons = async () => {
    const authToken = getAuthToken();
    try {
      const response = await axios.get(`${BASE_URL}/discount/vendor/list/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      // Mengembalikan data respons untuk digunakan di komponen lain
      return response?.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Melempar kembali kesalahan untuk penanganan lebih lanjut jika diperlukan
    }
  };
  
  
  export const deletCoupons = async (rowId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/discount/vendor/${rowId}`, {
            headers : {
                Authorization:`Bearer ${authToken}`,
            },
        });
        if (response.status === 200) {
            console.log("Response Data: ", response.data);
        }
    } catch (error) {
        console.error ("Error deleting data:", error);
    }
  };

  export const deletOrders = async (rowId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/transaction/vendor/${rowId}`, {
            headers : {
                Authorization:`Bearer ${authToken}`,
            },
        });
        if (response.status === 200) {
            console.log("Response Data: ", response.data);
        }
    } catch (error) {
        console.error ("Error deleting data:", error);
    }
  };

export const getOrderReturns = async () => {
    const authToken = getAuthToken();
    try {
      const response = await axios.get(`${BASE_URL}/transaction/vendor/returns?page&limit`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      // Mengembalikan data respons untuk digunakan di komponen lain
      return response?.data.data.rows;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Melempar kembali kesalahan untuk penanganan lebih lanjut jika diperlukan
    }
  };
  

export const getProducts = async () => {
    const authToken = getAuthToken();
    try {
      const response = await axios.get(`${BASE_URL}/product/vendor/list?name&limit=5&search`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      // Mengembalikan data respons untuk digunakan di komponen lain
      return response?.data.data.rows;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Melempar kembali kesalahan untuk penanganan lebih lanjut jika diperlukan
    }
  };
  
export const getRevenue = async () => {
    const authToken = getAuthToken();
    try {
      const response = await axios.get(`${BASE_URL}/transaction/vendor/revenue`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      // Mengembalikan data respons untuk digunakan di komponen lain
      return response?.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Melempar kembali kesalahan untuk penanganan lebih lanjut jika diperlukan
    }
  };
  
export const getReview = async () => {
    const authToken = getAuthToken();
    try {
      const response = await axios.get(`${BASE_URL}/review/vendor/list`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      // Mengembalikan data respons untuk digunakan di komponen lain
      return response?.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Melempar kembali kesalahan untuk penanganan lebih lanjut jika diperlukan
    }
  };
  
  
export const getWithdrawals = async () => {
    const authToken = getAuthToken();
    try {
      const response = await axios.get(`${BASE_URL}/transaction/vendor/withdrawal`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      // Mengembalikan data respons untuk digunakan di komponen lain
      return response?.data.data.rows;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Melempar kembali kesalahan untuk penanganan lebih lanjut jika diperlukan
    }
  };
  
  
export const checkToken = async () => {
    const authToken = getAuthToken();
    try {
      const response = await axios.get(`${BASE_URL}/auth/check`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      // Mengembalikan data respons untuk digunakan di komponen lain
      return response?.data.datas;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Melempar kembali kesalahan untuk penanganan lebih lanjut jika diperlukan
    }
  };

  export const getVendorInfo= async () => {
    const authToken = getAuthToken();
    try {
      const response = await axios.get(`${BASE_URL}/users/vendor`,{
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
      return response.data.data;
    } catch (error) {
      
    }
  };
  export const getVendorHistory= async () => {
    const authToken = getAuthToken();
    try {
      const response = await axios.get(`${BASE_URL}/transaction/vendor/history`,{
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
      return response.data.data;
    } catch (error) {
      
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
        const response = await axios.post(`${BASE_URL}/api/auth/signup`, data);
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
            const response = await axios.get(`${BASE_URL}/api/auth/check`, {
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
