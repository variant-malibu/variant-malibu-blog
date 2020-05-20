import React from 'react'
import {Link} from 'react-router-dom'
import {Grid} from '@material-ui/core'
import {ReactComponent as InstagramIcon} from '../assets/instagram-icon.svg'
import NewsletterForm from './NewsletterForm'

function Footer() {
  return (
    <Grid id="footer" container justify="space-between" >
      <Grid className="section" item xs={12} sm={4}>
        <h5 className="title">QUICK LINK</h5>
        <li><Link to="/privacy-policy">PRIVACY POLICY</Link></li>
        <li><Link to="/terms-and-conditions">TERMS & CONDITIONS</Link></li>
        <li><Link to="/contact">CONTACT</Link></li>
        <li><Link to="/faqs">FAQs</Link></li>
      </Grid>
      <Grid className="section" item xs={12} sm={4}>
        <h5 className="title">SOCIAL MEDIA</h5>
        <a href="https://www.instagram.com/variantmalibu/"><InstagramIcon /></a>
      </Grid>
      <Grid className="section" item xs={12} sm={4}>
        <h5 className="title">NEWSLETTER</h5>
        <NewsletterForm />
      </Grid>
      <Grid item xs={12} sm={12}>
        <p className="copyright">Copyright &copy; 2020 Variant Malibu</p>
      </Grid>
    </Grid>
  )
}

export default Footer

