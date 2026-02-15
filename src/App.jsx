
import React from 'react'
import {Route ,Routes} from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import MainLayout from './Layout/MainLayout'

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
  </Routes>

    </div>
  )
}

export default App