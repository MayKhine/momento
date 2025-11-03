import { Link } from "react-router-dom"
import { ActionButton } from "./ActionButton"
import { useState } from "react"
import { useProjects } from "../hooks/useProjects"
import type { ProjectType } from "../types"
import { v4 as uuidv4 } from "uuid"

export const SideBar = () => {
  const [newProject, setNewProject] = useState({
    id: uuidv4(),
    title: "",
    description: "",
    createdAt: new Date().toISOString(),
  })
  const addNewProject = () => {
    console.log("in the side bar: add new proejct")
    addProject(newProject)
  }

  const { projects, addProject } = useProjects()
  console.log("projects; ", projects)

  return (
    <div className="flex flex-col gap-10 min-w-50 min-h-screen bg-amber-200 p-4">
      <h1 className="font-bold text-3xl">
        <Link to="/">MoMento</Link>
      </h1>
      <nav className=" flex gap-2 flex-col bg-amber-300">
        <Link to="/">Home</Link>
        <Link to="/todos">Todos</Link>
        <Link to="/projects/:projectid">Project</Link>
        <div className="bg-pink-200 flex flex-col">
          {projects.map((project: ProjectType) => {
            return (
              <Link key={project.id} to="/projects/${project.title}">
                {project.title}
              </Link>
            )
          })}
        </div>
      </nav>

      <div className="flex flex-col justify-end items-end ">
        <div className="flex flex-col grow">
          <input
            value={newProject?.title}
            onChange={}
            // onKeyDown={(e) => e.key === "Enter" && addProject()}
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
        <ActionButton
          text="Create"
          onClick={() => {
            addProject(newProject)
          }}
        />
      </div>
    </div>
  )
}
