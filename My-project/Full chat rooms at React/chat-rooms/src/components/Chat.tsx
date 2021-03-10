import React, { useRef, useEffect } from 'react'
import { IChatProps, IMessage } from '../interfaces'
// import { Context } from '../Context'

interface styleCss {
  [key: string]: string
}

interface styleFinally {
  [key: string]: styleCss
}

const styles: styleFinally = {
  userName: {
    width: '230px',
    fontSize: '17px'
  },
  userMessage: {
    width: '430px',
    fontSize: '17px'
  },
  button: {
    fontSize: '21px'
  },
  messageMain: {
    fontSize: '17px',
    width: 'auto',
    display: 'inline-block',
    background: 'rgba(255, 0, 0, 0.13)',
    border: '1px solid lightblue',
    borderRadius: '8px',
    padding: '5px 15px',
    marginBottom: '5px',
    textAlign: 'end'
  },
  spanDate: {
    fontSize: '15px'
  }
}

export const Chat: React.FC<IChatProps> = ({
  socket,
  chatRequest,
  arrMessagesState,
  clickRoom
}) => {
  const $inputName = useRef<any>(null)
  const $inputMessage = useRef<any>(null)
  const $chatWindow = useRef<any>(null)
  const { messages, setMessages } = arrMessagesState

  const formSendChat = (event: React.ChangeEvent<HTMLFormElement>): any => {
    event.preventDefault()

    if ($inputName.current.value.length < 3) {
      $inputName.current.value = ''
      return ($inputName.current.placeholder = 'Короткое имя')
    }
    if ($inputMessage.current.value.length < 1) {
      return ($inputMessage.current.placeholder = 'Пустое сообщение')
    }

    socket.emit('addMessage', {
      user: $inputName.current.value,
      message: $inputMessage.current.value,
      clickRoom
    })

    $inputMessage.current.value = ''
    $inputMessage.current.placeholder = 'Напишите сообщение...'
  }

  // Если только зашел на страницу - обновить один раз
  useEffect(() => {
    run()
  }, [])

  async function run() {
    const arrMessages: IMessage[] = await chatRequest()
    setMessages([...arrMessages])
  }

  useEffect((): any => {
    let cleanupFunction = false
    socket.on('lastMessage', (data: IMessage) => {
      if (!cleanupFunction) {
        setMessages((prev: any) => {
          return [...prev, data]
        })
      }
    })
    return () => (cleanupFunction = true)
  }, [socket])

  useEffect(() => {
    $chatWindow.current.scrollBy(0, $chatWindow.current.scrollHeight)
  }, [messages])

  return (
    <div id="block-chat">
      <div id="chat-window" ref={$chatWindow}>
        {messages.map((elem: IMessage) => {
          const stringHours: string = `${new Date(elem.createdAt).getHours()}`
          const stringMinutes: string = `${new Date(
            elem.createdAt
          ).getMinutes()}`
          const stringTime: string = `${stringHours}:${stringMinutes}`
          return (
            <React.Fragment key={elem._id}>
              <div style={styles.messageMain}>
                <p>
                  {elem.user}: {elem.message}
                  <br />
                  <span style={styles.spanDate}> {stringTime}</span>
                </p>
              </div>
              <br />
            </React.Fragment>
          )
        })}
      </div>
      <form onSubmit={formSendChat} name="formUserData" id="formSendChat">
        <input
          style={styles.userName}
          id="userName"
          name="userName"
          type="text"
          placeholder="Введите имя"
          ref={$inputName}
        />
        <input
          style={styles.userMessage}
          id="userMessage"
          name="userMessage"
          type="text"
          placeholder="Напишите сообщение..."
          ref={$inputMessage}
        />
        <button id="sendMessage" name="sendMessage" style={styles.button}>
          &rsaquo;
        </button>
      </form>
    </div>
  )
}