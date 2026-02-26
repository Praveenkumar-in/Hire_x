import React from "react";

const Notifications = ({ notifications }) => {

  return (

    <div className="hirex-notifications">

      <h5 className="notification-title">
        🔔 Notifications
      </h5>

      {notifications.length === 0 && (
        <p className="no-notification">
          No notifications yet
        </p>
      )}

      {notifications.map((n) => (

        <div
          key={n._id}
          className={`notification-card ${n.isRead ? "read" : "unread"}`}
        >

          <p className="notification-message">
            {n.message}
          </p>

          <small className="notification-time">
            {new Date(n.createdAt).toLocaleString()}
          </small>

        </div>

      ))}

    </div>

  );

};

export default Notifications;