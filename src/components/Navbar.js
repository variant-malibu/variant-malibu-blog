import React, {createRef} from 'react'
import {Link} from 'react-router-dom'
import {ThemeContext} from '../contexts/ThemeContext'
import logoLight from '../assets/variant-logo.png'
import logoDark from '../assets/variant-logo-dark.png'
import {ReactComponent as Bar} from '../assets/bar.svg'
import {ReactComponent as X} from '../assets/x.svg'
import {Button} from '@material-ui/core'

class Navbar extends React.Component {
  static contextType = ThemeContext

  constructor(props, context) {
    super(props, context)
    this.state = {
      displayMenu: false,
      lastScroll: 0,
      displayNavbar: true
    }
    this.navbarRef = createRef()

    this.menuItems = [
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
  }

  componentDidMount(){
    window.addEventListener("scroll", this.handleScroll)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.displayMenu !== nextState.displayMenu) return true
    if (this.state.displayNavbar === nextState.displayNavbar) return false
    return true
  }

  componentWillUnmount(){
    window.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll = () => {
    let current = window.pageYOffset || document.documentElement.scrollTop
    if (this.state.lastScroll > current) {
      if (this.state.displayNavbar === false) this.setState({displayNavbar :true})
    } else {
      if (this.state.displayNavbar) this.setState({displayNavbar :false})
    }
    this.setState({lastScroll: current})
  }

  handleClick = () => {
    this.setState((state) => ({displayMenu:!state.displayMenu}))
  }

  render() {

    return (
      <>
        <div id="navbar" style={{ "opacity" : this.state.displayNavbar ? "100%":"0%"}} className={this.context.darkTheme ? "dark" : "light"} ref={this.navbarRef}>
          <Link to="/"><img src={this.context.darkTheme ? logoLight : logoDark} alt="logo" /></Link>
          <Button className="bar-btn" onClick={this.handleClick}>
            <Bar/>
          </Button>
          {
          this.state.displayMenu &&
          (
            <div className="menu-container">
            <div className="menu">
              <Button className="x-btn" onClick={this.handleClick}>
                <X/>
              </Button>
              <ul className="menu-list">
              {
                this.menuItems.map(item =>
                  <li key={item.key}>
                    <Link to={`/${item.key}`} onClick={this.handleClick}>{item.title}</Link>
                  </li>
                )
              }
              </ul>
            </div>
            <div className="overlay" onClick={this.handleClick}></div>
            </div>
          )
        }
        </div>
      </>
    )
  }

}

export default Navbar
