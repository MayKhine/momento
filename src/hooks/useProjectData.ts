import { useEffect, useState } from "react"
import { defaultProjectsData } from "../data/defaultProjectsData"
import type { ProjectType, ProjectTypeForData } from "../types"
export const useProjectData = () => {
  const STORAGE_KEY = "momento_projects_data"

  const [projectsData, setProjectsData] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) return JSON.parse(stored)
    } catch (e) {
      console.log("Failed to parted the stored projects data", e)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProjectsData))
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projectsData))
    } catch (e) {
      console.log("Failed to save projects data : ", e)
    }
  }, [projectsData])

  const getProjectDataById = (id: string) => {
    const data = projectsData.filter((project: ProjectTypeForData) => {
      return project.projectId == id
    })[0]
    if (data) return data.projectData
    return []
  }
  return { getProjectDataById, projectsData }
}
