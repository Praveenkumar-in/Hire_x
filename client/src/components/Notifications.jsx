import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const Notifications = () => {

  const { user } = useUser();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    const fetchNotifications = async () => {

      try {

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/notifications/${user.id}`
        );

        setNotifications(res.data);

      } catch (error) {
        console.error(error);
      }

    };

    if (user) fetchNotifications();

  }, [user]);

  const markAsRead = async (id) => {

    try {

      await axios.put(
        `${import.meta.env.VITE_API_URL}/notifications/${id}/read`
      );

      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, isRead: true } : n
        )
      );

    } catch (error) {
      console.error(error);
    }

  };

  return (

    <div className="notifications-box">

      <h5>Notifications</h5>

      {notifications.length === 0 && (
        <p>No notifications</p>
      )}

      {notifications.map((n) => (

        <div
          key={n._id}
          className={`notification-item ${n.isRead ? "read" : "unread"}`}
          onClick={() => markAsRead(n._id)}
        >

          <p>{n.message}</p>
          <small>
            {new Date(n.createdAt).toLocaleString()}
          </small>

        </div>

      ))}

    </div>

  );
};

export default Notifications;