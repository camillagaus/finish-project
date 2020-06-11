import React from 'react'
import { Product } from './Product'
import { useSelector, useDispatch } from 'react-redux'



export const Products = () => {
  const dispatch = useDispatch()
  const allProducts = useSelector((store) => (store.products.all))

  return (
    <div className='products'>
      {allProducts.map((product) => (
        <Product key={product.id} product={product} />
      ))}

    </div>
  )
}