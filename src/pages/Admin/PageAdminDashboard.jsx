import React from 'react';
import TopAppBar from '../../components/TopAppBar';
import MidleBar from '../../components/MidleBar';
import HeaderWrapaper from '../../components/HeaderWrapaper';
import Footer from '../../components/Footer';
import BreadCrumb from '../../components/BreadCrumb';

function PageAdminDashboard() {
  const breadcrumbItems = [
    { label: 'Home', url: '/' },
    { label: 'Admin', url: '/admin' },
  ];
  return (
    <>
    <TopAppBar />
    <MidleBar />
    <HeaderWrapaper />
    <BreadCrumb items={breadcrumbItems} />
    <Footer />
    </>

  );
}

export default PageAdminDashboard;
