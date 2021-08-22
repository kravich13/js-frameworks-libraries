import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createPost } from '../redux/actions'

// class PostForm extends React.Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       title: ''
//     }
//   }

//   submitHandler = (event) => {
//     event.preventDefault()

//     const { title } = this.state

//     if (!title) return

//     const newPost = {
//       title,
//       id: Date.now().toString()
//     }

//     this.props(createPost(newPost))
//     this.setState({ title: '' })
//   }

//   changeInputHandler = (event) => {
//     event.persist()
//     this.setState((prev) => ({
//       ...prev,
//       ...{
//         [event.target.name]: event.target.value
//       }
//     }))
//   }
//   render() {
//     return (
//       <form onSubmit={this.submitHandler}>
//         <label htmlFor="title">Заголовок поста</label>
//         <input
//           type="text"
//           value={this.state.title}
//           name="title"
//           onChange={this.changeInputHandler}
//         />
//         <button>Добавить</button>
//       </form>
//     )
//   }
// }

const PostForm = () => {
  const [postElem, setPostElem] = useState({ title: '' })

  const submitHandler = (event) => {
    event.preventDefault()

    const newPost = {
      title: postElem.title,
      id: Date.now().toString()
    }

    createPost(newPost)

    setPostElem({ title: '' })
  }

  const changeInputHandrer = (event) => {
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
        onChange={(event) => changeInputHandrer(event)}
      />
      <button>Добавить</button>
    </form>
  )
}

const mapDispatchToProps = {
  createPost
}

export default connect(null, mapDispatchToProps)(PostForm)
