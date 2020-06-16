import React from 'react' 
import { useDispatch } from 'react-redux'
import { cart } from '../../reducer/cart'

 export const CartItem = ({ product }) => {
   const dispatch = useDispatch()
   return (
  <li>
    <span className='prod-name'>{product.name}</span>
    <div className='info'>
      <span className='quantity'>x{product.quantity} </span>
      <span className='sum'>{product.price * product.quantity} {product.currency} </span>
    </div>
    <span className='actions'>
      <button type='button' onClick={() => dispatch(cart.actions.removeItem(product))}>-</button>
      <button type='button' onClick={() => dispatch(cart.actions.addItem(product))}>+</button>
    </span>
  </li>
   )}