import { Link } from "react-router-dom"
import { ActionButton } from "./ActionButton"
import { useState } from "react"
import { useProjects } from "../hooks/useProjects"
import type { ProjectType } from "../types"
import { v4 as uuidv4 } from "uuid"
import { FaRegTimesCircle } from "react-icons/fa"

export const SideBar = () => {
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
  })
  const addNewProject = () => {
    console.log("in the side bar: add new proejct")
    addProject({
      id: uuidv4(),
      title: newProject.title.trim(),
      description: newProject.description.trim(),
      createdAt: new Date().toISOString(),
    })

    setNewProject({
      title: "",
      description: "",
    })
  }

  const { projects, addProject, deleteProject } = useProjects()
  console.log("projects; ", projects)

  return (
    <div className="flex flex-col gap-10 min-w-70 max-w-70 min-h-screen bg-amber-200 p-4">
      <h1 className="font-bold text-3xl">
        <Link to="/">MoMento</Link>
      </h1>
      <nav className="flex gap-2 flex-col bg-amber-300">
        <Link to="/">Home</Link>
        <Link to="/todos">Todos</Link>
        <Link to="/projects/:projectid">Project</Link>
        <div className="flex flex-col gap-2">
          {projects.map((project: ProjectType) => {
            return (
              <div key={project.id} className="flex justify-between">
                <Link
                  className="wrap-anywhere"
                  key={project.id}
                  to="/projects/${project.title}"
                >
                  {project.title}
                </Link>
                <button
                  className="p-2 pt-1 self-start"
                  onClick={() => {
                    deleteProject(project.id)
                  }}
                >
                  <FaRegTimesCircle />
                </button>
              </div>
            )
          })}
        </div>
      </nav>

      <div className="flex flex-col justify-end items-end ">
        <div className="flex flex-col grow">
          <input
            value={newProject?.title}
            onChange={(e) => {
              setNewProject((prev) => ({ ...prev, title: e.target.value }))
            }}
            onKeyDown={(e) => e.key === "Enter" && addNewProject()}
            placeholder="Add a new project..."
            className="px-3 py-2 border-2 rounded-lg"
          />
          <div className="h-3">
            {/* {newTodoError && (
                      <div className="text-red-600 text-sm">
                        Please write something in the box
                      </div>
                    )} */}
          </div>
        </div>
        <ActionButton text="Create" onClick={addNewProject} />
      </div>
    </div>
  )
}
