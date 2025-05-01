import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Wrapper from './style'
import axios from 'axios'

const Security = () => {

  // const REACT_APP_BACKEND_URL = "http://192.168.0.87:5000/api";

  const [isVisible, setIsVisible] = useState(null)
  const [isBlock, setIsBlock] = useState({})
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/block-status`);
        if (response.data && response.data.users) {
          const userResponse = response.data.users;

          // Create block status mapping
          const blockStatusMap = {};
          userResponse.forEach(user => {
            blockStatusMap[user.user_id] = user.block_status === "blocked" ? "Block" : "Unblock";
          });

          setUsers(userResponse);
          setIsBlock(blockStatusMap);
        }
      } catch (error) {
        console.log(`Error fetching the data`);
      }
    };

    fetchData();
  }, [])

  const handleVisibility = (section) => {
    setIsVisible(section)
  }

  const handleClose = () => {
    setIsVisible(null)
  }

  const handleStatusChange = async (userId) => {
    const confirmAction = window.confirm("Are you sure you want to change the block status?");

    if (confirmAction) {
      // Determine the new block status
      const currentStatus = isBlock[userId];
      const newStatus = currentStatus === "Block" ? "unblocked" : "blocked";

      try {
        // Send the PUT request with headers ensuring JSON format
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/users/block-status`, {
          id: userId,
          block_status: newStatus
        }, {
          headers: { "Content-Type": "application/json" }  // ✅ Ensure request is JSON
        });

        // Update the UI state
        setIsBlock((prev) => ({
          ...prev,
          [userId]: newStatus === "blocked" ? "Block" : "Unblock"
        }));
      } catch (error) {
        console.error("Error updating block status:", error.response ? error.response.data : error.message);
        alert("Failed to update block status!");
      }
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
    <Wrapper>
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
          <h2 onClick={() => handleVisibility('reports')}>Case Content</h2>
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
                        <tr key={user.user_id}>
                          <td>{index + 1}</td>
                          <td>{user.user_name}</td>
                          <td>
                            <input
                              type="button"
                              className={isBlock[user.user_id] === 'Unblock' ? 'danger-btn' : 'primary-btn'}
                              value={isBlock[user.user_id] || 'Block'}
                              onClick={() => handleStatusChange(user.user_id)}
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
                <h2>Case Content</h2>
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
