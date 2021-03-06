import React from 'react'
import { Rooms } from '../components/Rooms'
import { Chat } from '../components/Chat'
import { ChatInfo } from '../components/Chat-info'

export const ChatRoom: React.FC = () => {
  return (
    <section id="main-window-chat">
      <ChatInfo />
      <div id="block-rooms-chat">
        <Rooms />
        <Chat />
      </div>
    </section>
  )
}
