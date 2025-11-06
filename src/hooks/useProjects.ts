import { useEffect, useState } from "react"
import { defaultProjects } from "../data/defaultProjects"
import type { ProjectType } from "../types"
export const useProjects = () => {
  const STORAGE_KEY = "momento_projects"

  const [projects, setProjects] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) return JSON.parse(stored)
    } catch (e) {
      console.warn("Failed to parse stored todos:", e)
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProjects))

    return defaultProjects
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
    } catch (e) {
      console.error("Failed to save projects:", e)
    }
  }, [projects])

  const addProject = (newProject: ProjectType) => {
    if (!newProject.title?.trim()) {
      console.log("title is empty")
      return
    }
    setProjects((prev: Array<ProjectType>) => [newProject, ...prev]) // prepend newest
  }

  const deleteProject = (id: string) => {
    setProjects((prev: Array<ProjectType>) => prev.filter((p) => p.id !== id))
  }

  const getProjectById = (id: string) => {
    return projects.filter((project: ProjectType) => project.id == id)[0]
  }

  return { projects, addProject, deleteProject, getProjectById }
}
