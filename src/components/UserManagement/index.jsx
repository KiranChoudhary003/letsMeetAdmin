import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { confirmAlert } from "react-confirm-alert";
import { FaEdit, FaSearch } from "react-icons/fa";
import { MdAddCircle, MdDelete, MdLockReset } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import axios from "../AxiosInstance";
import LoadingScreen from "../loading";
import Wrapper from "./style";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalType, setModalType] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  // const [newPassword, setNewPassword] = useState("");
  const isFirstLoad = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      if (isFirstLoad.current) {
        setLoading(true); // Show loading only on first mount
      }
      try {
        const response = await axios.get(`/users`);
        const formattedUsers = response.data.map((user) => ({
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
          linkedin_url: user.linkedin_url || "", // <-- Ensure linkedin_url is captured here
        }));
        setUsers(formattedUsers);
      } catch (error) {
        console.error(`Error in fetching: ${error}`);
      } finally {
        setLoading(false);
        isFirstLoad.current = false; // Mark first load done
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

  const handleToggleStatus = async (id) => {
    const userToUpdate = users.find((user) => user.id === id);
    if (!userToUpdate) return;

    const currentStatus = userToUpdate.status || "";
    const newStatus =
      currentStatus.toLowerCase() === "active" ? "inactive" : "active";

    try {
      const response = await axios.put(`/users/status/${id}`, {
        status: newStatus,
      });

      const updatedStatus = response.data?.status || newStatus; // Adjust based on your API

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, status: updatedStatus } : user
        )
      );

      // Show custom toast message depending on the updated status
      if (updatedStatus.toLowerCase() === "active") {
        toast.success("User enabled successfully!");
      } else {
        toast.success("User disabled successfully!");
      }
    } catch (error) {
      console.error("Failed to toggle status:", error);
      toast.error("Could not update user status.");
    }
  };

  const handleTogglePassword = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, showPassword: !user.showPassword } : user
      )
    );
  };

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
      linkedin_url: currentUser.linkedin_url || "", // <-- use linkedin_url consistently
    };


    try {
      const response = isEdit
        ? await axios.put(url, userData)
        : await axios.post(url, userData);

      const data = response.data;

      if (isEdit) {
        setUsers(
          users.map((user) => (user.id === currentUser.id ? data : user))
        );
        toast.success("User updated successfully!");
      } else {
        setUsers([...users, { ...data, selected: false, status: "active" }]);
        toast.success("User added successfully!");
      }

      closeModal();
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
              const response = await axios.delete(`/users/${id}`);

              if (response.data && response.data.message) {
                toast.success(response.data.message);
              } else {
                toast.success("User deleted successfully!");
              }

              setUsers(users.filter((user) => user.id !== id));
            } catch (error) {
              console.error("Error deleting user:", error);
              toast.error("Error deleting user. Please try again.");
            }
          },
        },
        { label: "No" },
      ],
    });
  };

  const handleBulkDelete = () => {
    const selectedIds = users
      .filter((user) => user.selected)
      .map((user) => user.id);

    if (selectedIds.length === 0) return;

    confirmAlert({
      title: "Confirm Delete",
      message: `Are you sure you want to delete ${selectedIds.length} user(s)?`,
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await axios.post(`/users/deletemass`, { ids: selectedIds });

              setUsers((prevUsers) =>
                prevUsers.filter((user) => !selectedIds.includes(user.id))
              );

              toast.success("Users deleted successfully");
            } catch (error) {
              console.error(
                "Bulk delete error:",
                error.response?.data || error.message
              );
              toast.error("Failed to delete users.");
            }
          },
        },
        { label: "No" },
      ],
    });
  };

  const openModal = (type, user = {}) => {
    setModalType(type);
    setCurrentUser(user);
  };

  const closeModal = () => {
    setModalType("");
    setCurrentUser({});
    // setNewPassword("");
  };

  // const handleResetButton = () => {
  //   if (
  //     window.confirm(
  //       "Are you sure you want to Reset Password for the selected users?"
  //     )
  //   ) {
  //     alert(`Link sent successfully for Selected Users`);
  //   }
  // };
  const handleResetButton = () => {
    confirmAlert({
      title: "Confirm Reset Password",
      message: `Are you sure you want to reset password`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            toast.success(`Link sent successfully for selected user`)
          }
        },
        {
          label: "No"
        }
      ]
    }
    )
  }

  if (loading) return <LoadingScreen />; // Show loading screen while fetching data

  return (
    <Wrapper>
      <section className="users">
        <h1>User Management</h1>
        <div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search User..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            <FaSearch className="search-icon" />
          </div>
        </div>
        <div className="button-wrapper">
          <div className="button-placeholder">
            <button
              className="bulk-reset-btn"
              onClick={handleResetButton}
              disabled={!users.some((user) => user.selected)}
              style={{
                visibility: users.some((user) => user.selected)
                  ? "visible"
                  : "hidden",
              }}
            >
              Reset Password <MdLockReset size={26} />
            </button>
            <button
              className="bulk-delete-btn"
              onClick={handleBulkDelete}
              disabled={!users.some((user) => user.selected)}
              style={{
                visibility: users.some((user) => user.selected)
                  ? "visible"
                  : "hidden",
              }}
            >
              Delete <MdDelete size={26} />
            </button>
            <button className="add-btn" onClick={() => openModal("add")}>
              Add <MdAddCircle size={26} />
            </button>
          </div>
        </div>
      </section>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              {/* Select All checkbox with functional update */}
              <th>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setUsers((prevUsers) =>
                      prevUsers.map((user) => ({
                        ...user,
                        selected: e.target.checked,
                      }))
                    )
                  }
                  checked={
                    users.length > 0 && users.every((user) => user.selected)
                  }
                />
              </th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) =>
                `${user.first_name ?? ""} ${user.last_name ?? ""}`
                  .toLowerCase()
                  .includes(search.toLowerCase())
              ).length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                  No user data available.
                </td>
              </tr>
            ) : (
              users
                .filter((user) =>
                  `${user.first_name ?? ""} ${user.last_name ?? ""}`
                    .toLowerCase()
                    .includes(search.toLowerCase())
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
                        {user.showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </td>
                    <td>
                      <div className="button">
                        <button
                          className="edit-btn"
                          onClick={() => openModal("edit", user)}
                        >
                          <FaEdit size={20} />
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(user.id)}
                        >
                          <MdDelete size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {modalType === "add" && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add User</h3>
            <input
              type="text"
              placeholder="First Name"
              value={currentUser.first_name || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, first_name: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Middle Name"
              value={currentUser.middle_name || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, middle_name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Last Name"
              value={currentUser.last_name || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, last_name: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Username"
              value={currentUser.username || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, username: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              value={currentUser.email || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, email: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={currentUser.password || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, password: e.target.value })
              }
              required
            />
            <input
              type="text"
              value={`${currentUser.role_id ?? 3}`}
              readOnly
            />
            <input
              type="text"
              placeholder="Role"

              value={currentUser.role || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, role: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="LinkedIn URL"
              value={currentUser.linkedin_url || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, linkedin_url: e.target.value })
              }
            />
            <div className="newsavebtn">
              <button onClick={handleSaveUser}>Save</button>
            </div>
            <div className="newclosebtn">
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}


      {/* Edit User Modal */}
      {modalType === "edit" && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit User</h3>
            <input
              type="text"
              placeholder="First Name"
              value={currentUser.first_name || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, first_name: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Middle Name"
              value={currentUser.middle_name || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, middle_name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Last Name"
              value={currentUser.last_name || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, last_name: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Username"
              value={currentUser.username || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, username: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              value={currentUser.email || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, email: e.target.value })
              }
              required
            />


            <input
              type="text"
              placeholder="Role"
              value={currentUser.role || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, role: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="LinkedIn URL"
              value={currentUser.linkedin_url || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, linkedin_url: e.target.value })
              }
            />
            <div className="newsavebtn">
              <button onClick={handleSaveUser}>Save</button>
            </div>
            <div className="newclosebtn">
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </Wrapper>
  );
};

export default UserManagement;
