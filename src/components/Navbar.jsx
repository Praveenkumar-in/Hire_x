import React from 'react'
import { assets } from '../assets/assets'

const Navbar = () => {
  return (
    <div>
        <div>
            <img src={assets.logo}  className="img-fluid" style={{ width: "150px" }}/>
        </div>
        <div>
          <button  ><i className="bi bi-door-open"></i> Recruiter login </button>
           <button><i className="bi bi-box-arrow-in-left"></i> Login</button>
        </div>
        
    </div>
  )
}

export default Navbar