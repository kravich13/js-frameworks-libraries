import React from 'react'
import { IListMessages_Props, IMessage } from '../interfaces'
import '../styles/list-messages.css'
import { Message } from './Message'

const ListMessages: React.FC<IListMessages_Props> = ({ messages }) => {
  return (
    <React.Fragment>
      {messages.map((message: IMessage) => {
        return <Message key={message._id} message={message} />
      })}
    </React.Fragment>
  )
}

export default React.memo(ListMessages)
