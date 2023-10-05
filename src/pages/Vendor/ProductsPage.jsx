import React from 'react';
import TopBar from '../../components/Vendor/TopBar/Topbar';
import {HiOutlineShoppingBag} from 'react-icons/hi'
import ProductIndex from '../../components/Vendor/products/ProductsIndex';
function ProductsPage() {
  return (
    <div className='text-black'>
      <ProductIndex/>
    </div>
  )
}

export default ProductsPage