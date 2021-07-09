import React, { useRef, useEffect, useState, useContext } from 'react'
import Context from '../Context'
import {
  IChatProps,
  IMessage,
  IMessageFromRes,
  ISocketLastMessage,
} from '../interfaces'
import ListMessages from './List-messages'
import { Loader } from './Loader'
import '../styles/chat.css'

const Chat: React.FC<IChatProps> = ({
  socket,
  clickRoom,
  loader,
  setLoader,
}) => {
  const { setStateAlert } = useContext(Context)
  const $chatWindow = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<IMessage[]>([])
  const [nameValue, setNameValue] = useState<string>(
    localStorage.getItem('user') ?? ''
  )
  const [messageValue, setMessageValue] = useState<string>('')

  const formSendChat = (
    event: React.ChangeEvent<HTMLFormElement>
  ): string | void => {
    event.preventDefault()

    const et = event.target as HTMLFormElement
    const $name = et.elements.namedItem('userName') as HTMLInputElement
    const $message = et.elements.namedItem('userMessage') as HTMLInputElement

    if (nameValue.length < 3) {
      return defaultInput($name, setNameValue, 'Короткое имя')
    }
    if (messageValue.length < 1) {
      return ($message.placeholder = 'Пустое сообщение')
    }
    if (messageValue.length > 1024) {
      return ($message.placeholder = 'Длинное сообщение')
    }

    const nickMatch = nameValue.match(/\w+/gi) as RegExpMatchArray

    if (nickMatch?.length) {
      if (nickMatch[0] !== nameValue) {
        return defaultInput($name, setNameValue, 'Англ. и "_"')
      }
    } else return defaultInput($name, setNameValue, 'Англ. и "_"')

    socket.emit('addMessage', {
      user: nameValue,
      message: messageValue,
      clickRoom,
    })

    defaultInput($message, setMessageValue, 'Напишите сообщение...')

    if (localStorage.getItem('user') === nameValue) return
    localStorage.setItem('user', nameValue)
  }
  function defaultInput(
    elem: HTMLInputElement,
    setValue: Function,
    text: string
  ): void {
    setValue('')
    elem.placeholder = text
  }

  useEffect((): (() => void) => {
    let cleanupFunction: boolean = false

    socket.on('lastMessage', async (data: ISocketLastMessage) => {
      if (cleanupFunction || !data.lastData) return

      const { lastData, sendFromRoom } = data

      if (clickRoom === sendFromRoom) {
        setMessages((prev) => [...prev, lastData])
      }
    })
    return (): void => {
      cleanupFunction = true
    }
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
        setLoader(true)

        let newDayMessage: string = ''

        const response: Response = await fetch('/rooms', {
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

        setLoader(false)

        const arrMessages = Array.from(resMessages, (elem: IMessageFromRes) => {
          const day: string = new Date(elem.createdAt).getDate().toString()

          const result = { ...elem, newDay: newDayMessage !== day ?? false }
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

        <ListMessages messages={messages} />
      </div>
      <form onSubmit={formSendChat} name="formUserData" id="formSendChat">
        <input
          id="userName"
          name="userName"
          type="text"
          placeholder="Введите имя"
          onChange={(e) => setNameValue(e.target.value)}
          value={nameValue}
        />
        <input
          id="userMessage"
          name="userMessage"
          type="text"
          placeholder="Напишите сообщение..."
          onChange={(e) => setMessageValue(e.target.value)}
          value={messageValue}
        />
        <button id="sendMessage" name="sendMessage">
          &rsaquo;
        </button>
      </form>
    </div>
  )
}

export default React.memo(Chat)
