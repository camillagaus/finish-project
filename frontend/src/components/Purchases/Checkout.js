import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { user } from '../../reducer/user'
import { cart } from '../../reducer/cart'
import { CartItem } from '../Products-and-cart/CartItem'

export const Checkout = () => {
 const accessToken = useSelector((state) => state.user.accessToken)
 const userID = useSelector((state) => (state.user.id))
 const [user, setUser] = useState([])
 const dispatch = useDispatch()
 const products = useSelector((state) => state.cart.items )
 const totalPrice = useSelector((state) => (
  state.cart.items.reduce((total, item) => (total + (item.price * item.quantity)), 0)
))

  // useEffect(() => {
  //   fetch(`http://localhost:8080/users/${userID}`,
  //   {
  //     headers:{ "Content-Type": "application/json", Authorization: accessToken}
  //   })
        
  //     .then((res) => res.json()) 
  //     .then((json) => {
  //       console.log('User profile:', json)
       
  //       console.log('userID', userID)
  //       // dispatch(user.actions.userId(userID))
  //       // dispatch(user.actions.accessToken(accessToken))
        
  //       setUser(json)
  //       console.log('user', user)
  //     }) 
  //   }, [userID]
  // )
 
  return (
    <section className='check-out-container'>
      
      {accessToken ? 
        products.map((product) => (
        <div className='check-out-item'> 
          <img className='check-out-img' src= {product.img} alt= {product.description} ></img> 
          <div className='check-out-details'> 
            <span className='row'>
              
              <p>{product.name}</p> 
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
        
        :
         <p>tyvärr har du inte tillgång till sidan</p>}
         
         <p className='total-check-out'> <span>Total Price: </span> {totalPrice} € </p>
    </section>
  )
}