import React, { useEffect, useState, useRef, useContext } from 'react'
import Rooms from '../components/Rooms'
import Chat from '../components/Chat'
import { ChatInfo } from '../components/Chat-info'
import { Alert } from '../components/Alert'
import { io, Socket } from 'socket.io-client'
import Context from '../Context'
import '../styles/chat-room.css'

const socket: Socket = io()

const ChatRoom: React.FC = () => {
  const { hiddenAlert } = useContext(Context)
  const $mainWindow = useRef<HTMLDivElement>(null)
  const [clickRoom, setClickRoom] = useState<string>('')
  const [loader, setLoader] = useState<boolean>(false)
  const [heightWindow, setHeightWindow] = useState<number>(0)

  useEffect((): void => {
    const $divInfoHeight: number =
      document.getElementById('chat-info')!.offsetHeight
    const needHeight: number =
      $mainWindow.current!.offsetHeight - $divInfoHeight - 5
    setHeightWindow(needHeight)
  }, [])

  return (
    <section id="main-window-chat" ref={$mainWindow}>
      {hiddenAlert && <Alert />}
      <ChatInfo socket={socket} clickRoom={clickRoom} />
      <div
        id="block-rooms-chat"
        style={{ height: heightWindow > 500 ? `${heightWindow}px` : `500px` }}
      >
        <Rooms socket={socket} setClickRoom={setClickRoom} loader={loader} />
        <Chat
          socket={socket}
          clickRoom={clickRoom}
          loader={loader}
          setLoader={setLoader}
        />
      </div>
    </section>
  )
}

export default React.memo(ChatRoom)
