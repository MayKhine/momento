import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { TodoPage } from "./pages/TodoPage.tsx"
import { ProjectPage } from "./pages/ProjectPage.tsx"
import { HomePage } from "./pages/HomePage.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {/* <nav>
        <Link to="/">Home</Link>
        <Link to="/todos">Todos</Link>
      </nav> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todos" element={<TodoPage />} />
        <Route path="/project" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
