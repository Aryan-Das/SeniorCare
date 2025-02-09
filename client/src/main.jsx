import React from 'react'
import ReactDOM from 'react-dom/client'
import Dashboard from './pages/Dashboard'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Patients from './pages/Patients'
import PatientDetail from './pages/PatientDetail'
import Signup from './pages/Signup'
import RegisterPatient from './pages/RegisterPatient'
import SelectPatient from './pages/SelectPatient'
import Medications from './pages/Medications'
import Signin from './pages/Signin'
import Landing from './pages/Landing'
import Contact from './pages/Contact'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard/>
  },
  {
    path: "/patients",
    element: <Patients/>
  },
  {
    path: "/select-patient",
    element: <SelectPatient/>
  },
  {
    path: "/patient/:id",
    element: <PatientDetail/>
  },
  {
    path: "/patient/:id/medications",
    element: <Medications/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/signin",
    element: <Signin/>
  },
  {
    path: "/add-patient",
    element: <RegisterPatient/>
  },
  {
    path: "/landing",
    element: <Landing/>
  },
  {
    path: "/contact",
    element: <Contact/>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router = {router}/>
  </React.StrictMode>,
)
