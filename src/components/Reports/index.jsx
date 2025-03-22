import React, { useEffect, useState } from 'react'
import Wrapper from './style'
import { FaTimes } from 'react-icons/fa'

const Reports = ({ users, setUsers, events }) => {

  const [isVisible, setIsVisible] = useState(null)

  const toggleSection = (section) => {
    setIsVisible(isVisible === section ? null : section)
  }

  const [eventConnnection, setEventConnection] = useState({})

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
      <div className='container'>
        <div className='heading'>
          <h1>Reports & Analytics</h1>
        </div>
        <div>
          <div className='accordion'>
            <h2 onClick={() => { toggleSection("user") }}>User Engagement Stats</h2>
            {isVisible === "user" && (
              <div className='modal-overlay'>
                <div className='modal-content'>
                  <div className='header'>
                    <h2>User Engagement</h2>
                    <p onClick={() => { setIsVisible(null) }}><FaTimes /></p>
                  </div>
                  <div className='scroll-container'>
                    <table>
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>UserName</th>
                          <th>Total Connection</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(user => ({ ...user, totalConnection: user.connection.total || 0 }))
                          .sort((a, b) => b.totalConnection - a.totalConnection)
                          .slice(0, 5)
                          .map((user, index) => (
                            <tr key={user.id}>
                              <td>{index + 1}</td>
                              <td>{user.userName}</td>
                              <td>{user.connection.total}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className='accordion'>
            <h2 onClick={() => { toggleSection("event") }}>Event Analytics</h2>
            {isVisible === "event" && (
              <div className='modal-overlay'>
                <div className='modal-content'>
                  <div className='header'>
                    <h2>Event Analytics</h2>
                    <p onClick={() => { setIsVisible(null) }}><FaTimes /></p>
                  </div>
                  <div className='scroll-container'>
                    <table>
                      <thead>
                        <tr>
                          <th>S.No.</th>
                          <th>Event Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {events
                          .map(event => ({
                            ...event,
                            connectionCount: eventConnnection[event.id] || 0
                          }))
                          .sort((a, b) => b.connectionCount - a.connectionCount)
                          .slice(0, 3)
                          .map((event, index) => (
                            <tr key={event.id}>
                              <td>{index + 1}</td>
                              <td>{event.eventName}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className='accordion'>
            <h2 onClick={() => { toggleSection("connection") }}>Connection Trends</h2>
            {isVisible === "connection" && (
              <div className='modal-overlay'>
                <div className='modal-content'>
                  <div className='header'>
                    <h2>Connection Trends</h2>
                    <p onClick={() => { setIsVisible(null) }}><FaTimes /></p>
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
                            <td>{eventConnnection[event.id] || 0}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Reports