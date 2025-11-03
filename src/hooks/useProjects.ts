import { useState } from "react"
import { defaultProjects } from "../data/defaultProjects"
import type { ProjectType } from "../types"
const STORAGE_KEY = "momento_projects"

export const useProjects = () => {
  const [projects, setProjects] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) return JSON.parse(stored)
    } catch (e) {
      console.warn("Failed to parse stored todos:", e)
    }
    return defaultProjects
  })

  const addProject = (newProject: typeof projects) => {
    console.log("In hook: add proejct")
    if (newProject.title.length == 0) {
      console.log("title is empty")
      return
    }
    setProjects((prev: Array<ProjectType>) => [...prev, newProject])

    localStorage.setItem(
      "momento_projects",
      JSON.stringify([...projects, newProject])
    )

    console.log("added the new project")
  }

  const deleteProject = (id: string) => {
    console.log("delete proejct: ", id)
    setProjects((prev: Array<ProjectType>) =>
      prev.filter((project) => project.id !== id)
    )
    localStorage.setItem(
      "momento_projects",
      JSON.stringify(
        projects.filter((project: ProjectType) => project.id !== id)
      )
    )
    console.log("deleted the  project")
  }

  return { projects, addProject, deleteProject }
}
