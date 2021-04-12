import React from 'react'
import { connect } from 'react-redux'
import { Post } from './Post'

const Posts: React.FC<any> = ({ syncPosts }): any => {
  console.log(syncPosts)
  if (!syncPosts.length) return <h3>Нет постов</h3>
  return syncPosts.map((post: any) => <Post post={post} key={post.id} />)
}

const mapStateToProps = (state: any) => {
  return {
    syncPosts: state.posts.posts
  }
}

export default connect(mapStateToProps)(Posts)
