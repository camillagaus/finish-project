import React from 'react' 

export const CartItem = ({ product }) => {
  <li>
    <span className='prod-name'>{product.title}</span>
    <div className='info'>
      <span className='quantity'>x{product.quantity}</span>
      <span className='sum'>{product.price * product.quantity}:-</span>
    </div>
    <span className='actions'>
      <button type='button' onClick={() => { }}>-</button>
      <button type='button' onClick={() => { }}>+</button>
    </span>
  </li>
}