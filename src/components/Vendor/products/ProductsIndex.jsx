import React from 'react'
import ProductsTable from './ProductsTable'
import TopBar from '../TopBar/Topbar'

function ProductIndex() {
  return (
    <div className='bg-[#f9f9f9]'>
        <TopBar title="Products"/>
        <div className="p-4">
        <ProductsTable/>

        </div>
    </div>
  )
}

export default ProductIndex