import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logout } from '../../reducer/user'


export const UserHomePage = () => {
  const accessToken = useSelector((state) => (state.user.accessToken))
  const userID = useSelector((state) => (state.user.id))
  const isAuthorized = useSelector((state) => state.user.isAuthorized)
  const [user, setUser] = useState([])
  const history = useHistory()
  const dispatch = useDispatch()


  const handleLogout = event => {
    event.preventDefault()
    dispatch(logout())
    history.push('/')
  }
 
  useEffect(() => {
    if (!accessToken) {
      history.push('/sign-in')
    }
  })


  useEffect(() => {
    fetch(`https://finish-project-camilla.herokuapp.com/users/${userID}`,
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

     
  return (

    <div className='user-container'>
      {isAuthorized === true ? 
      <div className='user-info'>
        <h3>About you</h3>
        <p></p>
        <p><span>Name:</span> {user.firstName} {user.lastName}</p>
        <p><span>Email:</span> {user.email} </p>
        <p><span>Address:</span> {user.address} </p>
        <p><span>Zip and City:</span> {user.zipCode} {user.city} </p>
        <p><span>Phone:</span> {user.phoneNumber} </p> 
        <input
          type='submit'
          value='Log out'
          className='button-user-info'
          onClick={handleLogout}>
        </input>
      </div>
      : <p className='sign-in-to-see-info'>You have to be <a className='smaller-link' href='/sign-in'>signed in</a>.</p>}
    </div> 
    
  )
}