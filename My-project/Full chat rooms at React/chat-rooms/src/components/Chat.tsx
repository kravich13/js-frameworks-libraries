import React, { useRef, useEffect, useState } from 'react'
import {
  IChatProps,
  IMessage,
  IMessageFromRes,
  ISocketLastMessage,
  styleFinally
} from '../interfaces'
import { ListMessages } from '../components/List-messages'

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
  }
}

const Chat: React.FC<IChatProps> = ({ socket, clickRoom, chatRequest }) => {
  const $inputName = useRef<any>(null)
  const $inputMessage = useRef<any>(null)
  const $chatWindow = useRef<any>(null)
  const [messages, setMessages] = useState<IMessage[]>([])

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

  useEffect((): any => {
    let cleanupFunction = false
    socket.on('lastMessage', (data: ISocketLastMessage) => {
      if (!cleanupFunction) {
        const { lastData, sendFromRoom } = data

        if (clickRoom === sendFromRoom) {
          setMessages((prev) => {
            return [...prev, lastData]
          })
        }
      }
    })
    return () => (cleanupFunction = true)
  }, [socket, setMessages, clickRoom])

  useEffect(() => {
    $chatWindow.current.scrollBy(0, $chatWindow.current.scrollHeight)
  }, [messages])

  useEffect(() => {
    run()
    async function run() {
      if (clickRoom) {
        let newDayMessage: string = ''
        const arrMessages = Array.from(
          await chatRequest(),
          (elem: IMessageFromRes) => {
            const day: string = new Date(elem.createdAt).getDate().toString()

            const result = {
              ...elem,
              newDay: newDayMessage !== day ? true : false
            }
            newDayMessage = day
            return result
          }
        )
        setMessages([...arrMessages])
      }
    }
  }, [clickRoom, chatRequest])

  return (
    <div id="block-chat">
      <div id="chat-window" ref={$chatWindow}>
        {messages.map((message: IMessage) => {
          return <ListMessages key={message._id} message={message} />
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

export default React.memo(Chat)
