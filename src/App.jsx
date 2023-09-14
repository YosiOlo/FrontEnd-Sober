import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import TopAppBar from './components/TopAppBar';
import MidleBar from './components/MidleBar';
import HeaderWrapaper from './components/HeaderWrapaper';
import PageDashboard from './pages/PageDashboard';

import PageAbout from './pages/PageAbout';
import PageLogin from './pages/PageLogin';
import PageRegister from './pages/PageRegister';
import PageContact from './pages/PageContact';
import PageProduct from './pages/PageProducts';
// import MainContent from './components/MainContent';
import Footer from './components/Footer';


function App() {
  
  return (
    <div>
      <TopAppBar />
      <MidleBar />
      <HeaderWrapaper />


      {/* <MainContent/> */}


      <Routes>
        <Route index element={<PageDashboard />} />
        <Route path="/about" element={<PageAbout />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="/register" element={<PageRegister />} />

        <Route path="/contact" element={<PageContact />} />
        <Route path="/product" element={<PageProduct />} />


        {/* Tambahkan rute lainnya di sini jika diperlukan */}
      </Routes>
      <Footer />

    </div>
  );
}

export default App;
