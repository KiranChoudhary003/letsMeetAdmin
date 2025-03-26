import React, { useEffect, useState } from 'react';
import Wrapper from './style';

const ConnectionTrends = ({ users, events }) => {
  const [eventConnection, setEventConnection] = useState({});

  useEffect(() => {
    if (!Array.isArray(users) || users.length === 0) return;

    const eventMap = {};

    users.forEach((user) => {
      if (user.attendEventIDs && Array.isArray(user.attendEventIDs)) {
        user.attendEventIDs.forEach((eventID) => {
          if (!eventMap[eventID]) {
            eventMap[eventID] = 0;
          }
          if (user.connection && user.connection[eventID]) {
            eventMap[eventID] += user.connection[eventID];
          }
        });
      }
    });

    setEventConnection(eventMap);
  }, [users]);

  return (
    <Wrapper>
      <div className='modal-content'>
        <div className='header'>
          <h2>Connection Trends</h2>
        </div>
        <div className='scroll-container'>
          <table>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Event Name</th>
                <th>Total Connections</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={event.id}>
                  <td>{index + 1}</td>
                  <td>{event.eventName}</td>
                  <td>{eventConnection[event.id] || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Wrapper>
  );
};

export default ConnectionTrends;
