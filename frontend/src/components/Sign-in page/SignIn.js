import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { user } from '../../reducer/user'


// AccessToken!!

export const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogIn = event => {
    event.preventDefault()

    fetch("http://localhost:8080/sessions", {
        method: 'POST',
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email, 
          password
        })  
      })
      .then (res => {
        if (!res.ok) {
          console.log('respons not Ok in signin.js')
          throw 'Could not log in, try a different username or password'
        }   
          console.log('response ok in signin.js')
          return res.json() 
      }).then(({ accessToken, userId }) => {
        if (accessToken) {
          dispatch(user.actions.login())
          dispatch(user.actions.saveAccessToken(accessToken))
          dispatch(user.actions.userId(userId))
          history.push('/user-page')
          console.log('yey its working', accessToken)
        }
      }).catch((err) => {
        console.log('error in catch singin.js')
        alert('Wrong password or username, please try again')
      })  
  }

  return (
    
    <section>
      <h1 className='header-title'>Log in to reveal the secret</h1>
      <a href='/sign-up'>Sign up</a>
      <form 
        onSubmit={handleLogIn}
        className='form-container'>
        <label>
          Email
          <input 
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            required
            className='input-field'>
          </input>
        </label>
        <label>
          Password
          <input 
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
            className='input-field'>
          </input>
        </label>
        <input
          type='submit'
          value='Sign in'
          className='button'>
        </input>
      </form>
    </section>
    )
  
}