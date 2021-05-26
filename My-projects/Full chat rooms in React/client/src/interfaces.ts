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

interface IListMessagesProps {
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
  hover: boolean
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
  IRoomsProps,
  IChatInfoProps,
  IListRoomsProps,
  IListMessagesProps,
  IMessage,
  IMessageFromRes,
  IRoom,
  ISocketLastMessage,
  styleFinally,
}
