import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Wrapper from './style'

const Security = ({ users, setUsers }) => {

  const [isVisible, setIsVisible] = useState(null)
  const [isBlock, setIsBlock] = useState({})

  const handleVisibility = (section) => {
    setIsVisible(section)
  }

  const handleClose = () => {
    setIsVisible(null)
  }

  const handleStatusChange = (userId) => {
    const confirmAction = window.confirm("Are you sure you want to change the block status?")

    if (confirmAction) {
      setIsBlock((prevBlockedUsers) => ({
        ...prevBlockedUsers,
        [userId]: prevBlockedUsers[userId] === 'Blocked' ? 'Block' : 'Blocked',
      }))
    }
  }

  const handleChange = (id, newStatus) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === id) {
          if (user.reportStatus === "pending" && newStatus === "In Progress") {
            return { ...user, reportStatus: "In Progress" }
          } else if (user.reportStatus.toLowerCase() === "in progress" && newStatus === "Completed") {
            return { ...user, reportStatus: "Completed" }
          } else if (user.reportStatus.toLowerCase() === "completed") {
            alert("Status is already Completed and cannot be changed.")
            return user
          }
        }
        return user
      })
    )
  
    console.log("Updated Users:", users) 
  }
  

  return (
    <Wrapper isVisible={isVisible}>
      <div className="container">
        <div className="heading">
          <h1>Security</h1>
        </div>

        <div className="accordion">
          <h2 onClick={() => handleVisibility('block')}>Block Users</h2>
        </div>

        <div className="accordion">
          <h2 onClick={() => handleVisibility('admin')}>Admin Activities</h2>
        </div>

        <div className="accordion">
          <h2 onClick={() => handleVisibility('reports')}>Resolve Reports</h2>
        </div>
      </div>

      {isVisible && (
        <div className="overlay">
          <div className="popup">
            <button className="close-btn" onClick={handleClose}>
              <FontAwesomeIcon icon={faTimes} />
            </button>

            {isVisible === 'block' && (
              <>
                <h2>Block Users</h2>
                <div className="scroll-container">
                  <table>
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>User Name</th>
                        <th>Block</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={user.id}>
                          <td>{index + 1}</td>
                          <td>{user.userName}</td>
                          <td>
                            <input
                              type="button"
                              className={isBlock[user.id] === 'Blocked' ? 'danger-btn' : 'primary-btn'}
                              value={isBlock[user.id] || 'Block'}
                              onClick={() => handleStatusChange(user.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {isVisible === 'admin' && (
              <>
                <h2>Admin Activities Content</h2>
                <div className="scroll-container">
                  <table>
                    <thead>
                      <tr>

                      </tr>
                    </thead>
                    <tbody>
                      <tr>

                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
            {isVisible === 'reports' && (
              <>
                <h2>Resolve Reports Content</h2>
                <div className="scroll-container">
                  <table>
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Complain</th>
                        <th>Status</th>
                        <th>Task</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={user.id}>
                          <td>{index + 1}</td>
                          <td>{user.issue}</td>
                          <td>{user.reportStatus}</td>
                          <td>
                            <button className="report-btn in-progress" onClick={() => handleChange(user.id, "In Progress")}>
                              In Progress
                            </button>
                            <button className="report-btn completed" onClick={() => handleChange(user.id, "Completed")}>
                              Completed
                            </button>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Wrapper>
  )
}

export default Security
