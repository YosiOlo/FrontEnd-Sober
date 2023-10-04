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

export const authToken = getAuthToken();
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

export const logoutUser = () => {
  localStorage.removeItem("authToken");
  // Tambahkan logika lain yang diperlukan saat logout
};
export const registerUser = async (
  username,
  useremail,
  password,
  repassword,
  referralCode,
  selectedPackage
) => {
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
    console.log("Respon API:", response.data);
    return true; // Berhasil registrasi
  } catch (error) {
    console.error("Kesalahan Permintaan API:", error);
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
    console.error("Kesalahan Permintaan API:", error.response.data.message);
    return null;
  }
};

// ===================================Vendor================================

export const getOrderDashboard = async () => {
  const authToken = getAuthToken();
  try {
    const response = await axios.get(
      `${BASE_URL}/api/transaction/vendor/?limit=30`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response?.data.data.count;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};

export const getProductDashboard = async () => {
  const authToken = getAuthToken();
  try {
    const response = await axios.get(
      `${BASE_URL}/api/product/vendor/list?name&limit=5&search`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response?.data.data.count;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};

export const getOrders = async () => {
  const authToken = getAuthToken();
  try {
    const response = await axios.get(`${BASE_URL}/api/transaction/vendor/?limit=30`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response?.data.data.rows;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};

export const putOrders = async (orderId, updatedData) => {

  try {
    const response = await axios.put(
      `${BASE_URL}transaction/vendor/${orderId}`, updatedData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log("Transaction updated successfully:", response.data);
    return response?.data;
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error; 
  }

};


export const deleteOrders = async (rowId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/transaction/vendor/${rowId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    if (response.status === 200) {
      console.log("Success! Data deleted from API.");
      console.log("Response data:", response.data);
    } else {
      console.error("Failed to delete data from API. Status:", response.status);
    }
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};

export const getCoupons = async () => {
  const authToken = getAuthToken();
  try {
    const response = await axios.get(`${BASE_URL}/api/discount/vendor/list/`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response?.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};


export const deletCoupons = async (rowId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/discount/vendor/${rowId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (response.status === 200) {
      console.log("Response Data: ", response.data);
    }
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};

export const deletOrders = async (rowId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/transaction/vendor/${rowId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (response.status === 200) {
      console.log("Response Data: ", response.data);
    }
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};

export const getOrderReturns = async () => {
  const authToken = getAuthToken();
  try {
    const response = await axios.get(`${BASE_URL}/api/transaction/vendor/returns?page&limit`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response?.data.data.rows;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};


export const getProducts = async () => {
  const authToken = getAuthToken();
  try {
    const response = await axios.get(`${BASE_URL}/api/product/vendor/list?name&limit=5&search`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response?.data.data.rows;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};

export const getRevenue = async () => {
  const authToken = getAuthToken();
  try {
    const response = await axios.get(`${BASE_URL}/api/transaction/vendor/revenue`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response?.data.data.rows;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};

export const getReview = async () => {
  const authToken = getAuthToken();
  try {
    const response = await axios.get(`${BASE_URL}/api/review/vendor/list`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response?.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


export const getWithdrawals = async () => {
  const authToken = getAuthToken();
  try {
    const response = await axios.get(`${BASE_URL}/api/transaction/vendor/withdrawal`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response?.data.data.rows;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};

export const deleteWithdrawals = async (rowId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/transaction/vendor/withdrawal/${rowId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    if (response.status === 200) {
      console.log("Success! Data deleted from API.");
      console.log("Response data:", response.data);
    } else {
      console.error("Failed to delete data from API. Status:", response.status);
    }
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};

export const getVendorInfo = async () => {
  const authToken = getAuthToken();
  try {
    const response = await axios.get(`${BASE_URL}/api/users/vendor`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data.data;
  } catch (error) {}
};

export const getVendorHistory = async () => {
  const authToken = getAuthToken();
  try {
    const response = await axios.get(
      `${BASE_URL}/api/transaction/vendor/history`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data.data.rows;
  } catch (error) {}
};

export const putTax = async (updatedData) => {
  const authToken = getAuthToken();
  console.log('hi',updatedData)
  try {
    const response = await axios.put(
      `${BASE_URL}/api/users/vendor/tax`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error during API request:", error);
    throw error;
  }
};

export const putPayout = async (updatedData) => {
  const authToken = getAuthToken();
  console.log('hi',updatedData)
  try {
    const response = await axios.put(
      `${BASE_URL}/api/users/vendor/payment`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; 
  } catch (error) {
    console.error("Error during API request:", error);
    throw error; 
  }
};
// shopName,
//   email,
//   phoneNumber,
//   alamat,
//   country,
//   provinsi,
//   kota,
//   zipCode,
//   description,
//   content,
//   companyName,
//   kelurahan,
//   kecamatan,
//   noKtp,
//   ktp,logo,cover
export const putGeneralInformation = async (body) => {
  const authToken = getAuthToken();
  // const dataGeneral = {
  //   name: shopName,
  //   email: email,
  //   telepon: phoneNumber,
  //   address: alamat,
  //   country: country,
  //   state: provinsi,
  //   city: kota,
  //   postal_code: zipCode,
  //   description: description,
  //   content: content,
  //   company_name: companyName,
  //   kelurahan: kelurahan,
  //   kecamatan: kecamatan,
  //   idktp: noKtp,
  //   ktp: ktp,
  //   logo: logo,
  //   cover: cover,
  // };
  try {
    console.log("cek", body);
    const response = await axios.put(
      `${BASE_URL}/api/users/vendor/profile`,
      body,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (error) {}
};

export const checkToken = async () => {
  const authToken = getAuthToken();
  try {
    const response = await axios.get(`${BASE_URL}/api/auth/check`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response?.data.datas;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};






//https://kuro.asrofur.me/sober/api/users/wishlist
export const getWishlist = async () => {
  const authToken = getAuthToken();
  try {
    const response = await axios.get(`${BASE_URL}/api/users/wishlist`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      }
    });
    return response.data.data;
  } catch (error) {
    console.log('Kesalahan Permintan API:', error.response.data.message);

  }
};