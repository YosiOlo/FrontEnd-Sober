import React from 'react';
import TopBar from '../../components/Vendor/TopBar/Topbar';
import OrderReturnsTable from '../../components/Vendor/orderReturns/OrderReturnsTable';

function OrderReturnsPage() {
  return (
    <div className='bg-[#f9f9f9]'>
      <TopBar title="OrderReturns "/>
      <div className="p-5">
        
      <OrderReturnsTable />
      </div>
    </div>
  )
}

export default OrderReturnsPage