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
      <div className='thank-you'></div>
        <div className='confirmation-text'>
          <p>Good news, {user.firstName}! A shipment from <span className='kam'>KAM</span> is headed your way.  </p>  
          <p>Share <span className='kam'>your</span> home with us! #KAMdesign</p> 
        </div>
        <div className='shipping-address'>
          <h4>Shipping address</h4>
          <p> {user.firstName} {user.lastName} </p>
          <p> {user.address} </p>
          <p> {user.zipCode} {user.city} </p>
        </div>
    </section>
  )
}