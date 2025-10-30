import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

import type { Todo } from "../types"
const STORAGE_KEY = "momento_todo_list"

export const TodoPage = () => {
  const todoListDefault: Array<Todo> = [
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
    setTodoList((prev: Array<Todo>) => [
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
    setTodoList((prev: Array<Todo>) =>
      prev.map((todo: Todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
  }

  return (
    <div>
      <div>To do page</div>
      <div>
        <div className="bg-pink-200 min-h-20">
          <input
            value={newTodo}
            onChange={(e) => {
              setNewTodoError(false)
              setNewTodo(e.target.value)
            }}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Add a new task..."
            className="flex-1 px-3 py-2 border rounded-lg"
          />
          <button
            onClick={addTask}
            //disabled={!newTodo.trim()}
            className="bg-amber-300 p-3 hover:cursor-pointer"
          >
            Add Task
          </button>
          {newTodoError && (
            <div className="text-red-600 text-sm">
              Please write something in the box
            </div>
          )}
        </div>

        <div>
          {todoList.map((todo: Todo, index: number) => {
            return (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => {
                    console.log("toggle task")
                    toggleTask(todo.id)
                  }}
                />
                {todo.title}
              </li>
            )
          })}
        </div>
      </div>
    </div>
  )
}
