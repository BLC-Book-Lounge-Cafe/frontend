import { RouterProvider as ReactRouterProvider } from 'react-router-dom'
import { appRouter } from '../router/app-router'

export function RouterProvider() {
  return <ReactRouterProvider router={appRouter} />
}