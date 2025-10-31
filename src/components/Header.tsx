import { Link } from "react-router-dom"

export const Header = () => {
  return (
    <header className="p-2 flex">
      <h1 className="font-bold text-3xl grow">
        <Link to="/">MoMento</Link>
      </h1>
      <div>
        <nav className="flex gap-5 font-bold">
          <Link to="/">Home</Link>
          <Link to="/todos">Todos</Link>
          <Link to="/project">Project</Link>
        </nav>
      </div>
    </header>
  )
}
