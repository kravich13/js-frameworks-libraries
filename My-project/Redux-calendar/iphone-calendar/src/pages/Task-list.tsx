import React, { useCallback, useEffect, useRef, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import {
  createTask,
  changeTask,
  deleteTask,
  tasks_currentDay,
  clear_nofificationTasks
} from '../redux/actions'
import { BlocksTask } from '../components/BlocksTask'
import { FormAddTask } from '../components/FormAddTask'
import {
  ImapDispatchToProps,
  IMapStateToProps,
  ITaskList_dynamicPosLeft,
  ITaskList_blocksTask,
  ITaskList_req_change
} from '../interfaces'

const mapDispatchToProps: ImapDispatchToProps = {
  createTask,
  changeTask,
  deleteTask,
  tasks_currentDay,
  clear_nofificationTasks
}
const mapStateToProps = (state: IMapStateToProps) => {
  return {
    blocksTask: state.tasks.tasks,
    dateClickDay: state.tasks.dateClickDay,
    notification: state.tasks.notification,
    authorized: state.auth.authorized
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

const TaskList: React.FC<PropsFromRedux> = ({
  blocksTask,
  authorized,
  dateClickDay,
  notification,
  createTask,
  changeTask,
  deleteTask,
  tasks_currentDay,
  clear_nofificationTasks
}) => {
  const [hours, setHours] = useState<string[]>([])
  const [taskHidden, setTaskHidden] = useState<boolean>(true)
  const [openDay, setOpenDay] = useState<string>('None')
  const $addTitle = useRef<any>(null)
  const $startTask = useRef<any>(null)
  const $endTask = useRef<any>(null)
  const $blocksTime = useRef<any[]>([])

  const date: Date = new Date()
  const currentHrs: string | number =
    date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  const currentMin: string | number =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  const currentTime: string = `${currentHrs}:${currentMin}`

  const clearNotification = useCallback((): void => {
    clear_nofificationTasks()
  }, [clear_nofificationTasks])

  useEffect((): void => {
    if (notification) {
      alert(notification)
      clearNotification()
    }
  }, [notification, clearNotification])

  useEffect((): void => {
    const arrayHours: string[] = []

    for (let i: number = 0; i < 24; i++) {
      if (i < 1 || i > 23) arrayHours.push(`00:00`)
      else {
        i < 10 ? arrayHours.push(`0${i}:00`) : arrayHours.push(`${i}:00`)
      }
    }
    setHours(arrayHours)

    if (authorized) {
      tasks_currentDay({
        userName: authorized,
        timestamp: +new Date(dateClickDay)
      })
    }
  }, [dateClickDay, authorized, tasks_currentDay])

  useEffect((): void => {
    if (!dateClickDay) return

    const dateDay: Date = new Date(dateClickDay)
    const currentDate = {
      year: dateDay.getFullYear(),
      day: dateDay.getDate(),
      month: dateDay.toLocaleString('en', { month: 'long' }),
      weekDay: dateDay.toLocaleString('en', { weekday: 'long' })
    }
    const { year, day, month, weekDay } = currentDate

    setOpenDay(`${weekDay} ${day} ${month} ${year}`)
  }, [dateClickDay])

  const formAddTask = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const addTitle: string = $addTitle.current.value
    if (addTitle.length < 2) {
      $addTitle.current.value = ''
      $addTitle.current.placeholder = 'Меньше двух символов'
      return
    }

    const dateStart: Date = $startTask.current.valueAsDate
    const dateEnd: Date = $endTask.current.valueAsDate

    if (!dateStart) return alert('Не указано начальное время')
    if (!dateEnd) return alert('Не указано конечное время')

    const startHours: number = dateStart.getUTCHours()
    const endHours: number = dateEnd.getUTCHours()
    const startMin: number = dateStart.getMinutes()
    const endMin: number = dateEnd.getMinutes()

    let differenceMinutes: number = 0
    let posBlock: string = 'center'

    if (startHours === endHours) {
      if (startMin < endMin) differenceMinutes = min_minus()
      else return alert('Неверно введены минуты')
    } else {
      if (startHours < endHours) {
        differenceMinutes =
          startMin < endMin
            ? min_minus() + 60 * hrs_minus()
            : startMin > endMin
            ? 60 - startMin + endMin + 60 * (hrs_minus() - 1)
            : hrs_minus() * 60
      } else return alert('Неверно введены часы')
    }

    function min_minus(): number {
      return endMin - startMin
    }
    function hrs_minus(): number {
      return endHours - startHours
    }

    for (const elem of $blocksTime.current) {
      if (elem.children[0].id === `task${dateStart.getUTCHours()}`) {
        const finallyHeight: number =
          differenceMinutes < 15
            ? elem.offsetHeight / 4
            : Math.ceil(differenceMinutes * (elem.offsetHeight / 60))

        const firstPos: number =
          startMin === 0
            ? elem.offsetTop
            : Math.ceil(elem.offsetTop + startMin * (elem.offsetHeight / 60))

        const posLeft: number | null = dynamic_posLeft({
          elem,
          firstPos,
          heightBlock: finallyHeight
        })

        if (posLeft === null) return alert('Блок уже занят!')
        createTask({
          id: new Date().getTime(),
          timestamp: dateClickDay,
          userName: authorized,
          title: addTitle,
          posTop: firstPos,
          height: finallyHeight,
          position: posBlock,
          posLeft
        })

        // $addTitle.current.value = ''
        // window.scrollBy(0, firstPos - finallyHeightPX)
        return
      }
    }

    function dynamic_posLeft({
      elem,
      firstPos,
      heightBlock
    }: ITaskList_dynamicPosLeft): number | null {
      const startPosLeft: number = elem.offsetLeft + elem.children[1].offsetLeft

      if (!blocksTask.length) return startPosLeft

      let divisionOfWidth: boolean = false

      for (const elem of blocksTask) {
        const { posTop, height, position } = elem

        const endExisting: number = posTop + height
        const endCurrent: number = firstPos + heightBlock

        const startPosInTheRange: boolean =
          firstPos >= posTop && firstPos <= endExisting
        const endPosInTheRange: boolean =
          endCurrent >= posTop && endCurrent <= endExisting
        const existingInTheRange: boolean =
          posTop >= firstPos && endExisting <= endCurrent

        const hitTheRange: boolean =
          startPosInTheRange || endPosInTheRange || existingInTheRange

        if (hitTheRange) {
          if (position === 'right') return null

          const objData_req: ITaskList_req_change = {
            userName: authorized,
            tasks: [{ id: elem.id, position: 'left', posLeft: 60 }]
          }
          changeTask(objData_req)

          divisionOfWidth = true
        }
      }

      if (divisionOfWidth) {
        posBlock = 'right'
        return startPosLeft + 100
      }
      return startPosLeft
    }
  }

  async function fn_delTask(delTask: ITaskList_blocksTask) {
    if (delTask.position === 'center') {
      return deleteTask({ id: delTask.id, userName: authorized, task: delTask })
    }

    const delPosition: string = delTask.position
    const delPosTop: number = delTask.posTop
    const delPosEnd: number = delPosTop + delTask.height

    const objData: ITaskList_req_change = {
      userName: authorized,
      tasks: []
    }

    for (const elem of blocksTask) {
      if (delPosition === 'left' && elem.position === 'right') {
        actionsWithRemote(elem)
      } else if (delPosition === 'right' && elem.position === 'left') {
        actionsWithRemote(elem)
      }
    }

    if (objData.tasks.length) {
      await deleteTask({
        userName: authorized,
        task: delTask
      })
      await changeTask(objData)
      return
    }

    function actionsWithRemote(elem: ITaskList_blocksTask) {
      const { posTop, height } = elem

      const posEnd: number = posTop + height
      const startPosInTheRange: boolean =
        posTop >= delPosTop && posTop <= delPosEnd
      const endPosInTheRange: boolean =
        posEnd >= delPosTop && posEnd <= delPosEnd

      // const existingInTheRange: boolean =
      //   delPosTop >= posTop && delPosEnd <= posEnd

      if (startPosInTheRange && endPosInTheRange) {
        return objData.tasks.push({
          ...elem,
          position: 'center',
          posLeft: 60
        })
      }
      // if (existingInTheRange) {
      //   touchVariableBlock(elem, delTask.id)
      // }
    }

    // function touchVariableBlock(block: ITaskList_blocksTask, delID: number) {
    //   const variablePosition: string = block.position

    //   for (const elem of blocksTask) {
    //     if (variablePosition === 'right' && elem.position === 'left') {
    //       unchangedAdjacentBlock(elem, delID)
    //     } else {
    //       if (variablePosition === 'left' && elem.position === 'right') {
    //         unchangedAdjacentBlock(elem, delID)
    //       }
    //     }
    //   }
    //   console.log(count)
    // }

    // function unchangedAdjacentBlock(
    //   block: ITaskList_blocksTask,
    //   delID: number
    // ) {
    //   const variablePosTop: number = block.posTop
    //   const variablePosEnd: number = delPosTop + block.height

    //   const { posTop, height } = block
    //   const posEnd: number = posTop + height
    //   const startPosInTheRange: boolean =
    //     posTop >= variablePosTop && posTop <= variablePosEnd
    //   const hitTheRange: boolean =
    //     posEnd >= variablePosTop && posEnd <= variablePosEnd

    //   const existingInTheRange: boolean =
    //     delPosTop >= posTop && delPosEnd <= posEnd
    // }
  }

  return (
    <React.Fragment>
      {authorized && (
        <React.Fragment>
          <h3 style={{ margin: '30px' }}>{openDay}</h3>
          <button
            id="task-hiddenForm"
            onClick={() => setTaskHidden(!taskHidden)}
          >
            {!taskHidden ? 'Добавить событие' : 'Скрыть окно'}
          </button>

          {taskHidden && (
            <FormAddTask
              formAddTask={formAddTask}
              addTitle={$addTitle}
              currentTime={currentTime}
              startTask={$startTask}
              endTask={$endTask}
            />
          )}

          <div id="block-allTasks">
            <BlocksTask blocks={blocksTask} fn_delTask={fn_delTask} />
            <ul id="task-list">
              {hours.map((elem, index: number) => {
                return (
                  <li
                    className="block-time-toDo"
                    key={index}
                    ref={(el) => ($blocksTime.current[index] = el)}
                  >
                    <h3 id={`task${index}`} className="time-toDo">
                      {elem}
                    </h3>
                    <div className="container-toDo"></div>
                  </li>
                )
              })}
            </ul>
          </div>
        </React.Fragment>
      )}
      <div>Вы не авторизировались, функционал недоступен.</div>
    </React.Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
