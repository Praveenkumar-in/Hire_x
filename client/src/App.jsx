
import React from 'react'
import {Route ,Routes} from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import MainLayout from './Layout/MainLayout'
//import RecruiterLogin from "./pages/recruiter/RecuriterLogin";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import RecruiterPostJob from './pages/recruiter/PostJob'
import RecruiterAuth  from './pages/recruiter/RecruiterAuth'
import AIChat from "./components/AIChat";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLogin from  "./pages/recruiter/AdminLogin"

const App = () => {
  return (
    <div>
       <ToastContainer
    position="top-right"
    autoClose={2500}
    theme="dark"
  />
  <Routes>
     <Route path = '/' element ={ <Home/>}/>
    {/* Layout Wrapper */}
      <Route element={<MainLayout />}>
   
    <Route path = '/apply-job/:id' element ={ <ApplyJob/>}/>
    <Route path = '/applications' element ={ <Applications/>}/>
    
   </Route>

     {/* RECRUITER SIDE */}
  <Route path="/recruiter/login" element={<RecruiterAuth />} />
  <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
   <Route path="/post/job" element={<RecruiterPostJob />} />
   
    <Route path="/admin/login" element={<AdminLogin />} />
  </Routes>
 <AIChat />
    </div>
  )
}

export default App