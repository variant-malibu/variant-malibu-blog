import React, {useState, useContext, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import { PostContext } from '../contexts/PostContext'
import backToTop from '../helpers/backToTop'
import {Grid} from '@material-ui/core'
import {ReactComponent as FashionLogo } from '../assets/fashion-logo.svg'
import parse from 'html-react-parser'

function Post() {
  const {currentPost, setCurrentPost} = useContext(PostContext)
  const {id} = useParams()

  useEffect(()=>{
    getPostById()
    return () => {
      setCurrentPost({})
    }
  },[])


  const getPostById = async () => {
    try {
      const res = await fetch( process.env.REACT_APP_BACKEND + `/posts/${id}`)
      const data = await res.json()
      console.log('post data:', data)
      const postInfo = {
        id: data.id,
        name: data.name,
        date: data.date,
        title: data.title,
        content: data.content,
        imgUrl: data["main_img"] ? data["main_img"].url : false,
        author: data.user.username
      }
      setCurrentPost(postInfo)
    } catch (err) {
      console.log("Failed to get post data:", err)
    }
  }

  return (
    <Grid id="post" container direction="column" alignItems="center" >
      <FashionLogo className="fashion-logo black center" />
      <Grid item className="main-img">
        {
        currentPost.imgUrl && <img src={currentPost.imgUrl} alt="post-main-img" />
        }
      </Grid>
      <Grid item className="post-wrapper">
        <div className="info">
          <h3>{currentPost.name}</h3>
          <p>by {currentPost.author} on {currentPost.date}</p>
        </div>
        <h1 className="title">{currentPost.title}</h1>
        <div className="content">
          {parse(String(currentPost.content))}
        </div>
      </Grid>
      <div className="back-to-top">
        <a href="#" onClick={backToTop}>BACK TO TOP</a>
        <Link to="/blog">BACK TO BLOG</Link>
      </div>
    </Grid>
  )
}

export default Post
