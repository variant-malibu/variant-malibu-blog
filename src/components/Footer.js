import React from 'react'
import {Link} from 'react-router-dom'
import {ReactComponent as InstagramIcon} from '../assets/instagram-icon.svg'
import NewsletterForm from './NewsletterForm'

function Footer() {
  return (
    <div id="footer">
      <div className="section-wrapper">
        <div className="section">
          <h5 className="title">QUICK LINK</h5>
          <li><Link to="/privacy-policy">PRIVACY POLICY</Link></li>
          <li><Link to="/terms-and-conditions">TERMS & CONDITIONS</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
          <li><Link to="/faqs">FAQs</Link></li>
        </div>
        <div className="section">
          <h5 className="title">SOCIAL MEDIA</h5>
          <a href="https://www.instagram.com/variantmalibu/"><InstagramIcon /></a>
        </div>
        <div className="section">
          <h5 className="title">NEWSLETTER</h5>
          <NewsletterForm />
        </div>
      </div>
      <div className="copyright">
        <p>Copyright &copy; 2020 Variant Malibu</p>
      </div>
    </div>
  )
}

export default Footer

