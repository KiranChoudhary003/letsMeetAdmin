import axios from '../AxiosInstance';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FaEdit, FaSearch } from "react-icons/fa";
import { MdAddCircle, MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "../loading";
import Wrapper from './style';

const AttendeeRoleManagement = () => {
    const [roles, setRoles] = useState([]);
    const [refreshFlag, setRefreshFlag] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleEntries, setVisibleEntries] = useState(10);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedRoles, setEditedRoles] = useState(null);
    const [isVisible, setIsVisible] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newRole, setNewRole] = useState({ role_name: "" });
    const tableRef = useRef(null);
    const isFirstLoad = useRef(true);


    const handleScroll = useCallback(() => {
        const tableElement = tableRef.current;
        if (!tableElement) return;

        const { scrollTop, scrollHeight, clientHeight } = tableElement;
        if (scrollTop + clientHeight >= scrollHeight - 20) {
            setVisibleEntries((prev) => Math.min(prev + 10, roles.length));
        }
    }, [roles.length]);

    const handleSelectEvent = useCallback((id) => {
        setSelectedRoles((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((eventId) => eventId !== id)
                : [...prevSelected, id]
        );
    }, []);

    const handleSelectAll = useCallback(() => {
        setSelectedRoles((prevSelected) =>
            prevSelected.length === roles.length ? [] : roles.map(role => role.id)
        );
    }, [roles]);


    const handleEdit = useCallback((id) => {
        const rolesEdit = roles.find((role) => role.id === id);
        setEditedRoles(rolesEdit);
        setIsModalOpen(true);
    }, [roles]);

    const handleInputChange = (field, value) => {
        setEditedRoles((prev) => ({ ...prev, [field]: value }));
    };


    const handleCancel = useCallback(() => {
        setIsModalOpen(false);
        setIsVisible(null);
    }, []);

    const handleSave = useCallback(async () => {
        try {
            await axios.put(`/users/attendee/roles/${editedRoles.id}`, editedRoles, {
                headers: { "Content-Type": "application/json" }
            });
            setIsModalOpen(false);
            setRefreshFlag(prev => !prev);
            toast.success("Successfully Edited!");
        } catch (error) {
            console.error("Error updating role:", error?.response?.data || error.message);
            toast.error("Failed to update role");
        }
    }, [editedRoles, setIsModalOpen, setRefreshFlag]);


    const handleDelete = (id) => {
        confirmAlert({
            title: "Confirm Deletion",
            message: "Are you sure you want to delete this role?",
            buttons: [
                {
                    label: "Yes",
                    autoFocus: "true",
                    onClick: async () => {
                        try {
                            const response = await axios.delete(`/users/attendee/roles/${id}`);
                            toast.success(response.data?.message || "Role Deleted Successfully");
                            setSelectedRoles((prev) => prev.filter((roleID) => roleID !== id));
                            setRefreshFlag(prev => !prev);
                        } catch (error) {
                            console.error("Error deleting event:", error?.response?.data || error.message);
                            toast.error("Error deleting event. Please try again.");
                        }
                    }
                },
                { label: "No" }
            ]
        });
    };

    const handleMassDelete = () => {
        if (selectedRoles.length === 0) {
            toast.warn("No roles selected for deletion!");
            return;
        }
        confirmAlert({
            title: "Confirm Deletion",
            message: `Are you sure you want to delete ${selectedRoles.length} role(s)?`,
            buttons: [
                {
                    label: "Yes",
                    autoFocus: true,
                    onClick: async () => {
                        let successCount = 0;
                        let failureCount = 0;
                        for (const id of selectedRoles) {
                            try {
                                await axios.delete(`/users/attendee/roles/${id}`);
                                successCount++;
                            } catch (error) {
                                console.error(`Error deleting role ID ${id}:`, error?.response?.data || error.message);
                                failureCount++;
                            }
                        }
                        if (successCount > 0) {
                            toast.success(`${successCount} role(s) deleted successfully.`);
                        }
                        if (failureCount > 0) {
                            toast.error(`${failureCount} role(s) failed to delete.`);
                        }
                        setSelectedRoles([]);
                        setRefreshFlag(prev => !prev);
                    }
                },
                {
                    label: "No"
                }
            ]
        });
    };



    const handleAddNewRole = () => {
        setIsVisible("addRole");
    };

    const handleAddRole = useCallback(async () => {
        const { role_name } = newRole;
        if (!role_name.trim()) {
            toast.error('Fill the required Role name');
            return;
        }
        try {
            await axios.post(`/users/attendee/roles`, { role_name }, {
                headers: { 'Content-Type': 'application/json' }
            });
            setIsVisible(null);
            setNewRole({ role_name: "" });
            setRefreshFlag(prev => !prev);
            toast.success("Role added successfully!");
        } catch (error) {
            console.error("Error adding role:", error?.response?.data || error.message);
            toast.error("Failed to add role. Please try again.");
        }
    }, [newRole, setIsVisible, setNewRole, setRefreshFlag]);


    const highlightMatch = (text, query) => {
        if (!query) return text;
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const parts = text.split(regex);
        return (
            <>
                {parts.map((part, index) =>
                    regex.test(part) ? <strong key={index}>{part}</strong> : part
                )}
            </>
        );
    };


    const filteredRoles = useMemo(() =>
        roles.filter(role => role.role_name?.toLowerCase().includes(searchQuery.toLowerCase())),
        [roles, searchQuery]
    );

    useEffect(() => {
        const fetchData = async () => {
            if (isFirstLoad.current) {
                setLoading(true); // Show loading only on first mount
            }
            try {
                const response = await axios.get(`/users/attendee/roles`);
                setRoles(response.data.roles);
            } catch (error) {
                console.log(`Error fetching:`, error?.response?.data || error.message);
            } finally {
                if (isFirstLoad.current) {
                    setLoading(false); // Hide loading only if it was shown
                    isFirstLoad.current = false; // Mark initial load as done
                }
            }
        };

        fetchData();

        const tableElement = tableRef.current;
        if (tableElement) {
            tableElement.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (tableElement) {
                tableElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, [refreshFlag, handleScroll]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (isModalOpen || isVisible === "addRole") {
                if (event.key === "Escape") {
                    event.preventDefault();
                    handleCancel();
                } else if (event.key === "Enter") {
                    event.preventDefault();
                    if (isModalOpen && editedRoles) {
                        handleSave();
                    } else if (isVisible === "addRole") {
                        handleAddRole();
                    }
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isModalOpen, isVisible, editedRoles, handleAddRole, handleCancel, handleSave])


    if (loading) return <LoadingScreen />;

    return (
        <Wrapper>
            <section className='attendee-role'>
                <h1>Attendee Roles</h1>
                <div>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search event by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <FaSearch className="search-icon" />
                    </div>
                </div>
                <div className='button-class'>
                    {selectedRoles.length > 1 && (
                        <button className='mass-delete' onClick={handleMassDelete}>Delete</button>
                    )}
                    <button className='add-btn' onClick={handleAddNewRole}>Add <MdAddCircle size={26} /></button>
                </div>
            </section>
            <section className="table-container" ref={tableRef}>
                <table className="whole-table">
                    <thead className="table-header">
                        <tr>
                            <th className="column checkbox">
                                <input
                                    type="checkbox"
                                    checked={filteredRoles.length > 0 && selectedRoles.length === filteredRoles.length}
                                    disabled={filteredRoles.length === 0}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th className="column id">ID</th>
                            <th className="column name">Role Name</th>
                            <th className="column actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {filteredRoles.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="no-data-message">
                                    No roles match your search.
                                </td>
                            </tr>
                        ) : (
                            filteredRoles.slice(0, visibleEntries).map((role) => (
                                <tr key={role.id} className="table-row">
                                    <td className="column checkbox">
                                        <input
                                            type="checkbox"
                                            checked={selectedRoles.includes(role.id)}
                                            onChange={() => handleSelectEvent(role.id)}
                                        />
                                    </td>
                                    <td className="column id">{role.id}</td>
                                    <td className="column name">{highlightMatch(role.role_name, searchQuery)}</td>
                                    <td className="column actions">
                                        <p className="edit-btn" onClick={() => handleEdit(role.id)}><FaEdit /></p>
                                        <p className="delete-btn" onClick={() => handleDelete(role.id)}><MdDelete /></p>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>

            {isModalOpen && editedRoles && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Role</h2>
                        <label>Role Name:</label>
                        <input
                            type="text"
                            name="role"
                            autoFocus="true"
                            value={editedRoles?.role_name || ""}
                            onChange={(e) => handleInputChange("role_name", e.target.value)}
                        />
                        <div className="modal-buttons">
                            <button onClick={handleSave}>Save</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {isVisible === "addRole" && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add Role</h2>
                        <label>Role Name:</label>
                        <input
                            type="text"
                            placeholder="Enter Role Name"
                            autoFocus="true"
                            value={newRole.role_name}
                            onChange={(e) => setNewRole({ role_name: e.target.value })}
                        />
                        <div className="modal-buttons">
                            <button onClick={handleAddRole}>Save</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer position="top-right" autoClose={3000} />
        </Wrapper>
    );
};

export default AttendeeRoleManagement;