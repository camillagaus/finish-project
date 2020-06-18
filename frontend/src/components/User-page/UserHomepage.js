import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { user } from '../../reducer/user'

export const UserHomePage = () => {
  const accessToken = useSelector((state) => (state.user.accessToken))
  
  const userID = useSelector((state) => (state.user._id))
  const [profile, setProfile] = useState('')
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

  useEffect(() => {
    fetch(`http://localhost:8080/users/${userID}`)
    
      .then((res) => res.json()) 
      .then((json) => {
        console.log('User profile:', json)
        dispatch(user.actions.userId({userID}))
        setProfile(json)
      }) 
    }, [userID]
    )
      
  

  return (
    <div className='secret-container'>
      <h1>Secret</h1>
      
      <input
          type='submit'
          value='Log out'
          className='button'
          onClick={handleLogOut}>
      </input>
    </div>
    
  )
}