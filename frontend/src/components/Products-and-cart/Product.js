import React from 'react'


export const Product = ({ product }) => {

  return (
    <article className='product'>
      <span className='prod-name'>{product.name}</span>
      <p>{product.price}{product.currency}</p>

      <button 
      type='button'
      disabled={product.inventory===0}
      onClick={() => { }}>
        Add to cart
      </button>
    </article>
  )
}