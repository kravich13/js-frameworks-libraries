import { CREATE_TASK } from './types'

export function createTask(task: any) {
  return {
    type: CREATE_TASK,
    payload: task
  }
}
