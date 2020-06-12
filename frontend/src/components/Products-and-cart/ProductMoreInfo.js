import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

export const ProductMoreInfo = () => {

useEffect(() => {
  fetch(`http://localhost:8080/${product._id}`)
  .then((res) => res.json())
  .then((json) => {
    setProducts(json)
  })
}, [products._id])

  return (
    <section>
      <p>{product._id} </p>
      <img src={product.img}></img>
    </section>
  )
}