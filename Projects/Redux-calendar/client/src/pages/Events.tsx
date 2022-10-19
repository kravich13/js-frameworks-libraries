import React, { useEffect, useRef, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import {
  createTask,
  changeTask,
  deleteTask,
  tasks_currentDay,
  actions_withAlert,
} from '../redux/actions'
import { BlocksTask } from '../components/BlocksTask'
import { FormAddTask } from '../components/FormAddTask'
import { BlocksTime } from '../components/tasksTime/BlocksTime'
import {
  ImapDispatchToProps,
  IMapStateToProps,
  ITaskList_dynamicPosLeft,
  ITaskList_blocksTask,
  ITaskList_req_change,
  ITaskList_blockInRange,
} from '../interfaces'
import '../styles/task-list.css'

const mapDispatchToProps: ImapDispatchToProps = {
  createTask,
  changeTask,
  deleteTask,
  tasks_currentDay,
  actions_withAlert,
}
const mapStateToProps = (state: IMapStateToProps) => {
  return {
    blocksTask: state.tasks.tasks,
    dateClickDay: state.tasks.dateClickDay,
    authorized: state.auth.authorized,
    userName: state.auth.userName,
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

const Events: React.FC<PropsFromRedux> = ({
  blocksTask,
  authorized,
  userName,
  dateClickDay,
  createTask,
  changeTask,
  deleteTask,
  tasks_currentDay,
  actions_withAlert,
}) => {
  const [hours, setHours] = useState<string[]>([])
  const [taskHidden, setTaskHidden] = useState<boolean>(false)
  const [openDay, setOpenDay] = useState<string>('None')
  const [titleValue, setTitleValue] = useState<string>('')
  const $blocksTime = useRef<HTMLLIElement[]>([])

  const timeHours: number = new Date().getHours()
  const timeMinutes: number = new Date().getMinutes()
  const currentHrs: string =
    timeHours < 10 ? `0${timeHours}` : timeHours.toString()
  const currentMin: string =
    timeMinutes < 10 ? `0${timeMinutes}` : timeMinutes.toString()
  const currentTime: string = `${currentHrs}:${currentMin}`

  const objData: ITaskList_req_change = { userName, tasks: [] }

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
      tasks_currentDay({ userName, timestamp: +new Date(+dateClickDay) })
    }
  }, [dateClickDay, authorized, userName, tasks_currentDay])

  useEffect((): void => {
    if (!dateClickDay) return

    const dateDay: Date = new Date(+dateClickDay)
    const currentDate = {
      year: dateDay.getFullYear(),
      day: dateDay.getDate(),
      month: dateDay.toLocaleString('en', { month: 'long' }),
      weekDay: dateDay.toLocaleString('en', { weekday: 'long' }),
    }
    const { year, day, month, weekDay } = currentDate

    setOpenDay(`${weekDay} ${day} ${month} ${year}`)
  }, [dateClickDay])

  const formAddTask = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const et = event.target as HTMLFormElement
    const $title = et.elements.namedItem('title') as HTMLInputElement
    const $startTime = et.elements.namedItem('startTime') as HTMLInputElement
    const $endTime = et.elements.namedItem('endTime') as HTMLInputElement

    function changeInput(): void {
      setTitleValue('')
      $title.placeholder = 'Меньше двух символов'
    }

    if (titleValue.length < 2) return changeInput()

    const dateStart = $startTime.valueAsDate as Date
    const dateEnd = $endTime.valueAsDate as Date

    if (!dateStart) return actions_withAlert('Не указано начальное время')
    if (!dateEnd) return actions_withAlert('Не указано конечное время')

    const startHours: number = dateStart.getUTCHours()
    const endHours: number = dateEnd.getUTCHours()
    const startMin: number = dateStart.getMinutes()
    const endMin: number = dateEnd.getMinutes()

    let differenceMinutes: number = 0
    let posBlock: string = 'center'

    const min_minus = (): number => endMin - startMin
    const hrs_minus = (): number => endHours - startHours

    if (startHours === endHours) {
      if (startMin < endMin) differenceMinutes = min_minus()
      else return actions_withAlert('Неверно введены минуты')
    } else {
      if (startHours < endHours) {
        differenceMinutes =
          startMin < endMin
            ? min_minus() + 60 * hrs_minus()
            : startMin > endMin
            ? 60 - startMin + endMin + 60 * (hrs_minus() - 1)
            : hrs_minus() * 60
      } else return actions_withAlert('Неверно введены часы')
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
          firstPos: firstPos,
          heightBlock: finallyHeight,
        })

        if (posLeft === null) return actions_withAlert('Блок уже занят!')

        createTask({
          id: new Date().getTime(),
          timestamp: +dateClickDay,
          userName,
          title: titleValue,
          posTop: firstPos,
          height: finallyHeight,
          position: posBlock,
          posLeft,
        })

        // window.scrollBy(0, firstPos - finallyHeight)
        return changeInput()
      }
    }

    function dynamic_posLeft({
      elem,
      firstPos,
      heightBlock,
    }: ITaskList_dynamicPosLeft): number | null {
      const startPosLeft: number = elem.offsetLeft + elem.children[1].offsetLeft

      if (!blocksTask.length) return startPosLeft

      let divisionOfWidth: boolean = false

      for (const elem of blocksTask) {
        const inRange: boolean = blockInRange({
          mainTop: firstPos,
          mainHeight: heightBlock,
          touchTop: elem.posTop,
          touchHeight: elem.height,
        })

        if (inRange) {
          if (elem.position === 'right') return null

          const objData_req: ITaskList_req_change = {
            userName,
            tasks: [{ id: elem.id, position: 'left', posLeft: 60 }],
          }

          changeTask(objData_req)
          divisionOfWidth = true
        }
      }

      if (!divisionOfWidth) return startPosLeft

      posBlock = 'right'
      return startPosLeft + 100
    }
  }

  async function fn_delTask(delTask: ITaskList_blocksTask): Promise<void> {
    if (delTask.position === 'center') {
      return deleteTask({ userName, task: delTask })
    }

    const oppositePos: string = delTask.position === 'right' ? 'left' : 'right'

    for (const elem of blocksTask) {
      if (elem.position === oppositePos) {
        const inRange: boolean = blockInRange({
          mainTop: delTask.posTop,
          mainHeight: delTask.height,
          touchTop: elem.posTop,
          touchHeight: elem.height,
        })

        if (inRange) actionsWithRemote(elem, delTask)
      }
    }

    if (objData.tasks.length) {
      await deleteTask({ userName, task: delTask })
      changeTask(objData)
      return
    }

    // Если какой-то баг с удалением, то удалить принудительно
    return deleteTask({ userName, task: delTask })
  }

  function actionsWithRemote(
    block: ITaskList_blocksTask,
    delTask: ITaskList_blocksTask
  ): void {
    const oppositePos: string = block.position === 'right' ? 'left' : 'right'
    let numberOfBlocks: number = 0

    for (const elem of blocksTask) {
      if (elem.position === oppositePos) {
        const inRange: boolean = blockInRange({
          mainTop: block.posTop,
          mainHeight: block.height,
          touchTop: elem.posTop,
          touchHeight: elem.height,
        })

        if (inRange) numberOfBlocks++
      }
    }

    if (numberOfBlocks === 1) {
      objData.tasks.push({ ...block, position: 'center', posLeft: 60 })
      return
    }

    if (numberOfBlocks > 1) return deleteTask({ userName, task: delTask })
  }

  function blockInRange(objPositions: ITaskList_blockInRange): boolean {
    const { mainTop, mainHeight, touchTop, touchHeight } = objPositions

    const endExisting: number = touchTop + touchHeight
    const endCurrent: number = mainTop + mainHeight - 1

    const startPosInTheRange: boolean =
      mainTop + 1 >= touchTop && mainTop + 1 <= endExisting
    const endPosInTheRange: boolean =
      endCurrent >= touchTop && endCurrent <= endExisting
    const existingInTheRange: boolean =
      touchTop >= mainTop + 1 && endExisting <= endCurrent

    return startPosInTheRange || endPosInTheRange || existingInTheRange
  }

  return (
    <div id="container-task-list">
      {!authorized && <div>Вы не авторизировались, функционал недоступен.</div>}
      <div id="container-auth-task-list">
        <h3 style={{ margin: '30px' }}>{openDay}</h3>
        <button id="task-hiddenForm" onClick={() => setTaskHidden(!taskHidden)}>
          {!taskHidden ? 'Добавить событие' : 'Скрыть окно'}
        </button>

        {taskHidden && (
          <FormAddTask
            formAddTask={formAddTask}
            currentTime={currentTime}
            titleValue={titleValue}
            setTitleValue={setTitleValue}
          />
        )}

        <div id="block-allTasks">
          <BlocksTime hours={hours} $blocksTime={$blocksTime} />
          <BlocksTask blocks={blocksTask} fn_delTask={fn_delTask} />
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)
