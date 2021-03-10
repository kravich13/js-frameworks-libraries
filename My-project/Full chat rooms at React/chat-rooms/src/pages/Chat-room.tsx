import React, { useState } from 'react'
import { Rooms } from '../components/Rooms'
import { Chat } from '../components/Chat'
import { ChatInfo } from '../components/Chat-info'
import { io } from 'socket.io-client'
import { IMessage } from '../interfaces'
const socket: any = io()

export const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<any>([])
  const [clickRoom, setClickRoom] = useState<string>('')

  async function chatRequest(room: string = 'firstRoom') {
    const response = await fetch('/rooms/allmessages', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ clickRoom: room })
    })
    const arrNameRooms: IMessage[] = await response.json()
    setClickRoom(room)
    return arrNameRooms
  }

  return (
    <section id="main-window-chat">
      <ChatInfo socket={socket} />
      <div id="block-rooms-chat">
        <Rooms
          socket={socket}
          chatRequest={chatRequest}
          setMessages={setMessages}
        />
        <Chat
          socket={socket}
          chatRequest={chatRequest}
          arrMessagesState={{ messages, setMessages }}
          clickRoom={clickRoom}
        />
      </div>
    </section>
  )
}
