import React from 'react';
import TopAppBar from '../components/TopAppBar';
import MidleBar from '../components/MidleBar';
import HeaderWrapaper from '../components/HeaderWrapaper';
import Footer from '../components/Footer';
import CardMembership from '../components/membership/CardMembership';
import BreadCrumb from '../components/BreadCrumb';

function PageMemberShip() {
  const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'Tentang Kami', url: '/members' },
  ];
  return (
    <>
    <TopAppBar />
    <MidleBar />
    <HeaderWrapaper />
    <BreadCrumb items={breadcrumbItems} />
    <CardMembership />

    <Footer />
    </>

  );
}

export default PageMemberShip;
