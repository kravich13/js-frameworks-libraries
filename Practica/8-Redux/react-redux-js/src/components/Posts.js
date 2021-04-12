import React from 'react'
import Post from './Post'
import { connect } from 'react-redux'

const Posts = ({ syncPosts }) => {
  if (!syncPosts.length) return <p>Постов нет</p>
  return syncPosts.map((post) => <Post post={post} key={post.id} />)
}

const mapStateToProps = (state) => {
  return {
    syncPosts: state.posts.posts
  }
}

export default connect(mapStateToProps)(Posts)
