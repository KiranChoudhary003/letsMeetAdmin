import React, { useState } from 'react'
import Wrapper from './style'
import { FaTimes } from 'react-icons/fa'

const Settings = ({users, setUsers}) => {

  const [activeSection, setActiveSection] = useState(null)
  const [distance, setDistance] = useState("")
  const [savedDistance, setSavedDistance] = useState("")

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section)
  }

  const handleStatusChange = (id, newStatus) => {
    const confirmAction = window.confirm(`Are you sure you want to mark this request as "${newStatus}"?`)
  
    if (confirmAction) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, userStatus: newStatus } : user
        )
      )
    }
  }  

  const handleSaveDistance = () => {
    setSavedDistance(distance) 
    setActiveSection(null) 
  }

  return (
    <Wrapper>
      <div className='container'>
        <div className='heading'>
          <h1>Settings</h1>
        </div>

        <div className="accordion">
          <h2 onClick={() => toggleSection("connection")}>Connection Request</h2>
          {activeSection === "connection" && (
            <div className="modal-overlay">
              <div className='modal-content'>
                <div className='header'>
                  <h2>Connection Request</h2>
                  <p onClick={() => setActiveSection(null)}><FaTimes /></p>
                </div>

                <div className="scroll-container">
                  <table>
                    <thead>
                      <tr>
                        <th>S.NO.</th>
                        <th>User Name</th>
                        <th>Guest Name</th>
                        <th>Status</th>
                        <th>Approve / Deny</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={user.id}>
                          <td>{index + 1}</td>
                          <td>{user.userName}</td>
                          <td>{user.guestName}</td>
                          <td>{user.userStatus}</td>
                          <td>
                            <button onClick={() => handleStatusChange(user.id, "Approved")}>Approve</button>
                            <button onClick={() => handleStatusChange(user.id, "Denied")}>Deny</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="accordion">
          <h2 onClick={() => toggleSection("distance")}>
            Distance To Check-In {savedDistance && `- ${savedDistance} m`}
          </h2>
          {activeSection === "distance" && (
            <div className="distance-overlay">
              <div className="distance-body">
                <h2>Distance To Check-In</h2>
                <span>Distance</span>
                <input
                  type="text"
                  placeholder="Enter the Distance"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)} 
                />
                <button onClick={handleSaveDistance}>Save</button>
                <button onClick={() => setActiveSection(null)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  )
}

export default Settings
