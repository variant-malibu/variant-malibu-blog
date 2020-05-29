import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Grid} from '@material-ui/core'
import {ReactComponent as FashionLogo } from '../assets/fashion-logo.svg'
import backToTop from '../helpers/backToTop'
import axios from 'axios'

function Blog() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getBlogPosts()
  }, [])

  const compareByDate = ( a, b)  => {
    if ( a.date > b.date ){
      return -1;
    }
    if ( a.date < b.date ){
      return 1;
    }
    return 0;
  }

  const getBlogPosts = async () => {

    try {
      const {data} = await axios.get(process.env.REACT_APP_BACKEND + '/posts', {
        "_sort": "date:desc"
      })
      const result = data.map( post => {
        const epoch = new Date(post.date).getTime()
        return {
          id: post.id,
          name: post.name,
          title: post.title,
          date: epoch,
          imgUrl: post['preview_img'].url
        }
      }).sort(compareByDate)
      setPosts(result)
    } catch (err) {
      console.error(err)
    }
  }

  const displayBlogPosts = () => {
    if (posts.length > 0) {
      return posts.map( post => {
        return (
          <Grid item className="preview" key={post.id} xs={6} md={4} >

              <Link to={`blog/${post.id}`}>
              <div className="aspect-ratio-16-9" style={{"background": `url(${post.imgUrl})`}}></div>
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
    <Grid id="blog" className="content-wrapper" container direction="column" alignItems="center" >
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
