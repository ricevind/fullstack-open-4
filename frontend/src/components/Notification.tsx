import React from "react";
import { useSelector } from "react-redux";

import { selectNotifications } from "../state/notifications.store";

const notificationColorMap = {
  success: {
    border: "darkGreen",
    background: "green",
  },
  error: {
    border: "dargRed",
    background: "red",
  },
} as any;

const Notification = () => {
  const notifications = useSelector(selectNotifications);

  return (
    <div style={{ position: "fixed", top: "0", right: "0" }}>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          style={{
            display: "inline-block",

            textAlign: "right",
            padding: "10px",
            border: `2px solid ${
              notificationColorMap[notification.type]?.border
            }`,
            background: `${
              notificationColorMap[notification.type]?.background
            }`,
          }}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default Notification;
