import React from 'react'
import { useSelector } from 'react-redux'
import { Cart } from '../Products-and-cart/Cart'


export const Header = () => {
  const isAuthorized = useSelector((state) => state.user.isAuthorized)

  return (
    <header>
      <nav role="navigation" className='nav-mobile'>
        <div id="menuToggle">
          <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
            <li><a href="/">Shop</a></li>
            <li><a href="/about">About</a></li>
            {isAuthorized === true ?  
          <li><a href="/user-page">Profile</a></li>
         :<li><a href="/sign-in">Sign in</a></li> }
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      </nav>
      <h1 className="header-title">KAM</h1>
      <h3 className="header-slogan">DESIGN</h3>
      <div className="social-media-header">
        <i className="fa fa-facebook-f"></i>
        <i className="fa fa-youtube"></i>
        <i className="fa fa-instagram"></i>
        <Cart />
      </div>
      <nav role="navigation" className='nav-desktop'>
        <ul className="menu-desktop">
        {isAuthorized === true ? 
          <a href='/user-page'> Profile </a> : <> </> } 
          <li><a href="/">Shop</a></li>
          <li className='dropdown'>
            <button className='drop-btn'> About → </button>
            <div className='dropdown-content'>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
            </div>
          </li>
          { isAuthorized === true ? <> </> : 
          <li className='dropdown'>
            <button className='drop-btn'> Sign in → </button>
            <div className='dropdown-content'>
              <a href="/sign-in">Sign in</a>
              <a href="/sign-up">Sign up</a>
            </div>
          </li>}
          <li>
            <div><Cart />  </div>
          </li>
        </ul>
      </nav>
    </header>
  )
}