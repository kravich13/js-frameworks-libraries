import React, { useEffect, useRef, useState } from 'react'
import BlocksTask from '../components/BlocksTask'
import { FormAddTask } from '../components/FormAddTask'
// import { ITaskList_blocksTask } from '../interfaces'
import { connect } from 'react-redux'
import { createTask } from '../redux/actions'

const TaskList: React.FC<any> = ({ createTask, blocksTask }) => {
  const [hours, setHours] = useState<string[]>([])
  const [taskHidden, setTaskHidden] = useState<boolean>(false)
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

  useEffect(() => {
    const arrayHours: string[] = []

    for (let i: number = 0; i < 24; i++) {
      if (i < 1 || i > 23) arrayHours.push(`00:00`)
      else {
        i < 10 ? arrayHours.push(`0${i}:00`) : arrayHours.push(`${i}:00`)
      }
    }
    setHours(arrayHours)
  }, [])

  const formAddTask = (event: React.ChangeEvent<HTMLFormElement>): any => {
    event.preventDefault()

    if ($addTitle.current.value.length < 2) {
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
        const blockSize = elem.getBoundingClientRect()

        const finallyHeightPX: number =
          differenceMinutes < 15
            ? blockSize.height / 4
            : Math.floor(differenceMinutes * (blockSize.height / 60))

        const firstPos: number =
          startMin === 0
            ? blockSize.top
            : blockSize.top + startMin * (blockSize.height / 60)

        function test() {
          const startPosLeft = elem.children[1].getBoundingClientRect().left
          blocksTask.forEach((elem: any) => {
            const { posTop, posHeight } = elem
            //   start: elem.posTop,
            //   end: elem.posTop + elem.posHeight
            // }

            if (
              firstPos >= posTop &&
              firstPos + finallyHeightPX <= posTop + posHeight
            ) {
              return startPosLeft + 100
              console.log('попал в диапазон')
            }
            return startPosLeft
          })
        }

        createTask({
          id: new Date().getTime(),
          title: $addTitle.current.value,
          posTop: firstPos,
          // posLeft: elem.children[1].getBoundingClientRect().left,
          posLeft: test(),
          posHeight: finallyHeightPX
        })

        alert('Задача создана!')
        $addTitle.current.value = ''
        // window.scrollBy(0, firstPos - finallyHeightPX)
        return
      }
    }
  }

  return (
    <React.Fragment>
      <button id="task-hiddenForm" onClick={() => setTaskHidden(!taskHidden)}>
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

      <BlocksTask />

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
    </React.Fragment>
  )
}

const mapDispatchToProps = { createTask }

const mapStateToProps = (state: any) => {
  return {
    blocksTask: state.tasks.tasks
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
