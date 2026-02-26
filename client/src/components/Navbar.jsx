
// import React, { useState } from "react";
// import { assets } from "../assets/assets";
// import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
// import { Link } from "react-router-dom";
// import Notifications from "./Notifications";

// const Navbar = () => {

//   const { openSignIn } = useClerk();
//   const { isSignedIn } = useUser();

//   const [showNotifications, setShowNotifications] = useState(false);

//   return (
//     <nav className="navbar navbar-expand-lg hirex-navbar">
//       <div className="container-fluid px-3">

//         {/* LOGO */}
//         <Link className="navbar-brand" to="/">
//           <img src={assets.logo} alt="HireX" className="hirex-logo"/>
//         </Link>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#hirexNavbar"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="hirexNavbar">

//           <div className="ms-auto d-flex gap-3 mt-3 mt-lg-0 align-items-center">

//             {/* NOTIFICATION ICON */}
//             {isSignedIn && (
//               <div className="notification-wrapper">

//                 <button
//                   className="btn notification-btn"
//                   onClick={() =>
//                     setShowNotifications(!showNotifications)
//                   }
//                 >
//                   🔔
//                 </button>

//                 {showNotifications && (
//                   <Notifications />
//                 )}

//               </div>
//             )}

//             {/* USER BUTTON */}
//             {isSignedIn && (
//               <UserButton afterSignOutUrl="/" />
//             )}

//             {/* LOGIN */}
//             {!isSignedIn && (
//               <>
//                 <button
//                   onClick={() => openSignIn()}
//                   className="btn hirex-login"
//                 >
//                   Login
//                 </button>

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

// export default Navbar;'

import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import Notifications from "./Notifications";

const Navbar = () => {

  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();

  const [showNotifications, setShowNotifications] = useState(false);
  const [count, setCount] = useState(3); // example unread count

  return (
    <nav className="navbar navbar-expand-lg hirex-navbar">

      <div className="container-fluid px-3">

        {/* LOGO */}
        <Link className="navbar-brand" to="/">
          <img src={assets.logo} alt="HireX" className="hirex-logo"/>
        </Link>

        <div className="ms-auto d-flex align-items-center gap-3">

          {/* 🔔 Notification Bell */}
          {isSignedIn && (

            <div className="notification-bell">

              <i
                className="bi bi-bell-fill"
                onClick={() => setShowNotifications(!showNotifications)}
              ></i>

              {count > 0 && (
                <span className="notification-count">
                  {count}
                </span>
              )}

              {showNotifications && <Notifications/>}

            </div>

          )}

          {/* USER */}
          {isSignedIn && (
            <UserButton afterSignOutUrl="/" />
          )}

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

    </nav>
  );
};

export default Navbar;