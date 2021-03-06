import React, { useState } from 'react'
// import SendMessageForm from "./SendMessageForm"

const styles = {
  divMain: {
    width: '1070px'
  },
  divChat: {
    display: 'flex',
    flexDirection: 'column',
    height: '742px',
    background: 'rgba(192, 0, 0, 0.44)',
    color: 'black',
    padding: '10px',
    overflowX: 'hidden',
    wordWrap: 'break-word'
  },
  divWindowMess: {
    position: 'relative',
    marginBottom: '7px',
    background: 'rgb(240,240,240)',
    borderRadius: '5px',
    padding: '5px 10px',
    width: 'auto',
    marginRight: 'auto'
  },
  divWindowTime: {
    display: 'flex',
    justifyContent: 'flex-end',
    color: 'rgba(83,83,83)',
    fontSize: '15px'
  },
  form: {
    display: 'flex',
    alignSelf: 'stretch',
    width: '100%',
    height: '38px'
  },
  userName: {
    width: '185px',
    background: 'rgba(192, 0, 0, 0.568)',
    border: '1px solid grey',
    color: 'white',
    fontWeight: 600,
    outline: 'none'
  },
  userMessage: {
    width: '76%',
    background: 'rgba(192, 0, 0, 0.568)',
    border: '1px solid grey',
    color: 'white',
    fontWeight: 600,
    outline: 'none'
  },
  sendMessage: {
    width: '5%',
    background: 'rgba(192, 0, 0, 0.568)',
    border: '1px solid grey',
    outline: 'none',
    color: 'black',
    fontWeight: 600,
    fontSize: '25px'
  }
}

export default function WindowChat() {
  const [messages, setMessages] = useState([
    {
      nickname: 'Влад Кравич',
      message: 'приветствую',
      timestamp: `${new Date().getHours()}:${new Date().getMinutes()}`
    },
    {
      nickname: 'Maksym Baranovkyi',
      message: 'Привет',
      timestamp: `${new Date().getHours()}:${new Date().getMinutes()}`
    },
    {
      nickname: 'SV',
      message: 'Здравствуй',
      timestamp: `${new Date().getHours()}:${new Date().getMinutes()}`
    }
  ])

  function formSubmit(event) {
    event.preventDefault()

    const $nickname = event.target[0]
    const $message = event.target[1]

    if (!$nickname.value) return
    if (!$message.value) return

    setMessages([
      ...messages,
      {
        nickname: $nickname.value,
        message: $message.value,
        timestamp: `${new Date().getHours()}:${new Date().getMinutes()}`
      }
    ])

    $message.value = ''
  }

  return (
    <div style={styles.divMain}>
      <div style={styles.divChat} id="chatWindow">
        {messages.map((user, index) => {
          return (
            <div key={index.toString()} style={styles.divWindowMess}>
              <p>
                {user.nickname}: {user.message}
                <br />
              </p>
              <span style={styles.divWindowTime}>{user.timestamp}</span>
            </div>
          )
        })}
      </div>

      <form
        onSubmit={formSubmit}
        style={styles.form}
        name="formUserData"
        id="formSendChat"
      >
        <input
          style={styles.userName}
          id="userName"
          name="userName"
          type="text"
          placeholder="Введите имя"
        />
        <input
          style={styles.userMessage}
          id="userMessage"
          name="userMessage"
          type="text"
          placeholder="Напишите сообщение..."
        />
        <button style={styles.sendMessage} id="sendMessage" name="sendMessage">
          &rsaquo;
        </button>
      </form>
    </div>
  )
}
