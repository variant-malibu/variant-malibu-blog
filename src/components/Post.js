import React, {useState, useContext, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import { PostContext } from '../contexts/PostContext'
import backToTop from '../helpers/backToTop'
import {Grid} from '@material-ui/core'
import {ReactComponent as FashionLogo } from '../assets/fashion-logo.svg'
import ReactMarkdown from 'react-markdown'

function Post() {
  const {currentPost, setCurrentPost} = useContext(PostContext)
  console.log("current post:", currentPost)
  const {id} = useParams()

  useEffect(()=>{
    getPostById()
    document.body.style.backgroundColor = "white"
    document.getElementById("navbar").style.backgroundColor = "white"
    return () => {
      setCurrentPost(null)
    }
  },[])



  const getPostById = async () => {
    const heroku = `https://variant-web-cms.herokuapp.com`
    const localhost = `http://localhost:1337`
    try {
      const res = await fetch(heroku + `/posts/${id}`)
      const data = await res.json()
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
        {currentPost.imgUrl && <img src={currentPost.imgUrl} alt="post-main-img" /> }
      </Grid>
      <Grid item className="content">
        <div className="info">
          <h3>{currentPost.name}</h3>
          <p>by {currentPost.author} on {currentPost.date}</p>
        </div>
        <h1 className="title">{currentPost.title}</h1>
        <ReactMarkdown className="markdown" source={currentPost.content} escapteHtml={false} />
      </Grid>
      <div className="back-to-top">
        <a href="#" onClick={backToTop}>BACK TO TOP</a>
        <Link to="/blog">BACK TO BLOG</Link>
      </div>
    </Grid>
  )
}

export default Post
