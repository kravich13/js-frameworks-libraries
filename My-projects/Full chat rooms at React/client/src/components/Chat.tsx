import React, { useRef, useEffect, useState } from 'react'
import {
  IChatProps,
  IMessage,
  IMessageFromRes,
  ISocketLastMessage
} from '../interfaces'
import { ListMessages } from './List-messages'

const Chat: React.FC<IChatProps> = ({ socket, clickRoom, chatRequest }) => {
  const $inputName = useRef<HTMLInputElement>(null)
  const $inputMessage = useRef<HTMLInputElement>(null)
  const $chatWindow = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<IMessage[]>([])

  const formSendChat = (
    event: React.ChangeEvent<HTMLFormElement>
  ): string | void => {
    event.preventDefault()

    const nickname: string = $inputName.current!.value
    const userMess: string = $inputMessage.current!.value

    if (nickname.length < 3) {
      return setPlaceholder($inputName.current, 'Короткое имя')
    }
    if (userMess.length < 1) {
      return ($inputMessage.current!.placeholder = 'Пустое сообщение')
    }
    if (userMess.length > 1024) {
      return ($inputMessage.current!.placeholder = 'Длинное сообщение')
    }

    const nickMatch: RegExpMatchArray | null = nickname.match(/\w+/gi)

    if (nickMatch !== null) {
      if (nickMatch[0] !== nickname) {
        return setPlaceholder($inputName.current, 'Англ. и "_"')
      }
    } else return setPlaceholder($inputName.current, 'Англ. и "_"')

    socket.emit('addMessage', {
      user: $inputName.current!.value,
      message: $inputMessage.current!.value,
      clickRoom
    })

    setPlaceholder($inputMessage.current, 'Напишите сообщение...')

    if (localStorage.getItem('user') === nickname) return
    localStorage.setItem('user', nickname)
  }
  function setPlaceholder(elem: any, text: string): void {
    elem.value = ''
    elem.placeholder = text
  }

  useEffect((): void | any => {
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
    return (): boolean => (cleanupFunction = true)
  }, [socket, setMessages, clickRoom])

  useEffect((): void => {
    $chatWindow.current!.scrollBy(0, $chatWindow.current!.scrollHeight)
  }, [messages])

  useEffect((): void => {
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
          defaultValue={localStorage.getItem('user') ?? ''}
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
