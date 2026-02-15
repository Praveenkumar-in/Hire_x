
import React from 'react'
import {Route ,Routes} from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import MainLayout from './Layout/MainLayout'
import RecruiterLogin from "./pages/recruiter/RecuriterLogin";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import RecruiterPostJob from './pages/recruiter/PostJob'


const App = () => {
  return (
    <div>
  <Routes>
     <Route path = '/' element ={ <Home/>}/>
    {/* Layout Wrapper */}
      <Route element={<MainLayout />}>
   
    <Route path = '/apply-job/:id' element ={ <ApplyJob/>}/>
    <Route path = '/applications' element ={ <Applications/>}/>
    </Route>

     {/* RECRUITER SIDE */}
  <Route path="/recruiter/login" element={<RecruiterLogin />} />
  <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
   <Route path="/post/job" element={<RecruiterPostJob />} />
  
  </Routes>

    </div>
  )
}

export default App