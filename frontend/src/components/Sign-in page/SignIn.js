import React from 'react'

export const SignIn = () => {
  return (
    <section>
      <h4 className='sign-in-text'><span className='bold'>Sign in</span> to view your cart and earlier purschases</h4>
      <a className='small-link' href='/sign-up'>Go to Sign up</a>
      <form
      className='form-container'>
        <label>
          Email
          <input
          type='email'
          required
          className='input-field'>
          </input>
        </label>
        <label>
          Password 
          <input
          type='password'
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