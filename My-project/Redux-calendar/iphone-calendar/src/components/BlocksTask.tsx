import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import BlockTask from '../components/BlockTask'
import { IMapStateToProps } from '../interfaces'

const mapStateToProps = (state: IMapStateToProps) => {
  return { blocksTask: state.tasks.tasks }
}

const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

const BlocksTask: React.FC<PropsFromRedux> = ({ blocksTask }) => {
  return (
    <React.Fragment>
      {blocksTask.map((elem) => {
        return <BlockTask elem={elem} key={elem.id} />
      })}
    </React.Fragment>
  )
}

export default connect(mapStateToProps)(BlocksTask)
