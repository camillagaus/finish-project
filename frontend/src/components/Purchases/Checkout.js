import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { cart } from '../../reducer/cart'
import { UserHomePage } from 'components/User-page/UserHomepage'





export const Checkout = () => {
  const accessToken = useSelector((state) => state.user.accessToken)
  const userID = useSelector((state) => (state.user.id))
  const products = useSelector((state) => state.cart.items )
  const name = useSelector((state) => state.cart.items.name)
  const isAuthorized = useSelector((state) => state.user.isAuthorized)
  const totalPrice = useSelector((state) => (
   state.cart.items.reduce((total, item) => (total + (item.price * item.quantity)), 0)
 ))
 const removeAllProducts = useSelector((state) => state.cart.removeAll)
 const dispatch = useDispatch()
 const history = useHistory()
 
  const submitOrder =  event  => {
    event.preventDefault()
      fetch('http://localhost:8080/orders', {
    method: 'POST',
    body: JSON.stringify({ 
      userId: userID, 
      products: products, 
      name: name, 
      totalPrice : totalPrice 
    }),
    headers: { 
      "Content-Type": "application/json", 
      Authorization: accessToken
    }
    }).then(() => {
      dispatch(cart.actions.removeAll(removeAllProducts))
      console.log(products)
      history.push('/confirmation')
    })
}

  return (
    <section className='check-out-container'>
       {isAuthorized === true ? 
        products.map((product) => (
        <div className='check-out-item'> 
          <img className='check-out-img' src= {product.img} alt= {product.description} ></img> 
          <div className='check-out-details'> 
            <span className='row'>   
              <p>{product.name} </p> 
              <p>{product.price} {product.currency}</p>  
            </span>
            <span className='add-remove'>
              <p className='quantity-check-out'>{product.quantity} x </p>
              <span>
                <button className='button-add-remove-checkout' type='button' onClick={() => dispatch(cart.actions.removeItem(product))}>-</button>
                <button className='button-add-remove-checkout' type='button' onClick={() => dispatch(cart.actions.addItem(product))}>+</button>
              </span> 
            </span> 
          </div> 
        </div>
        )) 
      : <p>You have to sign in to be able to purschase something. Please go to Sign In. </p> } 
        <p className='total-check-out'> <span>Total Price: </span> {totalPrice} € </p>
        {isAuthorized === true ? 
        <>
        <input 
          type='button'
          value='order now'
          className='button-order-now'
          onClick= {submitOrder} >
        </input>

        <div className='check-out-info'>
          <p>Check our details before you order.</p>
          <UserHomePage /> 
      </div> </> : <> </> }
    </section>
  )
}