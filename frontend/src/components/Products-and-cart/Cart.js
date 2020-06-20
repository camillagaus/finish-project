import React from 'react'
import { useSelector } from 'react-redux'
import { CartItem } from './CartItem'
import { useHistory } from 'react-router-dom'

export const Cart = () => {
  //we fetch products from our cart store with useSelector 
  const products = useSelector((state) => state.cart.items )
  // this return the items with a reduce function, it starts at zero, then you can do something with it eg price and quantity
  const totalPrice = useSelector((state) => (
    state.cart.items.reduce((total, item) => (total + (item.price * item.quantity)), 0)
  ))
const history = useHistory()
  const GoToCheckOut = () => {
    
    return (
      history.push('/checkout')
    )
  }
  return (
    <div className='cart'>
      <div className='grow'>
        <div className='total'>
          <div className='amount'>
            <i className="fa fa-shopping-cart"></i>
             {totalPrice} €
          </div>
        </div>
        <ul className='items'>
          {products.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </ul>
        <button onClick={GoToCheckOut} className='check-out-btn' >Check out</button>
      </div>
    </div>
  )
}