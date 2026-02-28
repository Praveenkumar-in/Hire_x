

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { assets } from "../assets/assets";
// import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
// import { Link } from "react-router-dom";
// import Notifications from "./Notifications";

// const Navbar = () => {

//   const { openSignIn } = useClerk();
//   const { isSignedIn, user } = useUser();

//   const [showNotifications, setShowNotifications] = useState(false);
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {

//     const fetchNotifications = async () => {

//       try {

//         const res = await axios.get(
//           `${import.meta.env.VITE_API_URL}/notifications/${user.id}`
//         );

//         setNotifications(res.data);

//       } catch (err) {
//         console.log(err);
//       }

//     };

//     if (user) fetchNotifications();

//   }, [user]);

//   // count unread notifications
//   const unreadCount = notifications.filter(n => !n.isRead).length;

//   return (
//     <nav className="navbar navbar-expand-lg hirex-navbar">

//       <div className="container-fluid">

//         <Link className="navbar-brand" to="/">
//           <img src={assets.logo} alt="HireX" className="hirex-logo" />
//         </Link>

//         <div className="ms-auto d-flex align-items-center gap-3">

//           {isSignedIn && (

//             <div className="notification-bell">

//               <i
//                 className="bi bi-bell-fill"
//                 onClick={() => setShowNotifications(!showNotifications)}
//               ></i>

//               {unreadCount > 0 && (
//                 <span className="notification-count">
//                   {unreadCount}
//                 </span>
//               )}

//               {showNotifications && (
//                 <Notifications notifications={notifications} />
//               )}

//             </div>

//           )}

//           {isSignedIn && (
//             <UserButton afterSignOutUrl="/" />
//           )}

//           {!isSignedIn && (
//             <>
//               <button
//                 onClick={() => openSignIn()}
//                 className="hirex-login"
//               >
//                 Login
//               </button>

//               <Link to="/recruiter/login">
//                 <button className="btn hirex-recruiter">
//                   I'm Recruiter
//                 </button>
//               </Link>

//               {/* ADMIN LOGIN */}
//               <Link to="/admin/login">
//                 <button className="btn hirex-admin">
//                   Admin
//                 </button>
//               </Link>
//             </>
//           )}

//         </div>

//       </div>

//     </nav>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import Notifications from "./Notifications";

const Navbar = () => {

  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {

    const fetchNotifications = async () => {

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/notifications/${user.id}`
        );

        setNotifications(res.data);

      } catch (err) {
        console.log(err);
      }

    };

    if (user) fetchNotifications();

  }, [user]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <nav className="hirex-navbar">

      <div className="navbar-container">

        {/* LOGO */}
        <Link to="/" className="navbar-logo">
          <img src={assets.logo} alt="HireX" className="hirex-logo"/>
        </Link>


        {/* MOBILE MENU ICON */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className="bi bi-list"></i>
        </div>


        {/* RIGHT SIDE */}
        <div className={`navbar-right ${menuOpen ? "active" : ""}`}>

          {isSignedIn && (

            <div className="notification-bell">

              <i
                className="bi bi-bell-fill"
                onClick={() => setShowNotifications(!showNotifications)}
              ></i>

              {unreadCount > 0 && (
                <span className="notification-count">
                  {unreadCount}
                </span>
              )}

              {showNotifications && (
                <Notifications notifications={notifications}/>
              )}

            </div>

          )}

          {isSignedIn && (
            <UserButton afterSignOutUrl="/" />
          )}

          {!isSignedIn && (
            <>
              <button
                onClick={() => openSignIn()}
                className="hirex-login"
              >
                Login
              </button>

              <Link to="/recruiter/login">
                <button className="hirex-recruiter">
                  I'm Recruiter
                </button>
              </Link>

              <Link to="/admin/login">
                <button className="hirex-admin">
                  Admin
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