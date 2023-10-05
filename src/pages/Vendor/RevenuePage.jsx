import React from 'react';
import TopBar from '../../components/Vendor/TopBar/Topbar';
import RevenueTable from '../../components/Vendor/revenue/RevenueTable';

function RevenuePage() {
  return (
    <div className='bg-[#f9f9f9] text-black'>
      <TopBar title="Revenue"/>
      <div className='p-5 '>
      <RevenueTable/>

      </div>
    </div>
  )
}

export default RevenuePage