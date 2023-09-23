import React from 'react';
import TopAppBar from '../components/TopAppBar';
import MidleBar from '../components/MidleBar';
import HeaderWrapaper from '../components/HeaderWrapaper';
import Footer from '../components/Footer';
import LoginForm from '../components/login/LoginForm';
import BreadCrumb from '../components/BreadCrumb';

function PageLogin() {
  const breadcrumbItems = [
    { label: 'Login', url: '/login' },
  ];
  return (
    <>
    <TopAppBar />
    <MidleBar />
    <HeaderWrapaper />
    <BreadCrumb items={breadcrumbItems} />
    <LoginForm />
    <Footer />
    </>
  );
}

export default PageLogin;
