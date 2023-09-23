import React from 'react';
import TopAppBar from '../components/TopAppBar';
import MidleBar from '../components/MidleBar';
import HeaderWrapaper from '../components/HeaderWrapaper';
import Footer from '../components/Footer';
import RegisterForm from '../components/dashboard/register/RegisterForm';
import BreadCrumb from '../components/BreadCrumb';

function PageRegister() {
  const breadcrumbItems = [
    { label: 'Register', url: '/register' },
  ];
  return (
    <>
    <TopAppBar />
    <MidleBar />
    <HeaderWrapaper />
    <BreadCrumb items={breadcrumbItems} />
    <RegisterForm />
    <Footer />
    </>
  );
}

export default PageRegister;
