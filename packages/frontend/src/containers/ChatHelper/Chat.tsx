import React, { useState, useEffect } from 'react';

import classes from './Chat.module.css';
import ListOfUsers from './ListOfUsers';
import Messages from './Messages';

const Chat = (props: any) => {
  const [showChatWindow, setShowChatWindow] = useState<any>(false);
  const [user, setUser] = useState<any>({});
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    if (!showChatWindow) {
      setMessages([]);
    }
  }, [showChatWindow]);

  const setUserClicked = (data: any) => {
    setUser({ ...data });
    setShowChatWindow(true);
  };

  return (
    <div className={classes.chat}>
      {!showChatWindow ? (
        <ListOfUsers
          hide={props.hide}
          setUserClicked={setUserClicked}
          users={props.chatUsers}
          onlineUsers={props.onlineUsers}
          allMessagesByUser={props.unreadedMessages}
        />
      ) : (
        <Messages
          setShowChatWindow={setShowChatWindow}
          user={user}
          messages={messages}
        />
      )}
    </div>
  );
};

export default React.memo(Chat);
