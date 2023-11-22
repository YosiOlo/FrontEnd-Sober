import React from 'react';
import TopAppBar from '../components/TopAppBar';
import MidleBar from '../components/MidleBar';
import HeaderWrapaper from '../components/HeaderWrapaper';
import BreadCrumb from '../components/BreadCrumb';
import TopMembership from '../components/membership/TopMembership';
import SearchMembership from '../components/membership/SearchMembership';
import CardMembership from '../components/membership/CardMembership';
import Footer from '../components/Footer';



function PageMemberShip() {
  const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'Member Paket', url: '/members' },
  ];
  return (
    <>
    <TopAppBar />
    <MidleBar />
    <HeaderWrapaper />
    <BreadCrumb items={breadcrumbItems} />
    <TopMembership />
    <SearchMembership />
    <CardMembership />

    <Footer />
    </>

  );
}

export default PageMemberShip;
