import { Link } from "react-router-dom"

export const SideBar = () => {
  return (
    <div className="flex flex-col gap-10 min-w-50 min-h-screen bg-amber-200">
      <h1 className="font-bold text-3xl">
        <Link to="/">MoMento</Link>
      </h1>
      <nav className=" flex gap-2 flex-col bg-amber-300">
        <Link to="/">Home</Link>
        <Link to="/todos">Todos</Link>
        <Link to="/project">Project</Link>
      </nav>
    </div>
  )
}
