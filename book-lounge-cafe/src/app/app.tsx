import { BreakpointsProvider } from "shared/lib/breakpoints"
import { RouterProvider } from "./providers/router-provider"
import { ToastContainer } from "shared/ui/toast"
import "./styles/main.css"

function App() {
  return (
    <BreakpointsProvider>
      <RouterProvider />
      <ToastContainer />
    </BreakpointsProvider>
  )
}

export default App
