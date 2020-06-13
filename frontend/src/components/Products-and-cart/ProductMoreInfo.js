import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { products, fetchProducts, fetchProductInfo, singleProduct } from '../../reducer/products'
import { useDispatch, useSelector } from 'react-redux'

export const ProductMoreInfo = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  
  

 const [ productInfo, setProductInfo ] = useState('')
  fetch(`http://localhost:8080/products/${id}`)
  .then((res) => res.json())
  .then((json) => {
    setProductInfo(json)
  })

  
  
  console.log(id);
  

  return (
    <section>
     
      <h3>{productInfo.name} </h3>
      <p> info: {productInfo.description}</p>
      <img src={productInfo.img} alt={productInfo.altImg}></img>
      <h4> {productInfo.price} {productInfo.currency} </h4>
    </section>
  )
}