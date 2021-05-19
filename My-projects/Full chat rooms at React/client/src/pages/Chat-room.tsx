import React, { useEffect, useState, useRef } from 'react'
import Rooms from '../components/Rooms'
import Chat from '../components/Chat'
import { ChatInfo } from '../components/Chat-info'
import { io } from 'socket.io-client'
import { IMessage } from '../interfaces'

const socket: any = io()

const ChatRoom: React.FC = () => {
  const $mainWindow = useRef<HTMLDivElement>(null)
  const [clickRoom, setClickRoom] = useState<string>('')
  const [heightWindow, setHeightWindow] = useState<string>('0px')

  useEffect((): void => {
    const $divInfoHeight: number = document.getElementById('chat-info')!
      .offsetHeight
    const needHeight: number =
      $mainWindow.current!.offsetHeight - $divInfoHeight - 5
    setHeightWindow(`${needHeight}px`)
  }, [])

  async function chatRequest(room: string = clickRoom) {
    try {
      const response = await fetch('/rooms', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ message: 'allMessages', clickRoom: room })
      })
      const arrMessages: IMessage[] = await response.json()
      setClickRoom(room)
      return arrMessages
    } catch (err) {
      alert('Произошла ошибка при запросе, попробуйте позже')
    }
  }

  return (
    <section id="main-window-chat" ref={$mainWindow}>
      <ChatInfo socket={socket} clickRoom={clickRoom} />
      <div id="block-rooms-chat" style={{ height: heightWindow }}>
        <Rooms socket={socket} setClickRoom={setClickRoom} />
        <Chat socket={socket} clickRoom={clickRoom} chatRequest={chatRequest} />
      </div>
    </section>
  )
}

export default React.memo(ChatRoom)
