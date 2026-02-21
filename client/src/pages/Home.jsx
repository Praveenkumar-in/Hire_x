import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import JobListing from '../components/JobListing'
import AppDownload from '../components/AppDownload'
import Footer from '../components/Footer'
import AIChat from "../components/AIChat";


const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <JobListing/>
        <AppDownload/>
        <Footer/>
         {/* ✅ GLOBAL AI CHAT */}
      <AIChat />
    </div>
  )
}

export default Home