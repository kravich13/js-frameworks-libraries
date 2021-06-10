import { List, makeStyles } from '@material-ui/core'
import React from 'react'
import { Temp } from './Temp'

const useStyles = makeStyles({
  root: { display: 'flex', width: '60%' },
})

export const ListOfTemp: React.FC<any> = ({ hoursTemp, index }) => {
  const classes = useStyles()
  return (
    <List className={classes.root}>
      {hoursTemp.map((elem: any, index: number) => {
        return <Temp key={index} title={elem} index={index + 1} />
      })}
    </List>
  )
}
