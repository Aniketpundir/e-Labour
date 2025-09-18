import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import LandingPage from "./Pages/LandingPage/LandingPage"
import CustomerSignup from './Components/CustomerPortal/CustomerSignup/CustomerSignup'
import CustomerLogin from './Components/CustomerPortal/CustomerLogin/CustomerLogin'
import WorkersSignup from './Components/WorkersPortal/WorkersSignup/WorkersSignup'
import WorkersLogin from './Components/WorkersPortal/WorkersLogin/WorkersLogin'
import Layout from './Components/CustomerPortal/Layout/Layout'
import Home from './Pages/Home/Home'
import HowItWorks from "./Pages/HowItWorkrs/HowItWorkrs"
import About from "./Pages/About/About"
import Contact from "./Pages/Contact/Contact"
import ServiceCategories from './Components/CustomerPortal/ServiceCategories/ServiceCategories'
import ListedWorkers from './Components/CustomerPortal/Listed_Workers/ListedWorker/ListedWorkers'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path='/' element={<Layout />}>
                <Route path='/landing-page' element={<LandingPage />} />
                <Route path='/customer-signup' element={<CustomerSignup />} />
                <Route path='/customer-login' element={<CustomerLogin />} />
                <Route path='/workers-signup' element={<WorkersSignup />} />
                <Route path='/workers-login' element={<WorkersLogin />} />
                <Route path='/' element={<Home />} />
                <Route path='/howItWorks' element={<HowItWorks />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/Service-Categories' element={<ServiceCategories />} />
                <Route path='/Service-Categories/Listed-Workers/:title' element={<ListedWorkers />} />
                {/* <Route path='/Service-Categories/Listed-Workers/${title}' element={<ListedWorkers />} /> */}
            </Route>
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