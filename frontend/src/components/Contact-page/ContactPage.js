import React from 'react'

export const ContactPage = () => {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2 className="about-title">Contact</h2>
        <h1 className="title"> Reach out to us </h1>
      </div>
      <div className='pic-and-text'>
        <img className="about-pic" src="https://images.unsplash.com/photo-1524117074681-31bd4de22ad3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"/> 
        <p className="secondary-text"> Best way to reach us? Click on the icons above or just... go <a href='#' className='smaller-link'>Instagram!</a>  </p>
      </div>
    </section>
  )
}