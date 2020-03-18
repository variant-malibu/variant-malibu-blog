import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import {Grid} from '@material-ui/core'
import {ReactComponent as FashionLogo } from './assets/fashion-logo.svg'
import { Context } from './Context'

function Blog() {
  const [posts, setPosts] = useState([])
  const {currentPost, setCurrentPost} = useContext(Context)

  useEffect(() => {
    getBlogPosts()
    document.body.style.backgroundColor = 'black'
  }, [])

  const getBlogPosts = async () => {
    try {
      const res = await fetch('http://localhost:1337/posts')
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
    if (posts.length > 0) {
      return posts.map( post => {
        return (
          <Grid className='preview' key={post.id} item md={4} >
            <Link to={`blog/${post.id}`} onClick={(event) => handleClick(post.id)}>
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
  return (
    <div id='blog'>
      <FashionLogo className='fashion-logo white center' />
      <Grid container justify='center'>
        {
          displayBlogPosts()
        }
      </Grid>
      <Grid container justify='center'>
        <a href='#blog' className='back-to-top'>BACK TO TOP</a>
      </Grid>
    </div>
  )
}

export default Blog
