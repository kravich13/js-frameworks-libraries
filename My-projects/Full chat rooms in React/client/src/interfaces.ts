interface IContext {
  stateAlert: string
  hiddenAlert: boolean
  setStateAlert: Function
  setHiddenALert: Function
}
interface IChatProps {
  socket: any
  clickRoom: string
  loader: boolean
  setLoader: Function
}

interface IRoomsProps {
  socket: any
  setClickRoom: Function
  loader: boolean
}

interface IChatInfoProps {
  socket: any
  clickRoom: string
}

interface IListRooms_Props {
  rooms: IRoom[]
  clickLi: Function
  clickDelete: Function
}

interface IRoom_Props {
  clickLi: Function
  id: string
  title: string
  click: boolean
  clickDelete: Function
}

interface IListMessages_Props {
  messages: IMessage[]
}

interface IMessage_Props {
  message: IMessage
}

interface IMessage {
  _id: string
  user: string
  message: string
  createdAt: string
  newDay: boolean
}

interface IMessageFromRes {
  _id: string
  user: string
  message: string
  createdAt: string
}

interface IRoom {
  id: string
  title: string
  click: boolean
}

interface ISocketLastMessage {
  lastData: IMessage
  sendFromRoom: string
}

interface styleCss {
  [key: string]: string
}

interface styleFinally {
  [key: string]: styleCss
}

export type {
  IContext,
  IChatProps,
  IListRooms_Props,
  IRoomsProps,
  IChatInfoProps,
  IRoom_Props,
  IListMessages_Props,
  IMessage_Props,
  IMessage,
  IMessageFromRes,
  IRoom,
  ISocketLastMessage,
  styleFinally,
}
