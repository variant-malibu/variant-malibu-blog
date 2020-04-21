import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Grid} from '@material-ui/core'
import {ReactComponent as FashionLogo } from '../assets/fashion-logo.svg'
import backToTop from '../helpers/backToTop'

function Blog() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getBlogPosts()
  }, [])

  const getBlogPosts = async () => {

    try {
      const res = await fetch(process.env.REACT_APP_BACKEND + '/posts')
      const data = await res.json()
      const result = data.map( post => {
        return {
          id: post.id,
          name: post.name,
          title: post.title,
          imgUrl: post['preview_img'].url
        }
      })
      setPosts(result)
    } catch (err) {
      console.log(err)
    }
  }

  const displayBlogPosts = () => {
    if (posts.length > 0) {
      return posts.map( post => {
        return (
          <Grid item className="preview" key={post.id} xs={6} md={4} >
            <Link to={`blog/${post.id}`}>
              <img src={post.imgUrl} alt="Blog Preview" />
              <h3>{post.title}</h3>
            </Link>
          </Grid>
        )
      })

    } else {
      return null
    }
  }

  return (
    <Grid container direction="column" alignItems="center" id='blog'>
      <Grid container justify="center">
        <FashionLogo className="fashion-logo white center" />
      </Grid>
      <Grid container spacing={2}>
        {
          displayBlogPosts()
        }
      </Grid>
      <div className="back-to-top">
        <a href= "#" onClick={backToTop}>BACK TO TOP</a>
      </div>
    </Grid>
  )
}

export default Blog
