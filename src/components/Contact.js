import React from 'react'
import ContactForm from './ContactForm'
import ContactBanner from '../assets/contact.png'

const Contact = () => {
  return (
    <div id="contact">
      <img src={ContactBanner} className="banner" />
      <p className="lead">If you have a creative vision and innovative spirit, we want to help you bring it to life. Please fill out the contact form below, and we will be in touch.</p>
      <ContactForm/>
    </div>
  )
}

export default Contact
