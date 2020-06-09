import React from 'react'
import { CartItem } from './CartItem'

export const Cart = () => {
  const products = []

  const totalPrice = 0

  return (
    <div className='cart'>
      <div className='total'>
        <span className='emoji' role='img' aria-label='cart'>🛒</span>
        <div className='amount'>Totalt: {totalPrice}:-</div>
      </div>
      <ul className='items'>
        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </ul>
    </div>
  )
}