import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import logo from '../assets/variant-logo.png'
import {ReactComponent as Bar} from '../assets/bar.svg'
import {ReactComponent as X} from '../assets/x.svg'
import {Grid, Button} from '@material-ui/core'

class Navbar extends React.Component {
  constructor(){
    super()
    this.state = {
      showMenu: false,
      menuItems: [
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
  }

  handleClick = (event) => {
    this.setState({showMenu: !this.state.showMenu})
  }

  render(){
    return (
      <Fragment>
        <Grid id="navbar" container>
          <Link to="/"><img src={logo} className="logo" alt="logo" /></Link>
          <Button className="bar" onClick={this.handleClick}>
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
                this.state.menuItems.map(item => <li key={item.key}><Link to={`/${item.key}`} onClick={this.handleClick}>{item.title}</Link></li>)
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
