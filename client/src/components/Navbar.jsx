
// import React from "react";
// import { assets } from "../assets/assets";
// import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
// import { Link } from "react-router-dom";
// import Notifications from "./Notifications";
// const Navbar = () => {

//   const { openSignIn } = useClerk();
//   const { isSignedIn } = useUser(); // ✅ better than checking user object

//   return (
//     <nav className="navbar navbar-expand-lg hirex-navbar">
//       <div className="container-fluid px-3">

//         {/* ===== LOGO ===== */}
//         <Link className="navbar-brand" to="/">
//           <img
//             src={assets.logo}
//             alt="HireX"
//             className="hirex-logo"
//           />
//         </Link>

//         {/* ===== MOBILE TOGGLE ===== */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#hirexNavbar"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* ===== COLLAPSE ===== */}
//         <div className="collapse navbar-collapse" id="hirexNavbar">

//           <div className="ms-auto d-flex gap-2 mt-3 mt-lg-0 align-items-center">
 
//             {/* ================= LOGGED IN ================= */}
//             {isSignedIn && (
//               <UserButton afterSignOutUrl="/" />
//             )}

//             {/* ================= LOGGED OUT ================= */}
//             {!isSignedIn && (
//               <>
//                 {/* LOGIN */}
//                 <button
//                   onClick={() => openSignIn()}
//                   className="btn hirex-login"
//                 >
//                   <i className="bi bi-box-arrow-in-right me-2"></i>
//                   Login
//                 </button>
               

//                 {/* RECRUITER BUTTON (ONLY LOGGED OUT) */}
//                 <Link to="/recruiter/login">
//                   <button className="btn hirex-recruiter">
//                     I'm Recruiter
//                   </button>
//                 </Link>
//               </>
//             )}
           
//           </div>
//         </div>

//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import Notifications from "./Notifications";

const Navbar = () => {

  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();

  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg hirex-navbar">
      <div className="container-fluid px-3">

        {/* LOGO */}
        <Link className="navbar-brand" to="/">
          <img src={assets.logo} alt="HireX" className="hirex-logo"/>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#hirexNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="hirexNavbar">

          <div className="ms-auto d-flex gap-3 mt-3 mt-lg-0 align-items-center">

            {/* NOTIFICATION ICON */}
            {isSignedIn && (
              <div className="notification-wrapper">

                <button
                  className="btn notification-btn"
                  onClick={() =>
                    setShowNotifications(!showNotifications)
                  }
                >
                  🔔
                </button>

                {showNotifications && (
                  <Notifications />
                )}

              </div>
            )}

            {/* USER BUTTON */}
            {isSignedIn && (
              <UserButton afterSignOutUrl="/" />
            )}

            {/* LOGIN */}
            {!isSignedIn && (
              <>
                <button
                  onClick={() => openSignIn()}
                  className="btn hirex-login"
                >
                  Login
                </button>

                <Link to="/recruiter/login">
                  <button className="btn hirex-recruiter">
                    I'm Recruiter
                  </button>
                </Link>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;