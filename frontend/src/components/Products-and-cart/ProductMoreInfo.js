import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { cart } from '../../reducer/cart'


export const ProductMoreInfo = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  
  
 const [ productInfo, setProductInfo ] = useState('')
  fetch(`http://localhost:8080/products/${id}`)
  .then((res) => res.json())
  .then((json) => {
    setProductInfo(json)
  })

  return (
    <section className='more-info'>
      <h2 className='page-title'>SHOP</h2>
      <div className='more-info-desktop'>
        <img className='img-more-info' src={productInfo.img} alt={productInfo.altImg}></img>
        <div className='text-more-info'>
          <h3 className='product-more-info'>{productInfo.name} </h3>
          <h4 className='price-more-info'> {productInfo.price} {productInfo.currency} </h4>
          <p className='description-more-info'>{productInfo.description}</p>
          <p>Height: {productInfo.height} {productInfo.measurement} </p>
          <p>Width: {productInfo.width} {productInfo.measurement} </p>
          <button
            className='button-more-info' 
            type='button'
            disabled={productInfo.inventory===0}
            onClick={() => dispatch(cart.actions.addItem(productInfo))}>
              Add to cart
            </button>
          </div>
        </div>
    </section>
  )
}