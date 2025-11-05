import { useParams } from "react-router-dom"
import { SideBar } from "../components/SideBar"
import { useProjects } from "../hooks/useProjects"

export const ProjectPage = () => {
  const { slug, id } = useParams<{ slug: string; id: string }>()
  // const id = slugAndId?.split("-").pop()
  const { getProjectById } = useProjects()
  console.log("slug: ", slug, "id: ", id)
  const project = getProjectById(id!)
  console.log("proejct : ", project)
  return (
    <div className=" flex bg-gray-50">
      <SideBar />
      <div className="flex flex-col p-5 gap-11">
        <h1 className="text-xl font-bold">{project.title}</h1>
        <div className="h-full bg-gray-300"> laielriaje</div>
      </div>
    </div>
  )
}
