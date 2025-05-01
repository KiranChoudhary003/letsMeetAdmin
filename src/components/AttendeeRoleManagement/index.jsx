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

const AttendeeRoleManagement = () => {
    const [roles, setRoles] = useState([
        { id: 1, role: "Architect" },
        { id: 2, role: "Business Analyst" },
        { id: 3, role: "Consultant" },
        { id: 4, role: "Contractor" },
        { id: 5, role: "Developer" },
        { id: 6, role: "Executive" },
        { id: 7, role: "Project Manager" },
        { id: 8, role: "Regional Manager" },
        { id: 9, role: "Resource Manager" },
        { id: 10, role: "Sales Associate" },
        { id: 11, role: "Senior Consultant" },
        { id: 12, role: "Senior Developer" },
        { id: 13, role: "Services Lead" },
        { id: 14, role: "Trainer" },
        { id: 15, role: "Training Manager" },
        { id: 16, role: "Team Lead" },
        { id: 17, role: "Delivery Manager" },
        { id: 18, role: "Operations Manager" },
        { id: 19, role: "Technical Consultant" },
        { id: 20, role: "Solution Architect" },
        { id: 21, role: "IT Manager" },
        { id: 22, role: "Business Development Manager" },
        { id: 23, role: "Product Manager" },
        { id: 24, role: "Customer Success Manager" },
        { id: 25, role: "Implementation Specialist" }
    ]);


    const [searchQuery, setSearchQuery] = useState("");
    const [visibleEntries, setVisibleEntries] = useState(10);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedEvent, setEditedEvent] = useState(null);
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
        const eventToEdit = roles.find((event) => event.id === id);
        setEditedEvent(eventToEdit);
        setIsModalOpen(true);
    };

    const handleInputChange = (field, value) => {
        setEditedEvent((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        setRoles((prevRoles) =>
            prevRoles.map((role) =>
                role.id === editedEvent.id ? { ...role, role: editedEvent.role } : role
            )
        );
        setIsModalOpen(false);
        toast.success("Successfully Edited!");
    };

    const handleDelete = (id) => {
        confirmAlert({
            title: "Confirm Deletion",
            message: "Are you sure you want to delete this role?",
            buttons: [
                {
                    label: "Yes",
                    autoFocus: "Yes",
                    onClick: () => {
                        const updatedRoles = roles
                            .filter(role => role.id !== id)
                            .map((role, index) => ({ ...role, id: index + 1 })); // Reassign IDs

                        setRoles(updatedRoles);
                        setSelectedRoles(prev => prev.filter(eventId => eventId !== id));

                        toast.success("Role deleted successfully!");
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


    const handleAddRole = () => {
        if (typeof newRole !== "string" || newRole.trim() === "") {
            toast.error("Role name cannot be empty!");
            return;
        }
        setNewRole("");
        setIsVisible(null);
        toast.success("Role added successfully!");
    };


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
                            {roles.filter((event) =>
                                event.role.toLowerCase().includes(searchQuery.toLowerCase())
                            ).length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="no-data-message">
                                        "No roles match your search. Keep searching, the right one is out there!"
                                    </td>
                                </tr>
                            ) : (
                                roles
                                    .filter((event) =>
                                        event.role.toLowerCase().includes(searchQuery.toLowerCase())
                                    )
                                    .slice(0, visibleEntries)
                                    .map((event) => (
                                        <tr key={event.id} className="table-row">
                                            <td className="column checkbox">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRoles.includes(event.id)}
                                                    onChange={() => handleSelectEvent(event.id)}
                                                />
                                            </td>
                                            <td className="column id">{event.id}</td>
                                            <td className="column name">
                                                {highlightMatch(event.role, searchQuery)}
                                            </td>
                                            <td className="column actions">
                                                <p className="edit-btn" onClick={() => handleEdit(event.id)}>
                                                    <FaEdit />
                                                </p>
                                                <p className="delete-btn" onClick={() => handleDelete(event.id)}>
                                                    <MdDelete />
                                                </p>
                                            </td>
                                        </tr>
                                    ))
                            )}


                        </tbody>
                    </table>
                </section>

                {isModalOpen && editedEvent && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Edit Role</h2>
                            <label>Role Name:</label>
                            <input
                                type="text"
                                name="role"
                                value={editedEvent?.role || ""}
                                onChange={(e) => handleInputChange("role", e.target.value)}
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
                                value={newRole}
                                onChange={(e) => setNewRole(e.target.value)}
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