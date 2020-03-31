import React, {useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import {PostContext} from '../contexts/PostContext'
import logoLight from '../assets/variant-logo.png'
import logoDark from '../assets/variant-logo-dark.png'
import {ReactComponent as Bar} from '../assets/bar.svg'
import {ReactComponent as X} from '../assets/x.svg'
import {Button} from '@material-ui/core'

const Navbar = () => {

  const [displayMenu, setDisplayMenu] = useState(false)
  const {currentPost, setCurrentPost} = useContext(PostContext)

  let menuItems = [
    {
      title: 'HOME',
      selected: false,
      key: ''
    },
    {
      title: 'PARTNERS',
      selected: false,
      key: 'partners'
    },
    {
      title: 'ABOUT',
      selected: false,
      key: 'about'
    },
    {
      title: 'FASHION 4.0 BLOG',
      selected: false,
      key: 'blog'
    },
    {
      title: 'CONTACT',
      selected: false,
      key: 'contact'
    }
  ]

  const handleClick = (event) => {
    setDisplayMenu(!displayMenu)
  }

  return (
    <div id="navbar">
      <Link to="/"><img src={currentPost.id === undefined ? logoLight : logoDark} alt="logo" /></Link>
      <Button className="bar-btn" onClick={handleClick}>
        <Bar/>
      </Button>
      {
      displayMenu &&
      (
        <div className="menu">
          <Button className="x-btn" onClick={handleClick}>
            <X/>
          </Button>
          <ul className="menu-list">
          {
            menuItems.map(item => <li key={item.key}><Link to={`/${item.key}`} onClick={handleClick}>{item.title}</Link></li>)
          }
          </ul>
        </div>
      )
    }
    </div>
  )
}

export default Navbar
