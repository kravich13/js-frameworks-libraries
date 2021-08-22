import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createPost } from '../redux/actions'

interface IpostElem {
  title: string
}

const PostForm: React.FC = (props: any) => {
  const [postElem, setPostElem] = useState<IpostElem>({ title: '' })

  const submitHandler = (event: React.KeyboardEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newPost = {
      title: postElem.title,
      id: Date.now().toString()
    }

    props.createPost(newPost)
  }

  const changeInputHandrer = (
    event: React.ChangeEvent<HTMLInputElement>
  ): any => {
    setPostElem((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value
      }
    }))
  }

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="title">Заголовок поста</label>
      <input
        type="text"
        name="title"
        value={postElem.title}
        onChange={(event: any) => changeInputHandrer(event)}
      />
      <button>Добавить</button>
    </form>
  )
}

const mapDispatchToProps = { createPost }

export default connect(null, mapDispatchToProps)(PostForm)
