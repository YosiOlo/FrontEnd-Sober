import React from 'react';
import LoginForm from '../components/login/LoginForm';
import BreadCrumb from '../components/BreadCrumb';

function PageLogin() {
  const breadcrumbItems = [
    { label: 'Login', url: '/login' },
  ];
  return (
    <><BreadCrumb items={breadcrumbItems} /><LoginForm /></>
  );
}

export default PageLogin;
