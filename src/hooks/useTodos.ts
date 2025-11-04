import { useState } from "react"
import { defaultTodos } from "../data/defaultTodos"
import type { TodoType } from "../types"
const STORAGE_KEY = "momento_todos"

export const useTodos = () => {
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
    if (newTodo.title.length == 0) {
      console.log("Todo title is empty")
      return
    }
    setTodos((prev: Array<TodoType>) => [...prev, newTodo])

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...todos, newTodo]))

    console.log("added the new todo")
  }

  const toggleTodo = (id: string) => {
    setTodos((prev: Array<TodoType>) =>
      prev.map((todo: TodoType) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        todos.map((todo: TodoType) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        )
      )
    )
  }
  const deleteTodo = (id: string) => {
    console.log("delete todo: ", id)
    setTodos((prev: Array<TodoType>) => prev.filter((todo) => todo.id !== id))
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(todos.filter((todo: TodoType) => todo.id !== id))
    )
    console.log("deleted the  todo")
  }

  return { todos, addTodo, deleteTodo, toggleTodo }
}
