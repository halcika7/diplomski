import React, { useRef, useEffect } from 'react';

// components
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';

// typings

const Notifications = ({
  notifications,
  noMoreNotifications,
  load,
  setLoad,
  socket,
  userId,
  retrieveAllNotifications,
}: any) => {
  const ul = useRef<any>();

  useEffect(() => {
    socket.emit('markasreaded', { userId, token: localStorage.jwtToken });
    socket.on('notification', (data: any) => {
      if (data.action === 'allnotifications') {
        retrieveAllNotifications(data.notifications);
      }
    });
  }, [socket, userId, retrieveAllNotifications]);

  const onScrollBottom = () => {
    const windowHeight = ul.current?.scrollHeight,
      lastElement: any = document.querySelector(
        '.' + ul.current.classList[1] + ' li:last-child'
      ),
      gridTop = windowHeight * 0.1 + lastElement.clientHeight,
      gridBottom = windowHeight;
    // // Get elemets top
    const thisBottom = lastElement.offsetHeight + ul.current.scrollTop;
    // // Check if the element is in the current viewport
    if (thisBottom + gridTop >= gridBottom && !load) {
      setLoad(true);
    }
  };

  return (
    <ul
      className="dropdown-navbar dropdown-menu dropdown-menu-right"
      ref={ul}
      onScroll={onScrollBottom}
      style={{ maxHeight: '200px', overflowY: 'auto' }}
    >
      {notifications.length > 0 ? (
        notifications.map((notification: any) => (
          <React.Fragment key={notification.orderId}>
            <li className="nav-link">
              <div
                className="nav-item dropdown-item"
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                {notification.text}
                <TimeAgo date={notification.createdAt} />
                <Link
                  to={`/order?id=${notification.orderId}`}
                  style={{ color: '#111' }}
                >
                  See Order
                </Link>
              </div>
            </li>
          </React.Fragment>
        ))
      ) : (
        <li>No notifications</li>
      )}
      {noMoreNotifications && (
        <li className="nav-link">
          <div
            className="nav-item dropdown-item"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            No More Notifications
          </div>
        </li>
      )}
    </ul>
  );
};

export default React.memo(Notifications);
