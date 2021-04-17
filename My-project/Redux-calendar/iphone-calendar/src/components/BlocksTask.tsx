import React from 'react'
import { connect } from 'react-redux'
import { BlockTask } from '../components/BlockTask'

const BlocksTask: React.FC<any> = ({ blocksTask }) => {
  return blocksTask.map((elem: any, index: number) => {
    return <BlockTask elem={elem} count={index} key={elem.id} />
  })
}

const mapStateToProps = (state: any) => {
  return {
    blocksTask: state.tasks.tasks
  }
}

export default connect(mapStateToProps, null)(BlocksTask)
