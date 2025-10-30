import { Header } from "./components/Header"
import { TodoPage } from "./pages/TodoPage"

export const App = () => {
  return (
    <div className="bg-pink-200 h-full">
      <Header />
      <TodoPage />
    </div>
  )
}

export default App
