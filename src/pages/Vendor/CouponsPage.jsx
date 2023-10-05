import React from 'react';
import TopBar from '../../components/Vendor/TopBar/Topbar';
import TableCoupons from '../../components/Vendor/Coupons/CouponsTable';

function CouponsPage() {
  return (
    <div className='text-black p-4'>
      <TopBar title="Coupons"/>
      <TableCoupons/>
    </div>
  )
}

export default CouponsPage