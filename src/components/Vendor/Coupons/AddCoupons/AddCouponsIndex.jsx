import React from 'react'
import AddCoupons from './AddCoupons'
import SideCoupons from './SideCoupons'
import TopBar from '../../TopBar/Topbar'

function AddCouponsIndex() {
  return (
    <div className='p-4'>
      <TopBar title={"Add Coupons"}/>
      <div className='flex gap-8 justify-center'>
        <AddCoupons/>
    </div>
    </div>
  )
}

export default AddCouponsIndex