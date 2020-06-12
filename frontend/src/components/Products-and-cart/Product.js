import React from 'react'
import { Link } from 'react-router-dom'


export const Product = ({ product }) => {

  return (
    <section className='product-page'>
      <article className='product'>
        <Link to={`/products/${product._id}`} >
        <img className='product-img' src={product.img} alt={product.altImg} ></img>
        
        <p className='product-name'>{product.name} <span className='product-price'>{product.price}{product.currency}</span></p>
        </Link>
        <button 
        type='button'
        disabled={product.inventory===0}
        onClick={() => { }}>
          Add to cart
        </button>
      </article>
    </section>
  )
}