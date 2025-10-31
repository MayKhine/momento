import { useState } from "react"
import { defaultProjects } from "../data/defaultProjects"

export const useProjects = () => {
  const [projects, setProjects] = useState(() => {
    const rawProjects = localStorage.getItem("momento_projects")
    return rawProjects ? JSON.parse(rawProjects) : defaultProjects
  })

  const addProject = (newProject: typeof projects) => {
    console.log("In hook: add proejct : error here")
    setProjects(newProject)
    localStorage.setItem("momento_projects", JSON.stringify(projects))
  }

  const deleteProject = (id: string) => {
    console.log("delete proejct: ", id)
  }

  return { projects, addProject, deleteProject }
}
