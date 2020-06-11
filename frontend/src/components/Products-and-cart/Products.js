import React, { useEffect } from 'react'
import { Product } from './Product'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../../reducer/products'


export const Products = () => {
  

  const dispatch = useDispatch()
  useEffect(() => {
    console.log("useEffect")
    dispatch(fetchProducts())
  }, [dispatch])

  const allProducts = useSelector((state) => state.products.all)

  return (
    <div className='products'>
      {allProducts.map((product) => (
        <Product key={product._id} product={product.name} />
      ))}

    </div>
  )
}