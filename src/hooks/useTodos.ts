import { useState } from "react"
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
    return defaultTodos
  })

  const addTodo = (newTodo: TodoType) => {
    console.log("In hook: add todo")
    if (newTodo.task.length == 0) {
      console.log("Todo title is empty")
      return
    }
    setTodos((prev: Array<TodoType>) => [...prev, newTodo])

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...todos, newTodo]))

    console.log("added the new todo")
  }

  const toggleTodo = (taskId: string) => {
    setTodos((prev: Array<TodoType>) =>
      prev.map((todo: TodoType) =>
        todo.taskId === taskId ? { ...todo, complete: !todo.complete } : todo
      )
    )
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        todos.map((todo: TodoType) =>
          todo.taskId === taskId ? { ...todo, complete: !todo.complete } : todo
        )
      )
    )
  }
  const deleteTodo = (taskId: string) => {
    console.log("delete todo: ", taskId)
    setTodos((prev: Array<TodoType>) =>
      prev.filter((todo) => todo.taskId !== taskId)
    )
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(todos.filter((todo: TodoType) => todo.taskId !== taskId))
    )
    console.log("deleted the  todo")
  }

  return { todos, addTodo, deleteTodo, toggleTodo }
}
