import React, { useRef, useEffect, useState } from 'react'
import {
  IChatProps,
  IMessage,
  IMessageFromRes,
  ISocketLastMessage
} from '../interfaces'
import { ListMessages } from '../components/List-messages'

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
    socket.on('lastMessage', async (data: ISocketLastMessage) => {
      try {
        if (!cleanupFunction) {
          const { lastData, sendFromRoom } = data

          if (clickRoom === sendFromRoom) {
            setMessages((prev) => {
              return [...prev, lastData]
            })
          }
        }
      } catch (err) {
        alert('Произошла ошибка')
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
      try {
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
      } catch (err) {
        alert('Произошла ошибка')
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
          id="userName"
          name="userName"
          type="text"
          placeholder="Введите имя"
          ref={$inputName}
        />
        <input
          id="userMessage"
          name="userMessage"
          type="text"
          placeholder="Напишите сообщение..."
          ref={$inputMessage}
        />
        <button id="sendMessage" name="sendMessage">
          &rsaquo;
        </button>
      </form>
    </div>
  )
}

export default React.memo(Chat)
