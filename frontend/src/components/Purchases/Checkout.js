import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cart, submitOrder } from '../../reducer/cart'
import { UserHomePage } from 'components/User-page/UserHomepage'
import { useHistory } from "react-router-dom";
import { singleProduct } from '../../reducer/products'



export const Checkout = () => {
 const accessToken = useSelector((state) => state.user.accessToken)
 const userID = useSelector((state) => (state.user.id))
 const [user, setUser] = useState([])
 const dispatch = useDispatch()
 const products = useSelector((state) => state.cart.items )
 const totalPrice = useSelector((state) => (
  state.cart.items.reduce((total, item) => (total + (item.price * item.quantity)), 0)
))
const history = useHistory()

const id = useSelector((state) => state.cart.items.id)

const name= useSelector((state) => state.cart.items.name)



const submitOrder =  event  => {
  event.preventDefault()
fetch('http://localhost:8080/orders', {
    method: 'POST',
    body: JSON.stringify({ userId: userID, products: products, name: name, totalPrice : totalPrice }),
    headers: { "Content-Type": "application/json", Authorization: accessToken
    }
    }).then(() => {
      
      dispatch(cart.actions.removeAll)
      console.log(products)
    })
}

 
  return (
    <section className='check-out-container'>
      
      {accessToken ? 
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
        
        :
         <p>tyvärr har du inte tillgång till sidan</p>}
         
         <p className='total-check-out'> <span>Total Price: </span> {totalPrice} € </p>

         <input 
           type='button'
           value='order now'
           className='button-order-now'
           onClick= {submitOrder} >
         </input>

         <div className='check-out-info'>
           <p>Check our details before you order.</p>
           <UserHomePage />
         </div>
         
    </section>
  )
}