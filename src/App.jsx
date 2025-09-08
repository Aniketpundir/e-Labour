import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import LandingPage from "./Pages/LandingPage/LandingPage"
import CustomerSignup from './Components/CustomerPortal/CustomerSignup/CustomerSignup'
import CustomerLogin from './Components/CustomerPortal/CustomerLogin/CustomerLogin'
import WorkersSignup from './Components/WorkersPortal/WorkersSignup/WorkersSignup'
import WorkersLogin from './Components/WorkersPortal/WorkersLogin/WorkersLogin'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path='/' element={<LandingPage />} />
            <Route path='/customer-signup' element={<CustomerSignup />} />
            <Route path='/customer-login' element={<CustomerLogin />} />
            <Route path='/workers-signup' element={<WorkersSignup />} />
            <Route path='/workers-login' element={<WorkersLogin />} />
        </Route>
    )
)


const App = () => {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}

export default App