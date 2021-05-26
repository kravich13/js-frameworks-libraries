import React, { useRef, useEffect, useState, useContext } from 'react'
import Context from '../Context'
import {
  IChatProps,
  IMessage,
  IMessageFromRes,
  ISocketLastMessage,
} from '../interfaces'
import { ListMessages } from './List-messages'
import { Loader } from './Loader'
import '../styles/chat.css'

const Chat: React.FC<IChatProps> = ({
  socket,
  clickRoom,
  loader,
  setLoader,
}) => {
  const { setStateAlert } = useContext(Context)
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
      return setPlaceholder($inputName.current!, 'Короткое имя')
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
        return setPlaceholder($inputName.current!, 'Англ. и "_"')
      }
    } else return setPlaceholder($inputName.current!, 'Англ. и "_"')

    socket.emit('addMessage', {
      user: $inputName.current!.value,
      message: $inputMessage.current!.value,
      clickRoom,
    })

    setPlaceholder($inputMessage.current!, 'Напишите сообщение...')

    if (localStorage.getItem('user') === nickname) return
    localStorage.setItem('user', nickname)
  }
  function setPlaceholder(elem: HTMLInputElement, text: string): void {
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
            setMessages((prev) => [...prev, lastData])
          }
        }
      } catch (err) {
        setStateAlert('Произошла ошибка при получении сообщений')
      }
    })
    return (): boolean => (cleanupFunction = true)
  }, [socket, setMessages, setStateAlert, clickRoom])

  useEffect((): void => {
    $chatWindow.current!.scrollBy(0, $chatWindow.current!.scrollHeight)
  }, [messages])

  useEffect((): any => {
    run()
    async function run() {
      if (!clickRoom) return

      try {
        setMessages([])
        setLoader((prev: boolean) => (prev = true))
        let newDayMessage: string = ''

        const response = await fetch('/rooms', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            message: 'allMessages',
            clickRoom: clickRoom,
          }),
        })

        const resMessages: IMessageFromRes[] = await response.json()
        setLoader((prev: boolean) => (prev = false))

        const arrMessages = Array.from(resMessages, (elem: IMessageFromRes) => {
          const day: string = new Date(elem.createdAt).getDate().toString()

          const result = {
            ...elem,
            newDay: newDayMessage !== day ? true : false,
          }
          newDayMessage = day
          return result
        })
        setMessages([...arrMessages])
      } catch (err) {
        setStateAlert('Произошла ошибка при получении всех сообщений')
      }
    }
  }, [clickRoom, setStateAlert, setLoader])

  return (
    <div id="block-chat">
      <div id="chat-window" ref={$chatWindow}>
        {loader && <Loader />}

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
