import React from 'react'

interface styleCss {
  [key: string]: string
}

interface styleFinally {
  [key: string]: styleCss
}

const styles: styleFinally = {
  userName: {
    width: '230px'
  },
  userMessage: {
    width: '430px'
  }
}

export const Chat: React.FC = () => {
  return (
    <div id="block-chat">
      <div id="chat-window">
        <div>
          <p>Первое сообщение</p>
        </div>
      </div>
      <form name="formUserData" id="formSendChat">
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
        <button id="sendMessage" name="sendMessage">
          &rsaquo;
        </button>
      </form>
    </div>
  )
}
