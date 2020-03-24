import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import {Grid} from '@material-ui/core'
import {ReactComponent as FashionLogo } from '../assets/fashion-logo.svg'
import { Context } from '../contexts/Context'

function Blog() {
  const [posts, setPosts] = useState([])
  const {currentPost, setCurrentPost} = useContext(Context)

  useEffect(() => {
    getBlogPosts()
    document.body.style.backgroundColor = 'black'
  }, [])

  const getBlogPosts = async () => {
    const heroku = `https://variant-web-cms.herokuapp.com`
    const localhost = `http://localhost:1337`
    try {
      const res = await fetch(heroku + '/posts')
      const data = await res.json()
      const result = data.map( post => {
        return {
          id: post.id,
          name: post.name,
          title: post.title,
          imgUrl: post['preview_img'].url
        }
      })
      console.log(result)
      setPosts(result)
    } catch (err) {
      console.log(err)
    }
  }

  const handleClick = (postId) => {
    setCurrentPost({id:postId})
  }

  const displayBlogPosts = () => {
    const heroku = `https://variant-web-cms.herokuapp.com`
    const localhost = `http://localhost:1337`
    if (posts.length > 0) {
      return posts.map( post => {
        return (
          <Grid item className="preview" key={post.id} xs={6} md={4} >
            <Link to={`blog/${post.id}`} onClick={(event) => handleClick(post.id)}>
              <img src={post.imgUrl} alt="Blog Preview" />
              <h3>{post.title}</h3>
            </Link>
          </Grid>
        )
      })

    } else {
      return <p>There are no blog posts to display.</p>
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
        <a href="#blog" >BACK TO TOP</a>
      </div>
    </Grid>
  )
}

export default Blog
