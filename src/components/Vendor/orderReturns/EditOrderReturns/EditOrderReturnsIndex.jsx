import React from 'react'
import OrderInformation from './OrderInformation';
import OrderStatus from './OrderStatus';
import Customer from './Customer';


function Index() {
    
  return (
    <div>
      <div className="flex justify-center items-center gap-5 sm:flex-wrap md:flex-wrap lg:flex-wrap">
        <div className="dataOrder">
      <OrderInformation />
      <OrderStatus/>
        </div>
        <Customer/>
      </div>
    </div>
  )
}

export default Index