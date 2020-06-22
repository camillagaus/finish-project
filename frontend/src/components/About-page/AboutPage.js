import React from 'react'

export const AboutPage = () => {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2 className="about-title">ABOUT</h2>
        <h1 className="title"> Hello - We are Company </h1>
      </div>
      <div className='pic-and-text'>
        <img className="about-pic" src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt='three women standing in backlight'/> 
        <p className="secondary-text"> A young label from Stockholm. We stand for unique design for a free lifestyle. 
          The COMPANY design language combines xxxx forms with the simplicity of nordic design – minimalistic and emotional 
          at the same time. All COMPANY products are 100% handmade in Sweden just for you!  </p>
      </div>
    </section>
  )
}