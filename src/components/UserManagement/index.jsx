import React, { useEffect, useState } from "react";
import { Pencil, Trash, Eye, EyeOff } from "lucide-react"; // Importing icons
import Wrapper from "./style";
import { FaEdit, FaEye } from "react-icons/fa"
import { MdDelete } from "react-icons/md";
import { Search } from "lucide-react";
import axios from '../AxiosInstance';
import { confirmAlert } from "react-confirm-alert";
import { toast, ToastContainer } from "react-toastify";

const UserManagement = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/users`);
        const formattedUsers = response.data.map(user => ({
          id: user.id,
          first_name: user.first_name?.trim() || "",
          middle_name: user.middle_name?.trim() || "",
          last_name: user.last_name?.trim() || "",
          email: user.email || "N/A",
          role: user.attendees_role || "N/A",
          status: user.status
            ? user.status.charAt(0).toUpperCase() + user.status.slice(1)
            : "inactive",
          password_hash: user.password_hash || "••••••••",
          selected: false,
          showPassword: false,
        }));

        setUsers(formattedUsers);
      } catch (error) {
        console.error(`Error in fetching: ${error}`);
      }
    };

    fetchData();
  }, []);

  const handleSelectUser = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, selected: !user.selected } : user
      )
    );
  };

  const handleToggleStatus = (id) => {
    const userToUpdate = users.find(user => user.id === id);
    if (!userToUpdate) return;

    const newStatus = userToUpdate.status.toLowerCase() === "active" ? "inactive" : "active";

    confirmAlert({
      title: "Confirm Status Change",
      message: `Are you sure you want to change the status to ${newStatus}?`,
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await axios.put(`/users/status/${id}`, { status: newStatus });

              const updatedStatus = response.data.status;

              setUsers(prevUsers =>
                prevUsers.map(user =>
                  user.id === id ? { ...user, status: updatedStatus } : user
                )
              );
              toast.success("Status successfully update!")
            } catch (error) {
              console.error("Failed to toggle status:", error);
              toast.error("Could not update user status.");
            }
          }
        },
        {
          label: "No",
          onClick: () => { }
        }
      ]
    });
  };

  const handleTogglePassword = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, showPassword: !user.showPassword } : user
      )
    );
  };

  const [search, setSearch] = useState(""),
    [modalType, setModalType] = useState(""),
    [currentUser, setCurrentUser] = useState({}),
    [newPassword, setNewPassword] = useState("");

  // const handleSaveUser = async () => {
  //   const isEdit = modalType === "edit";
  //   const url = isEdit ? `/users/${currentUser.id}` : "/users";
  //   const method = isEdit ? "PUT" : "POST";

  //   // if (!window.confirm(`Are you sure you want to ${isEdit ? "update" : "add"} this user?`)) return;

  //   const userData = {
  //     first_name: currentUser.first_name || "",
  //     middle_name: currentUser.middle_name || "",
  //     last_name: currentUser.last_name || "",
  //     username: currentUser.username || "",
  //     email: currentUser.email || "",
  //     password: currentUser.password || "",
  //     role_id: Number(currentUser.role_id) || 3,
  //     attendees_role: currentUser.role || "",
  //     photo: currentUser.photo || "",
  //     linkedin_url: currentUser.linkedin_url || "",
  //   };


  //   console.log("Sending Data:", userData);

  //   try {
  //     let response;

  //     if (isEdit) {
  //       response = await axios.put(url, userData);
  //     } else {
  //       response = await axios.post(url, userData);
  //     }

  //     const data = response.data
  //     console.log("Server Response:", data); // ✅ Check response from backend

  //     if (!response.ok) {
  //       throw new Error(data.error || `Failed to ${isEdit ? "update" : "add"} user.`);
  //     }

  //     if (isEdit) {
  //       setUsers(users.map(user => (user.id === currentUser.id ? data : user)));
  //     } else {
  //       setUsers([...users, { ...data, selected: false, status: "active" }]);
  //     }

  //     closeModal();
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast.error(`Error: ${error.message}`);
  //   }
  // }

  const handleSaveUser = async () => {
    const isEdit = modalType === "edit";
    const url = isEdit ? `/users/${currentUser.id}` : "/users";

    const userData = {
      first_name: currentUser.first_name || "",
      middle_name: currentUser.middle_name || "",
      last_name: currentUser.last_name || "",
      username: currentUser.username || "",
      email: currentUser.email || "",
      password: currentUser.password || "",
      role_id: Number(currentUser.role_id) || 3,
      attendees_role: currentUser.role || "",
      photo: currentUser.photo || "",
      linkedin_url: currentUser.linkedin_url || "",
    };

    try {
      const response = isEdit
        ? await axios.put(url, userData)
        : await axios.post(url, userData);

      const data = response.data;

      if (isEdit) {
        setUsers(users.map(user => (user.id === currentUser.id ? data : user)));
        toast.success("User updated successfully!");
      } else {
        setUsers([...users, { ...data, selected: false, status: "active" }]);
        toast.success("User added successfully!");
      }

      closeModal(); // ✅ Close the modal after success
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this user?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await axios.delete(`/users/${id}`)

              if (response.data && response.data.message) {
                toast.success(response.data.message);
              } else {
                toast.success("Event deleted successfully!");
              }

              const updatedUsers = users.filter((user) => user.id !== id)
              setUsers(updatedUsers)
            }
            catch (error) {
              console.error("Error deleting user:", error);
              toast.error("Error deleting user. Please try again.");
            }
          }
        },
        { label: "No" }
      ]
    })
  }

  const handleBulkDelete = () => {
    const selectedIds = users.filter(user => user.selected).map(user => user.id);

    if (selectedIds.length === 0) return;

    confirmAlert({
      title: "Confirm Delete",
      message: `Are you sure you want to delete ${selectedIds.length} user(s)?`,
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await axios.post(
                `/users/deletemass`,
                { ids: selectedIds } // Adjust to match your backend format
              );

              // ✅ Remove deleted users from local state
              setUsers(prevUsers => prevUsers.filter(user => !selectedIds.includes(user.id)));

              alert("Users deleted successfully");
            } catch (error) {
              console.error("Bulk delete error:", error.response?.data || error.message);
              alert("Failed to delete users.");
            }
          }
        },
        {
          label: "No"
        }
      ]
    });
  };

  const openModal = (type, user = {}) => (setModalType(type), setCurrentUser(user));

  const closeModal = () => (setModalType(""), setCurrentUser({}), setNewPassword(""));

  const handleResetButton = () => {
    if (window.confirm("Are you sure you want to Reset Password for the selected users?")) {
      alert(`Link Send successfully for Selected Users`);
    }
  };

  return (
    <Wrapper>
      <div className="heading">
        <h2>User Management</h2>
      </div>

      <div className="header">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search User..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-box"
          />
        </div>
        <div className="header-buttons">
          <button

            className={`bulk-reset-btn ${users.some(user => user.selected) ? "active" : ""}`}
            onClick={handleResetButton}
            disabled={!users.some(user => user.selected)}
          >
            Reset Password
          </button>
          <div className="header-right">
            <button
              className={`bulk-delete-btn ${users.some(user => user.selected) ? "active" : ""}`}
              onClick={handleBulkDelete}
              disabled={!users.some(user => user.selected)}
            >
              <Trash size={16} /> Delete Selected
            </button>
          </div>
          <div className="header-left">
            <button className="add-btn" onClick={() => openModal("add")}>+ Add User</button>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" onChange={(e) => setUsers(users.map(user => ({ ...user, selected: e.target.checked })))} /></th>
              <th>ID</th> <th>Name</th> <th>Email</th> <th>Role</th>
              <th>Status</th><th>Password</th> <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) =>
                (`${user.first_name || ''} ${user.last_name || ''}`).toLowerCase().includes(search.toLowerCase())
              )
              .map((user) => (
                <tr key={user.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={user.selected}
                      onChange={() => handleSelectUser(user.id)}
                    />
                  </td>
                  <td>{user.id}</td>
                  <td>
                    {user.first_name} {user.middle_name} {user.last_name}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={user.status?.toLowerCase() === "active"}
                        onChange={() => handleToggleStatus(user.id)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
                  <td>
                    {user.showPassword ? user.password_hash : "••••••••"}
                    <button
                      onClick={() => handleTogglePassword(user.id)}
                      className="password"
                    >
                      {user.showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </td>
                  <td>
                    <div className="button">
                      {/* <button className="reset-btn" onClick={() => openModal("reset-password", user)}>
                        <FaEye />
                      </button> */}

                      <button className="edit-btn" onClick={() => openModal("edit", user)}>
                        <FaEdit size={15} />
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                        <MdDelete size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {
        modalType === "add" ? (
          <div className="modal">
            <div className="modal-content">
              <h3>Add User</h3>
              <input type="text" placeholder="First Name" value={currentUser.first_name || ""} onChange={(e) => setCurrentUser({ ...currentUser, first_name: e.target.value })} required />
              <input type="text" placeholder="Middle Name" value={currentUser.middle_name || ""} onChange={(e) => setCurrentUser({ ...currentUser, middle_name: e.target.value })} />
              <input type="text" placeholder="Last Name" value={currentUser.last_name || ""} onChange={(e) => setCurrentUser({ ...currentUser, last_name: e.target.value })} required />
              <input
                type="text"
                placeholder="Username"
                value={currentUser.username || ""}
                onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}
              />
              <input type="email" placeholder="Email" value={currentUser.email || ""} onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} required />
              <input type="password" placeholder="Password" value={currentUser.password || ""} onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })} required />
              <input type="text" placeholder="Role" value={currentUser.role || ""} onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })} required />
              <input
                type="text"
                value={`${currentUser.role_id ?? 3}`}
                readOnly
              />
              <input type="text" placeholder="LinkedIn URL" value={currentUser.linkedin_url || ""} onChange={(e) => setCurrentUser({ ...currentUser, linkedin_url: e.target.value })} required />
              <button onClick={handleSaveUser} className="submit-btn">Save</button>
              <button className="close-btn" onClick={closeModal}>&times;</button>
            </div>
          </div>
        ) : null}
      {
        modalType === "edit" ? (
          <div className="modal">
            <div className="modal-content">
              <h3>Edit User</h3>
              <input type="text" placeholder="First Name" value={currentUser.first_name || ""} onChange={(e) => setCurrentUser({ ...currentUser, first_name: e.target.value })} />
              <input type="text" placeholder="Middle Name" value={currentUser.middle_name || ""} onChange={(e) => setCurrentUser({ ...currentUser, middle_name: e.target.value })} />
              <input type="text" placeholder="Last Name" value={currentUser.last_name || ""} onChange={(e) => setCurrentUser({ ...currentUser, last_name: e.target.value })} />
              <input type="email" placeholder="Email" value={currentUser.email || ""} onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} />
              <input type="password" placeholder="Password" value={currentUser.password || ""} onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })} />
              <input type="text" placeholder="Role" value={currentUser.role || ""} onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })} />
              <input type="text" placeholder="LinkedIn URL" value={currentUser.linkedin || ""} onChange={(e) => setCurrentUser({ ...currentUser, linkedin: e.target.value })} />
              <button onClick={handleSaveUser} className="submit-btn">Save</button>
              <button className="close-btn" onClick={closeModal}>&times;</button>
            </div>
          </div>
        ) : null}

      {modalType === "reset-password" && (
        <div className="modal">
          <div className="modal-content">
            <h3>{currentUser.first_name} Details</h3>
            <p><strong>Name:</strong> {currentUser.first_name} {currentUser.middle_name} {currentUser.last_name}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>Role:</strong> {currentUser.role}</p>
            <button className="close-btn" onClick={closeModal}>&times;</button>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={1500} />
    </Wrapper >
  );
};

export default UserManagement;