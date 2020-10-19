import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Chat from './Chat';
import classes from './Chat.module.css';

const ChatHelper = ({
  props,
  socket,
  // allMessagesByUser,
  // id,
  // retrieveAllMessages,
  // retriveMessage,
  // setunreadMessages,
}: any) => {
  const [showChat, setShowChat] = useState<any>(false);
  const [unread,] = useState<any>(0);
  const [unreadedMessages,] = useState<any>([]);
  // useEffect(() => {
  //   socket.emit('getAllMessages', { id, token: localStorage.jwtToken });
  //   socket.on('message', data => {
  //     if (data.action === 'markasread') {
  //       retrieveAllMessages(data.messages);
  //     }
  //     if (data.action === 'getmessage') {
  //       retriveMessage(data.message);
  //     }
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   const userMessage = allMessagesByUser.find(message => message.id === id);
  //   if (userMessage) {
  //     setUnread(userMessage.messages.length);
  //     setunreadMessages(userMessage.messages.length);
  //     setUnreadedMessages(userMessage.messages);
  //   } else {
  //     setUnread(0);
  //     setunreadMessages(0);
  //     setUnreadedMessages([]);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [allMessagesByUser]);

  return (
    <React.Fragment>
      <Helmet>
        {unread && <title>{`(${unread}) message/s`}</title>}
        <meta name="description" content="A Print shop aapplication" />
        <meta
          property="og:description"
          content="Print Shop for Burch University"
        />
      </Helmet>
      {!showChat ? (
        <button
          className={classes.button + ' btn btn-primary'}
          onClick={() => setShowChat(true)}
        >
          <i className="tim-icons icon-chat-33" style={{ fontSize: '2rem' }} />
          <span>{unread}</span>
        </button>
      ) : (
        <Chat
          hide={setShowChat}
          {...props}
          socket={socket}
          unreadedMessages={unreadedMessages}
        />
      )}
    </React.Fragment>
  );
};

export default React.memo(ChatHelper);
