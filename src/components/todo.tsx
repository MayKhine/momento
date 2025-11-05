import type { TodoType } from "../types"
import { FaRegTimesCircle, FaRegCircle, FaRegCheckCircle } from "react-icons/fa"

type TodoProps = {
  todo: TodoType
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export const Todo = ({ todo, onToggle, onDelete }: TodoProps) => {
  return (
    <li className="flex gap-2 p-2 mb-2">
      {!todo.complete && (
        <div
          className="hover:cursor-pointer align-top "
          onClick={() => {
            onToggle(todo.taskId)
          }}
        >
          <FaRegCircle className="w-5 h-5 mt-0.5" strokeWidth={1} />
        </div>
      )}

      {todo.complete && (
        <div
          className="hover:cursor-pointeralign-top self-start"
          onClick={() => {
            onToggle(todo.taskId)
          }}
        >
          <FaRegCheckCircle className="w-5 h-5 mt-0.5" strokeWidth={1} />
        </div>
      )}

      {todo.complete && (
        <p className="grow align-top line-through">{todo.task}</p>
      )}
      {!todo.complete && <p className="grow align-top">{todo.task}</p>}

      <button
        className=" hover:cursor-pointer  align-top self-start"
        onClick={() => {
          onDelete(todo.taskId)
        }}
      >
        <FaRegTimesCircle className="w-10 h-5 mt-0.5" />
      </button>
    </li>
  )
}
