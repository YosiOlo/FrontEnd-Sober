import React from 'react';
import RegisterForm from '../components/dashboard/register/RegisterForm';
import BreadCrumb from '../components/Breadcrumb';

function PageRegister() {
  const breadcrumbItems = [
    { label: 'Register', url: '/register' },
  ];
  return (
    <><BreadCrumb items={breadcrumbItems} /><RegisterForm /></>
  );
}

export default PageRegister;
