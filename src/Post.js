import React, {useState, useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { Context } from './Context'
import {Grid} from '@material-ui/core'
import {ReactComponent as FashionLogo } from './assets/fashion-logo.svg'
import ReactMarkdown from 'react-markdown'

function Post() {
  const {currentPost, setCurrentPost} = useContext(Context)
  console.log('current post:', currentPost)
  const {id} = useParams()
  console.log('useParams:', id)

  useEffect(()=>{
    getPostById()
    document.body.style.backgroundColor = 'white'
  },[])

  const getPostById = async () => {
    try {
      const res = await fetch(`http://localhost:1337/posts/${id}`)
      const data = await res.json()
      const postInfo = {
        id: data.id,
        name: data.name,
        date: data.date,
        title: data.title,
        content: data.content,
        imgUrl: data['preview_img'].url
      }
      setCurrentPost(postInfo)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Grid id="post" container justify="center" >
      <FashionLogo className="fashion-logo black center" />
      <img src={currentPost.imgUrl} alt="post-main-img" />
      <Grid item>
        <ReactMarkdown source={currentPost.content} escapteHtml={false} />
      </Grid>

    </Grid>
  )
}

export default Post
