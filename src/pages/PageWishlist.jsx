import React from 'react';
import TopAppBar from '../components/TopAppBar';
import MidleBar from '../components/MidleBar';
import HeaderWrapaper from '../components/HeaderWrapaper';
import Footer from '../components/Footer';
import BreadCrumb from '../components/BreadCrumb';
import WishlistTop from '../components/whislist/WishlistTop';
import WishlistMain from '../components/whislist/WishlistMain';

function PageWhislist() {
  const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'Whislist', url: '/wishlist' },
  ];
  return (
    <>
    <TopAppBar />
    <MidleBar />
    <HeaderWrapaper />
    <BreadCrumb items={breadcrumbItems} />
    <WishlistTop />
    <WishlistMain />

    <Footer />
    </>

  );
}

export default PageWhislist;
