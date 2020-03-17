import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {Grid} from '@material-ui/core'
import {ReactComponent as FashionLogo } from './assets/fashion-logo.svg'
import axios from 'axios'

class Blog extends React.Component {
  constructor() {
    super()
    this.state = {
      posts: []
    }
  }

  async componentDidMount(){
    const {data} = await axios.get('http://localhost:1337/posts')
    const result = data.map( post => {
      return {
        id: post.id,
        name: post.name,
        title: post.title,
        imgUrl: post['preview_img'].url
      }
    })
    console.log(data)
    this.setState({ posts: result })
  }

  getBlogPosts = () => {
    const posts = this.state.posts
    console.log(posts)
    if (posts.length > 0) {
      return posts.map( post => {
        return (
          <Grid className='preview' key={post.id} item md={4} >
            <Link to={post.name}>
              <img src={'http://localhost:1337' + post.imgUrl} alt='Blog Preview' />
              <h3>{post.title}</h3>
            </Link>
          </Grid>
        )
      })

    } else {
      return <p>There are no blog posts to display.</p>
    }
  }

  render(){
    return (
      <div id='blog'>
        <FashionLogo className='fashion-logo center' />
        <Grid container justify='center'>
          {
            this.getBlogPosts()
          }
        </Grid>
        <Grid container justify='center'>
          <a href='#blog' className='back-to-top'>BACK TO TOP</a>
        </Grid>
      </div>
    )
  }

}

export default Blog
