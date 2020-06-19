import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { user } from '../../reducer/user'

export const UserHomePage = () => {
  const accessToken = useSelector((state) => (state.user.accessToken))
  
  const userID = useSelector((state) => (state.user.id))
  const [profile, setProfile] = useState(null)
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
        // dispatch(user.actions.userId(userId))
        // dispatch(user.actions.accessToken(accessToken))
        setProfile(json)
      }) 
    }, [userID]
    )


  // useEffect(() => {
  //   fetch(`http://localhost:8080/users/${userID}`, {
  //     headers: {
  //       Authorization: accessToken
  //     }
  //     })
  //     .then((res) => {
        
  //        res.json() 
  //        console.log('secrets res ok') 
  //     }, [accessToken])
      
  // })

      
  return (
    <div className='secret-container'>
      <h1>Secret 
       
      </h1>

      <div>
         id: 
         name: 
         lastname:

        {/* {profile && profile.map((item) => (
        <p>{item.firstName}</p>
        ))} */}
   

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