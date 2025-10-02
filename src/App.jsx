import React, { useEffect } from 'react'
import AOS from "aos";
import 'aos/dist/aos.css';
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
import WorkersDetails from "./Components/CustomerPortal/Listed_Workers/Workers_Details_section/WorkersDetails/WorkersDetails"
import BookWorkers from './Components/CustomerPortal/Booking_Flow/Book_workers/BookWorkers'
import BookingConformation from './Components/CustomerPortal/Booking_Flow/Booking_Conformation/BookingConformation'
import CustomerProfile from './Components/CustomerPortal/CustomerDetails/CustomerProfile/CustomerProfile'
import CurrentBooking from './Components/CustomerPortal/CustomerDetails/CurrentBooking/CurrentBooking'
import HelpSection from "./Components/CustomerPortal/CustomerDetails/HelpSection/HelpSection"
import PastBooking from './Components/CustomerPortal/CustomerDetails/PastBooking/PastBooking'

// Worker portal section imports here.
import WorkerLayout from "./Components/WorkersPortal/Layout/Layout";
import WorkerProfile from "./Components/WorkersPortal/WokerProfile/WokerProfile";
import JobDashboard from "./Components/WorkersPortal/JobDashboard/JobDashboard";
import JobRequest from "./Components/WorkersPortal/JobRequest/JobRequest";
import Review from "./Components/WorkersPortal/Reviews/Reviews";
import { StoreProvider } from './Context/StoreContext';
import AddWorkersDetails from './Components/WorkersPortal/AddWorkersDetails/AddWorkersDetails';
import SubmissionSuccess from './Components/WorkersPortal/SubmissionSuccess/SubmissionSuccess';
import LocationMap from './Components/LocationMap/LocationMap';



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
                <Route path='/Service-Categories/Listed-Workers/:title/Worker-Details/:id' element={<StoreProvider>
                    <WorkersDetails />
                </StoreProvider>} />
                <Route path='/Service-Categories/Listed-Workers/:title/Worker-Details/:id/booking-section' element={<StoreProvider>
                    <BookWorkers />
                </StoreProvider>} />
                <Route path='/Service-Categories/Listed-Workers/:title/Worker-Details/:id/Booking-Section/Booking-Conformation' element={<BookingConformation />} />
                <Route path='/Customer-Profile' element={<CustomerProfile />} />
                <Route path='/Current-Booking' element={<CurrentBooking />} />
                <Route path='/Support-Section' element={<HelpSection />} />
                <Route path='/Past-Booking' element={<PastBooking />} />
            </Route>
            <Route path='/worker-profile' element={<WorkerLayout />}>
                <Route path='/worker-profile' element={<WorkerProfile />} />
                <Route path='/worker-profile/Dashboard' element={<JobDashboard />} />
                <Route path='/worker-profile/Job-Request' element={<JobRequest />} />
                <Route path='/worker-profile/Rating&Reviews' element={<Review />} />
                <Route path='/worker-profile/add-workers-details' element={<AddWorkersDetails />} />
                <Route path='/worker-profile/submission-success' element={<SubmissionSuccess />} />
            </Route>
        </Route>
    )
)


const App = () => {

    useEffect(() => {
        AOS.init({
            offset: 100,
            duration: 500,
            easing: "ease-in-sine",
            delay: 100,
        });
        AOS.refresh();
    }, []);

    return (

        <div>
            <StoreProvider>
                <RouterProvider router={router} />
            </StoreProvider>
        </div>
    )
}

export default App