import React, {Fragment} from 'react'
import {Link, Switch, Route} from 'react-router-dom'
import logo from './assets/variant-logo.png'
import {ReactComponent as Bar} from './assets/bar.svg'
import {ReactComponent as X} from './assets/x.svg'
import {Grid, Button} from '@material-ui/core'

class Navbar extends React.Component {
  constructor(){
    super()
    this.state = {
      showMenu: false,
      menuItems: [
        {
          id: 0,
          title: 'PARTNERS',
          selected: false,
          key: 'partners'
        },
        {
          id: 1,
          title: 'ABOUT',
          selected: false,
          key: 'about'
        },
        {
          id: 2,
          title: 'FASHION 4.0 BLOG',
          selected: false,
          key: 'blog'
        },
        {
          id: 3,
          title: 'CONTACT',
          selected: false,
          key: 'contact'
        }
      ]
    }
  }

  handleClick = (event) => {
    event.preventDefault()
    this.setState({showMenu: !this.state.showMenu})
    console.log(this.state.showMenu)
  }

  showMenu = () => {

  }

  render(){
    return (
      <Fragment>
        <Grid id="navbar" container justify="space-between" alignItems="center" >
          <Link to="/"><img src={logo} className="logo" alt="logo" /></Link>
          <Button onClick={this.handleClick}>
            <Bar/>
          </Button>
        </Grid>
        {
          this.state.showMenu &&
          (
            <div className="menu">
              <Button className="x-btn" onClick={this.handleClick}>
                <X/>
              </Button>
              <ul className="menu-list">
              {
                this.state.menuItems.map(item => <li key={item.key}><Link to={item.key} onClick={this.handleClick}>{item.title}</Link></li>)
              }
              </ul>
            </div>
          )
        }
      </Fragment>
    )
  }
}

export default Navbar
