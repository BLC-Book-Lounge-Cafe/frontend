import { BreakpointsProvider } from "shared/lib/breakpoints"
import { useWebVitalsContext } from "shared/lib/observability"
import { ApolloClientProvider } from "./providers/apollo-client-provider"
import { RouterProvider } from "./providers/router-provider"
import { ToastContainer } from "shared/ui/toast"
import "./styles/main.css"

function App() {
  useWebVitalsContext()

  return (
    <ApolloClientProvider>
      <BreakpointsProvider>
        <RouterProvider />
        <ToastContainer />
      </BreakpointsProvider>
    </ApolloClientProvider>
  )
}

export default App
