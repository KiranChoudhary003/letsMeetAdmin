import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Wrapper from './style'
import axios from '../AxiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import LoadingScreen from "../loading";

const Security = () => {
  const [isVisible, setIsVisible] = useState(null);
  const [isBlock, setIsBlock] = useState({});
  const [users, setUsers] = useState([]);
  const [blockUsers, setBlockUsers] = useState([]); // ✅ Needed to render "Block Users"
  const [loading, setLoading] = useState(true);

  const handleVisibility = (section) => {
    setIsVisible(section);
  };

  const handleClose = () => {
    setIsVisible(null);
  };

  const handleStatusChange = async (userId) => {
    const confirmAction = window.confirm("Are you sure you want to change the block status?");
    if (confirmAction) {
      const currentStatus = isBlock[userId];
      const newStatus = currentStatus === "Block" ? "unblocked" : "blocked";
      try {
        await axios.put(`/users/block-status`, {
          id: userId,
          block_status: newStatus
        }, {
          headers: { "Content-Type": "application/json" }
        });

        setIsBlock((prev) => ({
          ...prev,
          [userId]: newStatus === "blocked" ? "Block" : "Unblock"
        }));
      } catch (error) {
        console.error("Error updating block status:", error.response ? error.response.data : error.message);
        toast.error("Failed to update block status!");
      }
    }
  };

  const normalizeStatus = (status) => {
    if (!status) return "";
    const lower = status.toLowerCase();
    if (lower === "pending") return "pending";
    if (lower === "in progress") return "in_progress";
    if (lower === "complete" || lower === "completed") return "complete";
    return lower;
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [userRes, reportRes] = await Promise.all([
          axios.get(`/users/block-status`),
          axios.get(`/security/reports`)
        ]);

        if (userRes.data?.users) {
          const userResponse = userRes.data.users;
          const blockStatusMap = {};
          userResponse.forEach(user => {
            blockStatusMap[user.user_id] = user.block_status === "blocked" ? "Block" : "Unblock";
          });
          setIsBlock(blockStatusMap);
          setBlockUsers(userResponse); // ✅ This was missing before
        }

        const reports = reportRes.data.reports || [];
        const formatted = reports.map(r => ({
          id: r.id,
          issue: r.reason,
          reportStatus: normalizeStatus(r.status),
          reportedBy: r.reported_by,
        }));
        setUsers(formatted);
      } catch (error) {
        console.error("Error during data fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handleChange = (id, newStatus) => {
    const currentUser = users.find(u => u.id === id);
    if (!currentUser) return;

    const current = currentUser.reportStatus;

    if (current === "pending" && newStatus === "in_progress") {
      updateStatus(id, newStatus);
    } else if (current === "in_progress" && newStatus === "complete") {
      updateStatus(id, newStatus);
    } else if (current === "complete") {
      toast.error("Status is already Completed and cannot be changed.");
    } else {
      toast.error(`Invalid status transition from ${current} to ${newStatus}`);
    }
  };

  const updateStatus = async (id, status) => {
    console.log("Updating report id:", id, "to status:", status);
    try {
      await axios.put(`/security/reports/update-status/${id}`, { status });
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === id ? { ...user, reportStatus: status } : user
        )
      );
      toast.success("Status updated successfully.");
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Failed to update status. Please try again.");
    }
  };


  if (loading) return <LoadingScreen />;

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
                      {blockUsers.map((user, index) => (
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
                    <thead><tr></tr></thead>
                    <tbody><tr></tr></tbody>
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
                        <th>User Id</th>
                        <th>Complain</th>
                        <th>Status</th>
                        <th>Task</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={user.id}>
                          <td>{user.reportedBy}</td>
                          <td>{user.issue}</td>
                          <td>{user.reportStatus}</td>
                          <td>
                            <button
                              className="report-btn in-progress"
                              onClick={() => handleChange(user.id, "in_progress")}
                              disabled={user.reportStatus !== "pending"}
                            >
                              In Progress
                            </button>
                            <button
                              className="report-btn completed"
                              onClick={() => handleChange(user.id, "complete")}
                              disabled={user.reportStatus !== "in_progress"}
                            >
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
      <ToastContainer position="top-right" autoClose={1500} />
    </Wrapper>
  );
};

export default Security;
