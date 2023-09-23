import React from 'react';
import TopAppBar from '../components/TopAppBar';
import MidleBar from '../components/MidleBar';
import HeaderWrapaper from '../components/HeaderWrapaper';
import Footer from '../components/Footer';
import About from '../components/about/About';
import BreadCrumb from '../components/BreadCrumb';

function PageAbout() {
  const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'Tentang Kami', url: '/about' },
  ];
  return (
    <>
    <TopAppBar />
    <MidleBar />
    <HeaderWrapaper />
    <BreadCrumb items={breadcrumbItems} />
    <About />
    <Footer />
    </>

  );
}

export default PageAbout;
