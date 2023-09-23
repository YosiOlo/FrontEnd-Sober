import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import PageDashboard from './pages/PageDashboard';

import PageAbout from './pages/PageAbout';
import PageLogin from './pages/PageLogin';
import PageRegister from './pages/PageRegister';
import PageContact from './pages/PageContact';
import PageProduct from './pages/PageProducts';



function App() {
  
  return (
    <div>
      <Routes>
        <Route index element={<PageDashboard />} />
        <Route path="/about" element={<PageAbout />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="/register" element={<PageRegister />} />

        <Route path="/contact" element={<PageContact />} />
        <Route path="/product" element={<PageProduct />} />


        {/* Tambahkan rute lainnya di sini jika diperlukan */}
      </Routes>
    </div>
  );
}

export default App;
