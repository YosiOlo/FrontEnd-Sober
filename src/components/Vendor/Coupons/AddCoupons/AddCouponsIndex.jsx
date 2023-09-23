import React from 'react'
import AddCoupons from './AddCoupons'
import SideCoupons from './SideCoupons'

function AddCouponsIndex() {
  return (
    <div className='flex gap-8 justify-center'>
        <AddCoupons/>
        <SideCoupons/>
    </div>
  )
}

export default AddCouponsIndex