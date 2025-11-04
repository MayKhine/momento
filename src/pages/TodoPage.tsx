import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import type { TodoType } from "../types"
import { ActionButton } from "../components/ActionButton"
import { SideBar } from "../components/SideBar"
import { Todo } from "../components/Todo"
import { useTodos } from "../hooks/useTodos"

export const TodoPage = () => {
  const { todos, addTodo, deleteTodo, toggleTodo } = useTodos()
  const [newTodo, setNewTodo] = useState("")
  const [newTodoError, setNewTodoError] = useState(false)

  // const toggleTask = (id: string) => {
  //   setTodoList((prev: Array<TodoType>) =>
  //     prev.map((todo: TodoType) =>
  //       todo.id === id ? { ...todo, done: !todo.done } : todo
  //     )
  //   )
  // }

  const addNewTodo = () => {
    if (newTodo.length == 0) {
      console.log(" no todo . len 0")
      return
    }
    addTodo({ id: uuidv4(), title: newTodo, done: false })
    setNewTodo("")
  }

  return (
    <div className=" flex bg-gray-50">
      <SideBar />
      <div className="flex-col grow">
        <div className="flex flex-row gap-2 p-2 pt-4 pb-4 content-center bg-amber-100 flex-wrap justify-end">
          <div className="flex flex-col grow">
            <input
              value={newTodo}
              onChange={(e) => {
                setNewTodoError(false)
                setNewTodo(e.target.value)
              }}
              onKeyDown={(e) => e.key === "Enter" && addNewTodo()}
              placeholder="Add a new task..."
              className="flex-1 px-3 py-2 border-2 rounded-lg"
            />
            <div className="h-3">
              {newTodoError && (
                <div className="text-red-600 text-sm">
                  Please write something in the box
                </div>
              )}
            </div>
          </div>
          <ActionButton text="Add Task" onClick={addNewTodo} />
        </div>

        <div className="flex-col">
          {todos.map((todo: TodoType, index: number) => {
            return (
              <Todo
                key={index}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={() => {
                  deleteTodo(todo.id)
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
