import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { Todo } from "../components/todo"
import type { TodoType } from "../types"
import { ActionButton } from "../components/ActionButton"
import { Header } from "../components/Header"
import { SideBar } from "../components/SideBar"
const STORAGE_KEY = "momento_todo_list"

// type TodoPageProps = {
//   todoListDefault: Array<TodoType>
// }
export const TodoPage = () => {
  const todoListDefault: Array<TodoType> = [
    {
      id: uuidv4(),
      title: "Code for one hour",
      done: true,
    },
    {
      id: uuidv4(),
      title: "Reply emails",
      done: false,
    },
  ]
  const [todoList, setTodoList] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) return JSON.parse(stored)
    } catch (e) {
      console.warn("Failed to parse stored todos:", e)
    }
    return todoListDefault
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList))
    } catch (e) {
      console.error("Failed to save todos:", e)
    }
  }, [todoList])

  const [newTodo, setNewTodo] = useState("")
  const [newTodoError, setNewTodoError] = useState(false)

  const addTask = () => {
    if (newTodo.length == 0) {
      setNewTodoError(true)
      return
    }
    setTodoList((prev: Array<TodoType>) => [
      ...prev,
      {
        id: uuidv4(),
        title: newTodo.trim(),
        done: false,
      },
    ])
    setNewTodo("")
  }

  const toggleTask = (id: string) => {
    setTodoList((prev: Array<TodoType>) =>
      prev.map((todo: TodoType) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
  }

  const deleteTask = (id: string) => {
    setTodoList((prev: Array<TodoType>) =>
      prev.filter((todo) => todo.id !== id)
    )
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
              onKeyDown={(e) => e.key === "Enter" && addTask()}
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
          <ActionButton text="Add Task" onClick={addTask} />
        </div>

        <div className="flex-col">
          {todoList.map((todo: TodoType, index: number) => {
            return (
              <Todo
                key={index}
                todo={todo}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
