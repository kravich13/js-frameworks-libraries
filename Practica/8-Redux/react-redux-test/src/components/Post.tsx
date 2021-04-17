import React from 'react'

export const Post: React.FC<any> = ({ post }) => {
  return (
    <div className="card">
      <h3>{post.title}</h3>
    </div>
  )
}
