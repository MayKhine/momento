import { useEffect, useState } from "react"
import { defaultTodos } from "../data/defaultTodos"
import type { TodoType } from "../types"

export const useTodos = () => {
  const STORAGE_KEY = "momento_todos"

  const [todos, setTodos] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) return JSON.parse(stored)
    } catch (e) {
      console.warn("Failed to parse stored todos:", e)
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTodos))

    return defaultTodos
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    } catch (e) {
      console.error("Failed to save projects:", e)
    }
  }, [todos])

  const addTodo = (newTodo: TodoType) => {
    if (!newTodo.task?.trim()) {
      console.log("Task is empty")
      return
    }
    setTodos((prev: Array<TodoType>) => [...prev, newTodo])
  }

  const toggleTodo = (taskId: string) => {
    setTodos((prev: Array<TodoType>) =>
      prev.map((todo: TodoType) =>
        todo.taskId === taskId ? { ...todo, complete: !todo.complete } : todo
      )
    )
  }

  const deleteTodo = (taskId: string) => {
    setTodos((prev: Array<TodoType>) =>
      prev.filter((todo) => todo.taskId !== taskId)
    )
  }

  return { todos, addTodo, deleteTodo, toggleTodo }
}
