import React from 'react'
import {Grid} from '@material-ui/core'
import {ReactComponent as InstagramIcon} from '../assets/instagram-icon.svg'
import NewsletterForm from './NewsletterForm'

function Footer() {
  return (
    <Grid id="footer" container justify="center" >
      <Grid className="section" item xs={12} sm={4}>
        <h5 className="title">QUICK LINK</h5>
        <li><a href="/">PRIVACY POLICY</a></li>
        <li><a href="/">TERMS & CONDITIONS</a></li>
        <li><a href="/">CONTACT</a></li>
        <li><a href="/">FAQs</a></li>
      </Grid>
      <Grid className="section" item xs={12} sm={4}>
        <h5 className="title">SOCIAL MEDIA</h5>
        <InstagramIcon />
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

