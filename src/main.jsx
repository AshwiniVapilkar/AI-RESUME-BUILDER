import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './auth/sign-in/index.jsx'
import Home from './home/index.jsx'
import Dashboard from './dashboard/index.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './dashboard/resume/[resumeid]/edit/index.jsx'
import ViewResume from './my-resume/[resumeid]/view/index.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const router = createBrowserRouter([
  {
    element:<App/>,
    children:[
      {
        path:'/dashboard',
        element:<Dashboard/>
      },
      {
        path:'/dashboard/resume/:resumeid/edit',
        element:<EditResume/>
      },

    ]
  },
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/auth/sign-in',
    element:<SignInPage/>
  },
  {
    path:'/my-resume/:resumeid/view',
    element: <ViewResume/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
   <RouterProvider router={router} />
  </ClerkProvider>
  </StrictMode>
)
