import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { user } from 'reducer/user'


export const SignUp = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [city, setCity] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const history = useHistory()

 


  const handleSignUp = event => {
    event.preventDefault()
    fetch("https://finish-project-camilla.herokuapp.com/users",
      {
        method: 'POST',
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
          firstName, 
          lastName, 
          email, 
          address, 
          zipCode, 
          city, 
          phoneNumber, 
          password 
        })
      })
      .then((res) => {
        if (!res.ok) {
          // throw new Error('Could not log in, try a different username or password')
          console.log('error in fetch')
        } else {
          return res.json()
        }   
      }).then((
        { email, password }) => {
        window.localStorage.setItem('password', password)
        window.localStorage.setItem('email', email)
     // ) => {
        // setFirstName('')
        // setLastName('')
        // setEmail('')
        // setPhoneNumber('')
        // setZipCode('')
        // setAddress('')
        // setPassword('')
        // setCity('')
        dispatch(user.actions.login())

        history.push('/sign-in')
      })
      .catch((err) => {
        alert('Could not create user, try another username and password')
       throw new Error('Create e new user')
      })
  }


  return (
    <section>
      <div className='sign-in-section'>
        <h1 className='header-title'>Sign up</h1>
        <a  className='sign-up-link' href='/sign-in'>Sign in</a>
      </div>
      
      <form onSubmit={handleSignUp}>
        <div className='desktop-formatting-flexbox'>
          <div>
          <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={event => setFirstName(event.target.value)}
            className='input-field'
            required>
          </input>
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={event => setLastName(event.target.value)}
            className='input-field'
            required>
          </input>
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            className='input-field'
            required>
          </input>
        </label>
        <label>
          Address
          <input
            type="address"
            value={address}
            onChange={event => setAddress(event.target.value)}
            className='input-field'
            required>
          </input>
        </label>
        </div>
        <div>
        <label>
          Zip Code
          <input
            type="number"
            value={zipCode}
            onChange={event => setZipCode(event.target.value)}
            className='input-field'
            required>
          </input>
        </label>
        <label>
          City
          <input
            type="string"
            value={city}
            onChange={event => setCity(event.target.value)}
            className='input-field'
            required>
          </input>
        </label>
        <label>
          Phone Number 
          <input
            type="tel"
            value={phoneNumber}
            onChange={event => setPhoneNumber(event.target.value)}
            className='input-field'
            required>
          </input>
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            className='input-field'
            required>
          </input>
        </label>
        </div>
        </div>
        <input
          type='submit'
          value='Sign up'
          className='button'>
        </input>
      </form>
    </section>
  )
}