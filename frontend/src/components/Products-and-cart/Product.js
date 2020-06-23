import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { cart } from '../../reducer/cart'



export const Product = ({ product }) => {
 
  const dispatch = useDispatch()


  return (
    
    <section className='product-page'>
    
      <article className='product'>
        <Link to={`/products/${product._id}`} >
        <img className='product-img' src={product.img} alt={product.altImg} ></img>
        
        <p className='product-name'>{product.name} <span className='product-price'>{product.price}{product.currency}</span></p>
        </Link>
        <button 
        className='button-products'
        type='button'
        disabled={product.inventory===0}
        onClick={() => dispatch(cart.actions.addItem(product))}>
          Add to cart
        </button>
        
      </article>
    </section>
  )
}