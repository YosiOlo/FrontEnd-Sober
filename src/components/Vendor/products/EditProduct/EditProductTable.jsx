import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getProductsById } from '../../../../utils/ApiConfig';

function EditProductTable() {
  const { id } = useParams();
  const [products,setProducts] = useState([]);

  useEffect(() => {
    getProductsById(id).then((data) => {
      setProducts([data]);
      console.log("-----------------------------"+[data]);
    });
  }, [id]);
  return (
    <div>EditProductsTable</div>
  )
}

export default EditProductTable