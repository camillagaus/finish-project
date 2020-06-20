import React from 'react'
import { Cart } from '../Products-and-cart/Cart'


export const Header = () => {
  return (
    <header>
           <nav role="navigation" className='nav-mobile'>
            <div id="menuToggle">
              <input type="checkbox" />
                <span></span>
                <span></span>
                <span></span>
            <ul id="menu">
              <li><a href="/">Home</a></li>
              <li><a href="/">About</a></li>
              <li><a href="/sign-in">Sign in</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
           </div>
          </nav>

      <h1 className="header-title">COMPANY</h1>
      <h3 className="header-slogan">DESIGN</h3>

      <div className="social-media-header">
        <i className="fa fa-facebook-f"></i>
        <i className="fa fa-youtube"></i>
        <i className="fa fa-instagram"></i>
      </div>

      <nav role="navigation" className='nav-desktop'>
      <ul className="menu-desktop">
               
               
              <li><a href="/">Shop</a></li>
              <li className='dropdown'>
              <button className='drop-btn'> About → </button>
                <div className='dropdown-content'>
                  <a href="/">About</a>
                  <a href="/contact">Contact</a>
                </div>
              </li>
             
              <li className='dropdown'>
                <button className='drop-btn'> Sign in → </button>
                <div className='dropdown-content'>
                  <a href="/sign-in">Sign in</a>
                  <a href="/sign-up">Sign up</a>
                </div>
              </li>
              
              <li>
                <div><Cart />  </div>
                 
                 </li>
            </ul>
      </nav>

    

      
          
         
       
   

    </header>
  )
}