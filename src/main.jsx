import './index.css'
import React from 'react'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import Protected from './components/Protected.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home, Login, Signup } from "./pages/index.js"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Protected authentication>
            <Home />
          </Protected>
        )
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        )
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        )
      },
    ]
  },
  // {
  //   path: "*",
  //   element: (
  //     <PageNotFound />
  //   )
  // },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>,
)
