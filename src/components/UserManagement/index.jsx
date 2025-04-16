import React, { useState } from "react";
import { Pencil, Trash, Eye, EyeOff } from "lucide-react"; // Importing icons
import Wrapper from "./style";
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md";
import { Search } from "lucide-react";

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      first_name: "Jese",
      middle_name: "",
      last_name: "Leos",
      email: "jese.leos@example.com",
      role: "Admin",
      role_id: 3,
      linkedin_url: "https://linkedin.com/in/jeseleos",
      password: "admin123",
      status: "Active",
      selected: false,
      showPassword: false
    },
    // add more users here...
  ]);
  
  const handleSubmit = async () => {
    const userToSave = { ...currentUser, role_id: 3 };
    // your fetch/axios POST or PUT call here
  };
  
  const [search, setSearch] = useState(""),
    [modalType, setModalType] = useState(""),
    [currentUser, setCurrentUser] = useState({}),
    [newPassword, setNewPassword] = useState("");

    const handleEdit = (user) => {
      setCurrentUser({
        name: user.name || "",
        email: user.email || "",
        password: user.password || "",
        status: user.status || "Active",
        role_id: 3,  // Force to 3
      });
    };
    
    
  const getNextId = () => users.reduce((maxId, user) => Math.max(maxId, user.id), 0) + 1;

  const updateUsers = (updatedUsers) => setUsers(updatedUsers.map((user, index) => ({ ...user, id: index + 1 })));

  const handleSaveUser = () => {
    if (!window.confirm(`Are you sure you want to ${modalType === "edit" ? "update" : "add"} this user ?`)) return;
    modalType === "edit"
      ? setUsers(users.map(user => (user.id === currentUser.id ? currentUser : user)))
      : setUsers([...users, { ...currentUser, id: getNextId(), selected: false, status: "Active" }]);
    closeModal();
  };

  const handleDelete = (id) => window.confirm("Are you sure you want to delete this user?") && updateUsers(users.filter(user => user.id !== id));

  const handleBulkDelete = () => window.confirm("Are you sure you want to delete the selected users?") && updateUsers(users.filter(user => !user.selected));

  const handleToggleStatus = (id) => window.confirm("Are you sure you want to change the status?") && setUsers(users.map(user => user.id === id ? { ...user, status: user.status === "Active" ? "Banned" : "Active" } : user));
  const handleTogglePassword = (id) => {
    setUsers(users.map(user => user.id === id ? { ...user, showPassword: !user.showPassword } : user));
  };

  const handleResetPassword = () => {
    if (window.confirm(`Are you sure you want to reset ${currentUser.name}'s password?`)) {
      alert(`Password reset successful for ${currentUser.name}. New password: ${newPassword}`);
      setNewPassword("");
      closeModal();
    }
  };

  const handleSelectUser = (id) => setUsers(users.map(user => user.id === id ? { ...user, selected: !user.selected } : user));

  const openModal = (type, user = {}) => (setModalType(type), setCurrentUser(user));

  const closeModal = () => (setModalType(""), setCurrentUser({}), setNewPassword(""));

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
        <button
          className={`bulk-delete-btn ${users.some(user => user.selected) ? "active" : ""}`}
          onClick={handleBulkDelete}
          disabled={!users.some(user => user.selected)}
        >
          <Trash size={16} /> Delete Selected
        </button>

        <button className="add-btn" onClick={() => openModal("add")}>+ Add User</button>
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
.map(user => (
              <tr key={user.id}>
                <td><input type="checkbox" checked={user.selected} onChange={() => handleSelectUser(user.id)} /></td>
                <td>{user.id}</td>
                <td>{`${user.first_name || ""} ${user.middle_name || ""} ${user.last_name || ""}`.trim()}</td>
                <td>{user.email}</td>
                <td>{user.role} </td>

                <td className={`status-text ${user.status.toLowerCase()}`} onClick={() => handleToggleStatus(user.id)} style={{ cursor: "pointer" }}>{user.status}</td>
                <td>
                  {user.showPassword ? user.password : "••••••••"}
                  <button onClick={() => handleTogglePassword(user.id)} className="password">
                    {user.showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </td>
                <td>
                  <div className="button">
                    <button className="reset-btn" onClick={() => openModal("reset-password", user)}>
                      Reset Password
                    </button>

                    <button className="edit-btn" onClick={() => openModal("edit", user)}>
                      <FaEdit size={15} /> {/* Edit Icon */}
                      
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                      <MdDelete size={15} /> {/* Delete Icon */}
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
      <input type="text" placeholder="First Name" value={currentUser.first_name || ""} onChange={(e) => setCurrentUser({ ...currentUser, first_name: e.target.value })} />
      <input type="text" placeholder="Middle Name" value={currentUser.middle_name || ""} onChange={(e) => setCurrentUser({ ...currentUser, middle_name: e.target.value })} />
      <input type="text" placeholder="Last Name" value={currentUser.last_name || ""} onChange={(e) => setCurrentUser({ ...currentUser, last_name: e.target.value })} />
      <input type="email" placeholder="Email" value={currentUser.email || ""} onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} />
      <input type="text" placeholder="Role" value={currentUser.role || ""} onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })} />
      <input 
    type="text" 
    value={`Role ID - ${currentUser.role_id || 3}`}  
    readOnly 
  />
      <input type="text" placeholder="LinkedIn URL" value={currentUser.linkedin_url || ""} onChange={(e) => setCurrentUser({ ...currentUser, linkedin_url: e.target.value })} />
      <input type="password" placeholder="Password" value={currentUser.password || ""} onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })} />
      <button onClick={handleSaveUser} className="submit-btn">Save</button>
      <button className="close-btn" onClick={closeModal}>&times;</button>
    </div>
  </div>
) : null}
     {
 modalType ==="edit" ? (
  <div className="modal">
    <div className="modal-content">
      <h3>Edit User</h3>
      <input type="text" placeholder="First Name" value={currentUser.first_name || ""} onChange={(e) => setCurrentUser({ ...currentUser, first_name: e.target.value })} />
      <input type="text" placeholder="Middle Name" value={currentUser.middle_name || ""} onChange={(e) => setCurrentUser({ ...currentUser, middle_name: e.target.value })} />
      <input type="text" placeholder="Last Name" value={currentUser.last_name || ""} onChange={(e) => setCurrentUser({ ...currentUser, last_name: e.target.value })} />
      <input type="email" placeholder="Email" value={currentUser.email || ""} onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} />
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
      <h3>Reset Password for {currentUser.name}</h3>
      <input type="password" placeholder="Enter New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <button onClick={handleResetPassword} className="submit-btn">Reset Password</button>
      <button className="close-btn" onClick={closeModal}>&times;</button>
    </div>
  </div>
)}

    </Wrapper >
  );
};

export default UserManagement;