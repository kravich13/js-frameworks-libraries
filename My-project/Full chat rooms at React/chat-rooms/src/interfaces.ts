interface IChatProps {
  socket: any
  chatRequest: Function
  arrMessagesState: any
  clickRoom: string
}

interface IRoomsProps {
  socket: any
  chatRequest: Function
  setMessages: any
}

interface IChatInfoProps {
  socket: any
}

interface IMessage {
  _id: string
  user: string
  message: string
  createdAt: string
}

interface IRoom {
  id: string
  title: string
  click: boolean
  hover: boolean
}

export type { IChatProps, IRoomsProps, IChatInfoProps, IMessage, IRoom }
