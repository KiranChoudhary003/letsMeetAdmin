import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdAddCircle } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FaSearch } from "react-icons/fa";

import Wrapper from './style';
import axios, { Axios } from 'axios';

const AttendeeRoleManagement = () => {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fectchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/attendee/roles`)
                const data = await response.json()
                setRoles(data.roles)
            }
            catch (error) {
                console.log(`Error is fectching ${error}`)
            }
        }
        fectchData()
    }, [])

    const [searchQuery, setSearchQuery] = useState("");
    const [visibleEntries, setVisibleEntries] = useState(10);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedRoles, setEditedRoles] = useState(null);
    const [isVisible, setIsVisible] = useState(null);
    const [newRole, setNewRole] = useState(""); // Ensure it's initialized as a string

    const tableRef = useRef(null);


    const handleScroll = useCallback(() => {
        const tableElement = tableRef.current;
        if (!tableElement) return;

        const { scrollTop, scrollHeight, clientHeight } = tableElement;

        if (scrollTop + clientHeight >= scrollHeight - 20) {
            setVisibleEntries((prev) => Math.min(prev + 10, roles.length));
        }
    }, [roles.length]);

    useEffect(() => {
        const tableElement = tableRef.current;
        if (!tableElement) return;

        tableElement.addEventListener('scroll', handleScroll);
        return () => tableElement.removeEventListener('scroll', handleScroll);
    }, [visibleEntries, handleScroll]);

    const handleSelectEvent = (id) => {
        setSelectedRoles((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((eventId) => eventId !== id)
                : [...prevSelected, id]
        );
    };

    const handleSelectAll = () => {
        if (roles.length === 0) {
            setSelectedRoles([]); // Ensure it's cleared when no roles exist
            return;
        }

        if (selectedRoles.length === roles.length) {
            setSelectedRoles([]);
        } else {
            setSelectedRoles(roles.map(role => role.id));
        }
    };


    const handleEdit = (id) => {
        const rolesEdit = roles.find((role) => role.id === id);
        setEditedRoles(rolesEdit);
        setIsModalOpen(true);
    };

    const handleInputChange = (field, value) => {
        setEditedRoles((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/users/attendee/roles/${editedRoles.id}`, editedRoles, {
                headers: {
                    "Content-Type": "application/json",
                }
            })

            setRoles(prevRoles =>
                prevRoles.map(role => (role.id === editedRoles.id ? response.data : role))
            );

            setIsModalOpen(false); // Close modal after saving
            toast.success("Successfully Edited!");
        }
        catch (error) {
            console.error("Error updating role:", error);
            toast.error("Failed to update role");
        }
        // setRoles((prevRoles) =>
        //     prevRoles.map((role) =>
        //         role.id === editedRoles.id ? { ...role, role: editedRoles.role } : role
        //     )
        // );
        // setIsModalOpen(false);
        // toast.success("Successfully Edited!");
    };

    const handleDelete = (id) => {
        confirmAlert({
            title: "Confirm Deletion",
            message: "Are you sure you want to delete this role?",
            buttons: [
                {
                    label: "Yes",
                    autoFocus: "Yes",
                    onClick: async () => {
                        try {
                            const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/users/attendee/roles/${id}`)

                            if (response.data && response.data.message) {
                                toast.success(response.data.message)
                            } else {
                                toast.success("Role Deleted Successfully ")
                            }

                            const updatedRoles = roles.filter((role) => role.id !== id);
                            setRoles(updatedRoles);
                            setSelectedRoles((prev) => prev.filter((roleID) => roleID !== id));
                        }
                        catch (error) {
                            console.error("Error deleting event:", error);
                            toast.error("Error deleting event. Please try again.");
                        }                        // const updatedRoles = roles
                        //     .filter(role => role.id !== id)
                        //     .map((role, index) => ({ ...role, id: index + 1 })); // Reassign IDs

                        // setRoles(updatedRoles);
                        // setSelectedRoles(prev => prev.filter(eventId => eventId !== id));

                        // toast.success("Role deleted successfully!");
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
                    autoFocus: "Yes",
                    onClick: () => {
                        const updatedRoles = roles
                            .filter(role => !selectedRoles.includes(role.id)) // Remove selected roles
                            .map((role, index) => ({ ...role, id: index + 1 })); // Reassign IDs
                        setRoles(updatedRoles);
                        setSelectedRoles([]); // Reset selection
                        toast.success(`${selectedRoles.length} role(s) deleted successfully!`);
                    }
                },
                { label: "No" }
            ]
        });
    };

    const handleAddNewRole = () => {
        setIsVisible("addRole");
    };


    const handleAddRole = async () => {

        const role_name = newRole.role_name

        if (!role_name.trim()) {
            toast.error('Fill the required Role name')
            setIsModalOpen(true)
            return
        }

        const rolePayload = {role_name}

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/attendee/roles`, rolePayload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.data && response.data.message) {
                toast.success(response.data.message)
            } else {
                toast.success("Role added successfully!")
            }

            setRoles((prevRoles) => [...prevRoles, response.data])

            setIsModalOpen(false)

            setNewRole({
                role_name : ""
            })

        } catch (error) {
            console.error("Error adding role:", error.response ? error.response.data : error.message);
            toast.error("Failed to add role. Please try again.");
        }
    }
    
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsVisible(null);
    };

    const highlightMatch = (text, query) => {
        if (!query) return text;

        const lowerText = text.toLowerCase();
        const lowerQuery = query.toLowerCase();

        const startIndex = lowerText.indexOf(lowerQuery);
        if (startIndex === -1) return text;

        const beforeMatch = text.slice(0, startIndex);
        const matchText = text.slice(startIndex, startIndex + query.length);
        const afterMatch = text.slice(startIndex + query.length);

        return (
            <>
                {beforeMatch}
                <strong>{matchText}</strong>
                {afterMatch}
            </>
        );
    };

    return (
        <Wrapper>
            <div className='wrapper'>
                <section className='events'>
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
                                        checked={selectedRoles.length === roles.length}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th className="column id">ID</th>
                                <th className="column name">Role Name</th>
                                <th className="column actions">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {roles.filter((role) =>
                                role.role_name.toLowerCase().includes(searchQuery.toLowerCase())
                            ).length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="no-data-message">
                                        "No roles match your search. Keep searching, the right one is out there!"
                                    </td>
                                </tr>
                            ) : (
                                roles
                                    .filter((role) =>
                                        role.role_name.toLowerCase().includes(searchQuery.toLowerCase())
                                    )
                                    .slice(0, visibleEntries)
                                    .map((role) => (
                                        <tr key={role.id} className="table-row">
                                            <td className="column checkbox">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRoles.includes(role.id)}
                                                    onChange={() => handleSelectEvent(role.id)}
                                                />
                                            </td>
                                            <td className="column id">{role.id}</td>
                                            <td className="column name">
                                                {highlightMatch(role.role_name, searchQuery)}
                                            </td>
                                            <td className="column actions">
                                                <p className="edit-btn" onClick={() => handleEdit(role.id)}>
                                                    <FaEdit />
                                                </p>
                                                <p className="delete-btn" onClick={() => handleDelete(role.id)}>
                                                    <MdDelete />
                                                </p>
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
                                value={newRole.role_name}
                                onChange={(e) => setNewRole({ ...newRole, role_name: e.target.value.toLowerCase() || '' })}
                            />

                            <div className="modal-buttons">
                                <button onClick={handleAddRole}>Save</button>
                                <button onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
                <ToastContainer position="top-right" autoClose={1500} />
            </div>
        </Wrapper>
    );
};

export default AttendeeRoleManagement;