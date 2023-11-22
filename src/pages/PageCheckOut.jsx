import React from 'react';
import TopAppBar from '../components/TopAppBar';
import MidleBar from '../components/MidleBar';
import HeaderWrapaper from '../components/HeaderWrapaper';
import Footer from '../components/Footer';
import CheckOut from '../components/checkout/checkOut';
import BreadCrumb from '../components/BreadCrumb';

function PageProductCheckout() {
  const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'Checkout', url: '/checkout' },
  ];
  return (
    <>
    <TopAppBar />
    <MidleBar />
    <HeaderWrapaper />
    <BreadCrumb items={breadcrumbItems} />
    <CheckOut />
    <Footer />
    </>

  );
}

export default PageProductCheckout;
