import React, { useState, useEffect } from 'react';

import classes from './Chat.module.css';
import Spinner from '@components/UI/Spinner/Spinner';

const ListOfUsers = (props: any) => {
  const [users, setUsers] = useState<any>([]);
  const [nothingFound, setNothingFound] = useState<any>(false);

  useEffect(() => {
    if (props.users.length > 0) {
      setUsers([...props.users]);
    }
  }, [props.users]);

  const filterUsers = (e: any) => {
    e.preventDefault();

    if (e.target.value.length > 0) {
      const filterUsers = users.map((users: any) => {
        const newUsers = { ...users };
        newUsers.users = [
          ...newUsers.users.filter((user: any) =>
            user.name.toLowerCase().includes(e.target.value)
          ),
        ];
        return newUsers;
      });

      if (filterUsers.length === 0) {
        setNothingFound(true);
      }

      setUsers([...filterUsers]);
    } else {
      setUsers([...props.users]);
      setNothingFound(false);
    }
  };

  return users.length > 0 && nothingFound === false ? (
    <React.Fragment>
      <div className={classes.search}>
        <button
          className="btn btn-sm btn-primary d-block"
          onClick={() => props.hide(false)}
        >
          Hide Chat
        </button>
        <div>
          <input type="text" placeholder="search" onChange={filterUsers} />
          <i className="fa fa-search" />
        </div>
      </div>
      <div className={classes.peopleList}>
        <ul className={classes.list}>
          {users.map((users: any) => {
            return (
              <React.Fragment key={users._id}>
                <p>{users._id}</p>
                {users.users.map((user: any) => {
                  const numberOfUnreadedMessages = props.allMessagesByUser.find(
                    (message: any) => message._id === user._id
                  )
                    ? props.allMessagesByUser.find(
                        (message: any) => message._id === user._id
                      ).sum
                    : 0;

                  return (
                    <li
                      onClick={() =>
                        props.setUserClicked({
                          name: user.name,
                          picture: user.picture,
                          id: user._id,
                        })
                      }
                      key={user._id}
                    >
                      <img src={user.picture} alt="avatar" />
                      {numberOfUnreadedMessages > 0 && (
                        <span>{numberOfUnreadedMessages}</span>
                      )}
                      <div className={classes.about}>
                        <div className="name">{user.name}</div>
                        {props.onlineUsers.includes(user._id) && (
                          <div className={classes.status}>
                            <i className="fa fa-circle online" /> online
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  ) : nothingFound === true ? (
    <React.Fragment>
      <div className={classes.search}>
        <button
          className="btn btn-sm btn-primary d-block"
          onClick={() => props.hide(false)}
        >
          Hide Chat
        </button>
        <div>
          <input type="text" placeholder="search" onChange={filterUsers} />
          <i className="fa fa-search" />
        </div>
      </div>
      <div className={classes.peopleList}>
        <ul className={classes.list}>
          <p>Nothing found</p>
        </ul>
      </div>
    </React.Fragment>
  ) : (
    <Spinner />
  );
};

export default React.memo(ListOfUsers);
