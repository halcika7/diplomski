import React, { useState, useEffect, useRef } from 'react';
import TimeAgo from 'react-timeago';

import classes from './Chat.module.css';

const Messages = (props: any) => {
  const ul = useRef<any>();
  const div = useRef<any>();
  const [text, setText] = useState<any>('');
  const [messagesLength, setMessagesLength] = useState<any>(0);
  const [load, setLoad] = useState<any>(false);
  const [markRead, setMarkRead] = useState<any>(false);

  const [addMessageError, setAddMessageError] = useState<any>('');

  useEffect(() => {
    props.getMessages(props.currentId, props.user.id, props.push);
    props.socket.emit('markasreadedmessage', {
      id: props.currentId,
      receiverId: props.user.id,
      token: localStorage.jwtToken,
    });
    setMessagesLength(props.messages.length);
    props.socket.on('authorizationfailed', () => {
      props.logout(props.push);
    });

    props.socket.on('addMessageFailed', (data: any) => {
      setAddMessageError(data.errMessage);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMessagesLength(props.messages.length);
    setLoad(false);
    const lastMessage = props.messages.slice(1).pop();

    if (
      lastMessage &&
      lastMessage.senderId._id !== props.currentId &&
      !markRead
    ) {
      props.socket.emit('markasreadedmessage', {
        id: props.currentId,
        receiverId: props.user.id,
        token: localStorage.jwtToken,
      });
      setMarkRead(true);
    } else {
      setMarkRead(false);
    }
    setAddMessageError('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.messages]);

  useEffect(() => {
    load && props.loadMore(props.currentId, props.user.id, messagesLength);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

  const sendMessage = (e: any) => {
    e.preventDefault();
    props.socket.emit(
      'addMessage',
      JSON.stringify({
        data: {
          id: props.currentId,
          receiverId: props.user.id,
          text,
          token: localStorage.jwtToken,
        },
      })
    );
    setText('');
  };

  const onScrollTop = () => {
    const windowHeight = div.current.clientHeight,
      lastElement: any = document.querySelector(
        '.' + div.current.classList[1] + ' li:nth-child(1)'
      ),
      gridTop = windowHeight * 0.1,
      gridBottom = windowHeight + lastElement.clientHeight;
    const thisTop = lastElement.offsetHeight - div.current.scrollTop;
    if (
      thisTop > gridTop &&
      thisTop + lastElement.clientHeight < gridBottom &&
      !load
    ) {
      setLoad(true);
    }
  };
  return (
    <div className={classes.chatWindow}>
      <div className={classes.chatHeader}>
        <img src={props.user.picture} alt="avatar" />

        <div className={classes.chatAbout}>
          <div className={classes.chatWith}>{props.user.name}</div>
          <button
            className="btn btn-sm btn-success"
            onClick={() => props.setShowChatWindow(false)}
          >
            Go Back
          </button>
        </div>
      </div>
      <div
        className={classes.chatHistory + ' scroll-always'}
        ref={div}
        onScroll={onScrollTop}
      >
        <ul className="messagesList" ref={ul}>
          {props.noMoreMessages && (
            <li className={classes.noMessages}>No more messages</li>
          )}
          {props.messages.length > 0 ? (
            props.messages.map((message: any) =>
              message.senderId._id === props.currentId ? (
                <li key={message._id}>
                  <div className={classes.messageData}>
                    <span className={classes.messageDataTime}>
                      <TimeAgo date={message.createdAt} />
                    </span>
                    <span className={classes.messageDataName}>
                      {message.senderId.name}
                    </span>
                  </div>
                  <div className={classes.message + ' ' + classes.otherMessage}>
                    {message.text}
                  </div>
                </li>
              ) : (
                <li key={message._id}>
                  <div className={classes.messageData}>
                    <span className={classes.messageDataName}>
                      {message.senderId.name}
                    </span>
                    <span className={classes.messageDataTime}>
                      <TimeAgo date={message.createdAt} />
                    </span>
                  </div>
                  <div className={classes.message + ' ' + classes.myMessage}>
                    {message.text}
                  </div>
                </li>
              )
            )
          ) : (
            <li className={classes.noMessages}>No messages</li>
          )}
        </ul>
      </div>
      <div className={classes.chatMessage}>
        <form onSubmit={sendMessage}>
          <textarea
            name="message-to-send"
            placeholder="Type your message"
            rows={3}
            onChange={e => setText(e.target.value)}
            value={text}
          />
          {addMessageError && <div className="">{addMessageError}</div>}
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default React.memo(Messages);
