import React from 'react'

export const Header = () => {
  return (
    <header>
           <nav role="navigation">
            <div id="menuToggle">
              <input type="checkbox" />
                <span></span>
                <span></span>
                <span></span>
            <ul id="menu">
              <li><a href="/contact">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Info</a></li>
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




      
          
         
       
   

    </header>
  )
}