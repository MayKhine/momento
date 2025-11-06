import { useParams } from "react-router-dom"
import { SideBar } from "../components/SideBar"
import { useProjects } from "../hooks/useProjects"
import { useProjectData } from "../hooks/useProjectData"
import type { ProjectTypeForData, TodoType } from "../types"

export const ProjectPage = () => {
  const { slug, id } = useParams<{ slug: string; id: string }>()
  // const id = slugAndId?.split("-").pop()
  const { getProjectById } = useProjects()
  const { getProjectDataById } = useProjectData()
  console.log("slug: ", slug, "id: ", id)
  const project = getProjectById(id!)

  const projectData = getProjectDataById(project.id)
  console.log("what is in proejct: ", projectData)

  return (
    <div className=" flex bg-gray-50">
      <SideBar />
      {project && (
        <div className="flex flex-col p-5 gap-11">
          <h1 className="text-xl font-bold">{project.title}</h1>
          <div className="h-full bg-gray-300"> laielriaje</div>
          <div> HI </div>
          {projectData.length > 0 && <div> Data </div>}
          {projectData.length == 0 && <div> No Data </div>}
        </div>
      )}
      {!project && <div> No project data </div>}
    </div>
  )
}
