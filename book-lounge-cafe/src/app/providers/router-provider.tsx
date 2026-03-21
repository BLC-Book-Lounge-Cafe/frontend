import { RouterProvider as ReactRouterProvider } from 'react-router-dom'
import { AppRouter } from '../router/app-router'

export function RouterProvider() {
  return <ReactRouterProvider router={AppRouter()} />
}