interface IChatProps {
  socket: any
  clickRoom: string
  chatRequest: Function
}

interface IRoomsProps {
  socket: any
  setClickRoom: Function
}

interface IChatInfoProps {
  socket: any
  clickRoom: string
}

interface IListRoomsProps {
  clickLi: Function
  id: string
  title: string
  click: boolean
  hover: boolean
  outLi: Function
  overLi: Function
  clickDelete: Function
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

interface ISocketLastMessage {
  lastData: IMessage
  sendFromRoom: string
}

export type {
  IChatProps,
  IRoomsProps,
  IChatInfoProps,
  IListRoomsProps,
  IMessage,
  IRoom,
  ISocketLastMessage
}
