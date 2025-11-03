import { useState } from "react"
import { defaultProjects } from "../data/defaultProjects"
import type { ProjectType } from "../types"
const STORAGE_KEY = "momento_projects"
import { v4 as uuidv4 } from "uuid"

export const useProjects = () => {
  const [projects, setProjects] = useState(() => {
    // const rawProjects = localStorage.getItem("momento_projects")
    // return rawProjects ? JSON.parse(rawProjects) : defaultProjects

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
    setProjects((prev: Array<ProjectType>) => [
      ...prev,
      {
        // id: uuidv4(),
        // title: newProject.title.trim(),
        // description: newProject.description.trim(),
        // createdAt: new Date().toISOString(),
        newProject,
      },
    ])
    localStorage.setItem("momento_projects", JSON.stringify(projects))
    console.log("added the new project")
  }

  const deleteProject = (id: string) => {
    console.log("delete proejct: ", id)
  }

  return { projects, addProject, deleteProject }
}
