import React , { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'


export const ConfirmationPage = (  ) => {
  const userID = useSelector((state) => (state.user.id))
  const accessToken = useSelector((state) => (state.user.accessToken))
  const [user, setUser] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8080/users/${userID}`,
    {
      headers:{ 
        "Content-Type": "application/json", 
        Authorization: accessToken
      }
    }).then((res) => res.json()) 
      .then((json) => {
        console.log('User profile:', json)
        console.log('userID', userID)
        setUser(json)
        console.log('user', user)
      }) 
    }, [userID]
    )

  //console.log(user)
  return (
    <section className='confirmation-container'>
      <h2 className='confirmation-title'>Thank you for your order</h2>
      <p>Good news, {user.firstName}! A shipment from COMPANY is headed your way.  </p>  
      <div className='shipping-address'>
        <h4>Shipping address</h4>
        <p> {user.firstName} {user.lastName} </p>
        <p> {user.address} </p>
        <p> {user.zipCode} {user.city} </p>
      </div>
    </section>
  )
}