import React, { useState } from 'react'
import Rooms from '../components/Rooms'
import Chat from '../components/Chat'
import { ChatInfo } from '../components/Chat-info'
import { io } from 'socket.io-client'
import { IMessage } from '../interfaces'

const socket: any = io()

const ChatRoom: React.FC = () => {
  const [clickRoom, setClickRoom] = useState<string>('')

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
    <section id="main-window-chat">
      <ChatInfo socket={socket} clickRoom={clickRoom} />
      <div id="block-rooms-chat">
        <Rooms socket={socket} setClickRoom={setClickRoom} />
        <Chat socket={socket} clickRoom={clickRoom} chatRequest={chatRequest} />
      </div>
    </section>
  )
}

export default React.memo(ChatRoom)
