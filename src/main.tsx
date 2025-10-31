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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todos" element={<TodoPage />} />
        <Route path="/projects/:projectid" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
