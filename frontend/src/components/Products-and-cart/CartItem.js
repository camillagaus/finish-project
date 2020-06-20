import React from 'react' 
import { useDispatch } from 'react-redux'
import { cart } from '../../reducer/cart'

 export const CartItem = ({ product }) => {
   const dispatch = useDispatch()
   return (
  <li className='cart-item'> 
    <div className='info'>
      <span className='prod-name'>{product.name}</span>
      <span className='quantity'> <span className='small-x'>x</span> {product.quantity} </span>
    </div>
    <div className='info'>
      <span className='sum'>{product.price * product.quantity} {product.currency} </span>
      <span className='actions'>
        <button className='button-add-remove' type='button' onClick={() => dispatch(cart.actions.removeItem(product))}>-</button>
        <button className='button-add-remove' type='button' onClick={() => dispatch(cart.actions.addItem(product))}>+</button>
      </span>
    </div>
  </li>
   )}