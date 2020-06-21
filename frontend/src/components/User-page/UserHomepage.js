import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../reducer/user'


export const UserHomePage = () => {
  const accessToken = useSelector((state) => (state.user.accessToken))
  const isAuthorized = useSelector((state) => state.user.isAuthorized)
  const userID = useSelector((state) => (state.user.id))
  const [user, setUser] = useState([])
  const history = useHistory()
  
  const dispatch = useDispatch()
  

//   const handleLogOut = () => { 
//     dispatch(user.actions.saveAccessToken({accessToken: null}))
// }

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

 

  //http://localhost:8080/users/ee9e0ec39f779682971ba95

  useEffect(() => {
    fetch(`http://localhost:8080/users/${userID}`,
    {
      headers:{ "Content-Type": "application/json", Authorization: accessToken}
    })
        
      .then((res) => res.json()) 
      .then((json) => {
        console.log('User profile:', json)
       
        console.log('userID', userID)
        // dispatch(user.actions.userId(userID))
        // dispatch(user.actions.accessToken(accessToken))
        
        setUser(json)
        console.log('user', user)
      }) 
    }, [userID]
    )

    const handleInfoChange = () => {
      return (
          <p> hello </p>
      )
 }


      
  return (
    
    <div className='user-container'>
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
        value='Update info'
        className='button-user-info'
        onClick={handleInfoChange}>
      </input>
      <input
          type='submit'
          value='Log out'
          className='button-user-info'
          onClick={handleLogout}>
      </input>
      </div>

      
    </div> 
    
  )
}