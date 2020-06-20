import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { user } from '../../reducer/user'

export const UserHomePage = () => {
  const accessToken = useSelector((state) => (state.user.accessToken))

  

  const userID = useSelector((state) => (state.user.id))
  const [user, setUser] = useState([])
  const history = useHistory()
  const dispatch = useDispatch()
  
  


  const handleLogOut = () => {
    return (
      dispatch(user.actions.saveAccesToken({accessToken: null}))
    )
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


      
  return (
    <div className='secret-container'>
      <h1>Hi there {user.firstName} {user.lastName} </h1>

      <div>

         id: 
         name: {user.firstName}
         lastname: {user.lastName}
         email: {user.email}

       
   

      </div>

      <input
          type='submit'
          value='Log out'
          className='button'
          onClick={handleLogOut}>
      </input>
    </div>
    
  )
}