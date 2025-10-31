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
      {!todo.done && (
        <div
          className="hover:cursor-pointer align-top "
          onClick={() => {
            onToggle(todo.id)
          }}
        >
          <FaRegCircle className="w-5 h-5 mt-0.5" strokeWidth={1} />
        </div>
      )}

      {todo.done && (
        <div
          className="hover:cursor-pointeralign-top self-start"
          onClick={() => {
            onToggle(todo.id)
          }}
        >
          <FaRegCheckCircle className="w-5 h-5 mt-0.5" strokeWidth={1} />
        </div>
      )}

      <p className="grow align-top">{todo.title}</p>
      <button
        className=" hover:cursor-pointer  align-top self-start"
        onClick={() => {
          onDelete(todo.id)
        }}
      >
        <FaRegTimesCircle className="w-10 h-5 mt-0.5" />
      </button>
    </li>
  )
}
