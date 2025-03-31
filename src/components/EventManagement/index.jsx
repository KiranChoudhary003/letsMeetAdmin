import React, { useCallback, useEffect, useRef, useState } from 'react';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdAddCircle, MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTimes } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

import Wrapper from './style';


const EventTable = () => {
  const [events, setEvents] = useState([
    { id: 201, name: 'Tech Summit', startDate: '04-15-2025', endDate: '04-16-2025', venue: 'Hall A, near Jagatpura JTM Mall', description: 'AI Innovations', status: 'Enabled', updated: true },
    { id: 202, name: 'Marketing Expo', startDate: '05-20-2025', endDate: '05-21-2025', venue: 'Hall B', description: 'Digital Marketing', status: 'Enabled', updated: true },
    { id: 203, name: 'Startup Fest', startDate: '06-10-2025', endDate: '06-11-2025', venue: 'Hall C', description: 'Startup Networking', status: 'Enabled', updated: true },
    { id: 204, name: 'Health Expo', startDate: '07-25-2025', endDate: '07-26-2025', venue: 'Hall D', description: 'Healthcare Tech', status: 'Enabled', updated: true },
    { id: 205, name: 'AI Innovation', startDate: '08-15-2025', endDate: '08-16-2025', venue: 'Hall E', description: 'AI in Business', status: 'Disabled', updated: true },
    { id: 206, name: 'Design Conference', startDate: '09-05-2025', endDate: '09-06-2025', venue: 'Hall F', description: 'Creative Designs', status: 'Enabled', updated: true },
    { id: 207, name: 'Tech Forum', startDate: '10-10-2025', endDate: '10-11-2025', venue: 'Hall G', description: 'Technology Discussions', status: 'Enabled', updated: true },
    { id: 208, name: 'AI Seminar', startDate: '11-12-2025', endDate: '11-13-2025', venue: 'Hall H', description: 'AI Trends and Innovations', status: 'Enabled', updated: true },
    { id: 209, name: 'Cloud Tech Expo', startDate: '12-05-2025', endDate: '12-06-2025', venue: 'Hall I', description: 'Cloud Computing Solutions', status: 'Disabled', updated: true },
    { id: 210, name: 'Blockchain Seminar', startDate: '01-15-2026', endDate: '01-16-2026', venue: 'Hall J', description: 'Blockchain Innovations', status: 'Enabled', updated: true },
    { id: 211, name: 'Cyber Security Summit', startDate: '02-20-2026', endDate: '02-21-2026', venue: 'Hall K', description: 'Cyber Security Trends', status: 'Enabled', updated: true },
    { id: 212, name: 'Digital Transformation Expo', startDate: '03-25-2026', endDate: '03-26-2026', venue: 'Hall L', description: 'Digital Business Solutions', status: 'Disabled', updated: true },
    { id: 213, name: 'VR Tech Conference', startDate: '04-15-2026', endDate: '04-16-2026', venue: 'Hall M', description: 'Virtual Reality Innovations', status: 'Enabled', updated: true },
    { id: 214, name: 'Robotics Expo', startDate: '05-10-2026', endDate: '05-11-2026', venue: 'Hall N', description: 'Robotic Automation Solutions', status: 'Enabled', updated: true },
    { id: 215, name: 'Smart Tech Conference', startDate: '06-20-2026', endDate: '06-21-2026', venue: 'Hall O', description: 'Smart Technology Integration', status: 'Enabled', updated: true },
    { id: 216, name: 'IoT Conference', startDate: '07-15-2026', endDate: '07-16-2026', venue: 'Hall P', description: 'Internet of Things Innovations', status: 'Disabled', updated: true },
    { id: 217, name: 'Automation Summit', startDate: '08-10-2026', endDate: '08-11-2026', venue: 'Hall Q', description: 'Automation and AI Solutions', status: 'Enabled', updated: true },
    { id: 218, name: 'Green Tech Expo', startDate: '09-05-2026', endDate: '09-06-2026', venue: 'Hall R', description: 'Sustainable Tech Innovations', status: 'Enabled', updated: true },
    { id: 219, name: 'Space Tech Conference', startDate: '10-12-2026', endDate: '10-13-2026', venue: 'Hall S', description: 'Space Exploration Solutions', status: 'Disabled', updated: true },
    { id: 220, name: 'Quantum Computing Seminar', startDate: '11-20-2026', endDate: '11-21-2026', venue: 'Hall T', description: 'Quantum Computing Trends', status: 'Enabled', updated: true }
  ]);



  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [showEvent, setShowEvent] = useState([]);
  const [visibleEntries, setVisibleEntries] = useState(10);
  const [toggleMessage, setToggleMessage] = useState(null);
  const [editedEvent, setEditedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEyeModalOpen, setIsEyeModalOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const tableRef = useRef(null);


  const handleScroll = useCallback(() => {
    const tableElement = tableRef.current;
    if (!tableElement) return;

    const { scrollTop, scrollHeight, clientHeight } = tableElement;

    // Load more entries when user is near the bottom
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setVisibleEntries((prev) => Math.min(prev + 10, events.length));
    }


  }, [events.length]);


  useEffect(() => {
    const tableElement = tableRef.current;

    if (tableElement) {
      tableElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (tableElement) {
        tableElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [visibleEntries, handleScroll]); // Depend on visibleEntries to update properly


  const handleToggle = (id) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === id
          ? { ...event, status: event.status === "Enabled" ? "Disabled" : "Enabled" }
          : event
      )
    );

    // Show message for the toggled event
    setToggleMessage({ id, message: events.find(e => e.id === id)?.status === "Enabled" ? "Disabled" : "Enabled" });

    // Hide the message after 2 seconds
    setTimeout(() => setToggleMessage(null), 2000);
  };



  const ToggleSlider = ({ id, isActive, onToggle }) => {
    return (
      <div className="toggle-wrapper">
        {toggleMessage?.id === id && (
          <div className="toggle-message">{toggleMessage.message}</div>
        )}
        <div
          className={`toggle-switch ${isActive ? "enabled" : "disabled"}`}
          onClick={() => onToggle(id)}
        >
          <div className="switch-handle"></div>
        </div>
      </div>
    );
  };

  const handleSelectEvent = (id) => {
    setSelectedEvents((prev) =>
      prev.includes(id) ? prev.filter(eventId => eventId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedEvents.length === events.length) {
      setSelectedEvents([]);
    } else {
      setSelectedEvents(events.map(event => event.id));
    }
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
            const updatedEvents = events
              .filter(event => event.id !== id)
              .map((event, index) => ({ ...event, id: index + 1 })); // Reassign IDs

            setEvents(updatedEvents);
            setSelectedEvents(prev => prev.filter(eventId => eventId !== id));

            toast.success("Role deleted successfully!");
          }
        },
        { label: "No" }
      ]
    });
  };

  const handleMassDelete = () => {
    if (selectedEvents.length === 0) {
      toast.warn("No roles selected for deletion!");
      return;
    }
    confirmAlert({
      title: "Confirm Deletion",
      message: `Are you sure you want to delete ${selectedEvents.length} role(s)?`,
      buttons: [
        {
          label: "Yes",
          autoFocus: "Yes",
          onClick: () => {
            const updatedEvents = events
              .filter(role => !selectedEvents.includes(role.id)) // Remove selected roles
              .map((role, index) => ({ ...role, id: index + 1 })); // Reassign IDs
            setEvents(updatedEvents);
            setSelectedEvents([]); // Reset selection
            toast.success(`${selectedEvents.length} role(s) deleted successfully!`);
          }
        },
        { label: "No" }
      ]
    });
  };

  const handleEdit = (id) => {
    const eventToEdit = events.find(event => event.id === id);
    setEditEvent(eventToEdit);
    setEditedEvent({ ...eventToEdit }); // Create a copy for editing
    setIsModalOpen(true); // Open modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prev) => ({
      ...prev,
      [name]: name === "startDate" || name === "endDate"
        ? formatDate(value) // Format date correctly
        : value,
    }));
  };


  // Helper function to format date to MM-DD-YYYY
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const mm = String(d.getMonth() + 1).padStart(2, "0"); // Month (01-12)
    const dd = String(d.getDate()).padStart(2, "0"); // Day (01-31)
    const yyyy = d.getFullYear(); // Year (YYYY)
    return `${mm}-${dd}-${yyyy}`;
  };


  const handleSave = () => {
    setEvents(prevEvents => prevEvents.map(event =>
      event.id === editedEvent.id ? { ...editedEvent } : event
    ));
    setIsModalOpen(false); // Close modal after saving
    toast.success("Successfully Edited!");
  };


  const handleCancel = () => {
    setIsModalOpen(false); // Close modal without saving
  };


  const [newEvent, setNewEvent] = useState({
    eventName: "",
    startDate: "",
    endDate: "",
    venue: "",
    description: "",
    status: "active",
    latitude: "",
    longitude: "",
    url: ""
  });


  const handleAddEvent = () => {
    // Clear the newEvent state
    setNewEvent({
      eventName: "",
      startDate: null,
      endDate: null,
      venue: "",
      description: "",
      status: "active",
      latitude: "",
      longitude: "",
      url: ""
    });

    // Open the modal by setting isAddModalOpen to true
    setIsAddModalOpen(true);
  };

  const handleSaveEvent = () => {
    const { eventName, startDate, endDate, venue, description, latitude, longitude, url } = newEvent;

    if (
      !eventName.trim() ||
      !(startDate instanceof Date) || isNaN(startDate.getTime()) ||
      !(endDate instanceof Date) || isNaN(endDate.getTime()) ||
      !venue.trim() ||
      !description.trim() ||
      !latitude.trim() ||
      !longitude.trim() ||
      !url.trim()
    ) {
      toast.error("All fields are required!");
      setIsAddModalOpen(true);
      return;
    }
    setIsAddModalOpen(null);
    toast.success("Event added successfully!");
  }


  const handleDetails = (id) => {
    const eventToShow = events.find(event => event.id === id);
    if (eventToShow) {
      setShowEvent(eventToShow); // Store event details in state
      setIsEyeModalOpen(true); // Open the modal
    } else {
      console.error("Event not found");
    }
  };

  return (
    <Wrapper>
      <section className='events'>
        <h1>Events</h1>
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
          {selectedEvents.length > 1 && (
            <button className='mass-delete' onClick={handleMassDelete}>Delete</button>
          )}
          <button className='add-btn' onClick={handleAddEvent}>Add <MdAddCircle size={26} /></button>
        </div>
      </section>
      <section className="table-container" ref={tableRef}>
        <table className="whole-table">
          <thead className="table-header">
            <tr>
              <th className="column checkbox">
                <input
                  type="checkbox"
                  checked={selectedEvents.length === events.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="column id">ID</th>
              <th className="column name">Event Name</th>
              <th className="column date">Start Date</th>
              <th className="column date">End Date</th>
              <th className="column venue">Venue</th>
              <th className="column description">Description</th>
              <th className="column status">Status</th>
              <th className="column actions">Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {events.filter((event) =>
              event.name.toLowerCase().includes(searchQuery.toLowerCase())
            ).length === 0 ? (
              <tr>
                <td colSpan="9" className="no-data-message">
                  No roles match your search. Keep searching, the right one is out there!
                </td>
              </tr>
            ) : (
              events
                .filter((event) => event.name.toLowerCase().includes(searchQuery.toLowerCase())) // Filter events by name
                .slice(0, visibleEntries)
                .map((event) => (
                  <tr key={event.id} className="table-row">
                    <td className="column checkbox">
                      <input
                        type="checkbox"
                        checked={selectedEvents.includes(event.id)}
                        onChange={() => handleSelectEvent(event.id)}
                      />
                    </td>
                    <td className="column id">{event.id}</td>
                    <td className="column name">{event.name}</td>
                    <td className="column date">{event.startDate}</td>
                    <td className="column date">{event.endDate}</td>
                    <td className="column venue">{event.venue}</td>
                    <td className="column description">{event.description}</td>
                    <td className="column status">
                      <ToggleSlider
                        id={event.id}
                        isActive={event.status === "Enabled"}
                        onToggle={handleToggle}
                      />
                    </td>
                    <td className="column actions">
                      <p className="eye-btn" onClick={() => handleDetails(event.id)}><FaEye /></p>
                      <p className="edit-btn" onClick={() => handleEdit(event.id)}><FaEdit /></p>
                      <p className="delete-btn" onClick={() => handleDelete(event.id)}><MdDelete /></p>
                    </td>
                  </tr>
                ))
            )}

          </tbody>
        </table>
      </section>

      {isModalOpen && editEvent && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Event</h2>
            <label>Event Name:</label>
            <input
              type="text"
              name="name"
              value={editedEvent?.name || ""}
              onChange={handleInputChange}
            />
            <div className='dateEvent'>
              <div>
                <label>Start Date:</label>
                <DatePicker
                  name="startDate"
                  dateFormat="MM-dd-yyyy"
                  selected={editedEvent?.startDate ? new Date(editedEvent.startDate) : null}
                  onChange={(date) => handleInputChange({ target: { name: "startDate", value: date } })}
                />
              </div>
              <div>
                <label>End Date:</label>
                <DatePicker
                  name="endDate"
                  dateFormat="MM-dd-yyyy"
                  selected={editedEvent?.endDate ? new Date(editedEvent.endDate) : null}
                  onChange={(date) => handleInputChange({ target: { name: "endDate", value: date } })}
                />
              </div>
            </div>


            <label>Venue:</label>
            <input
              type="text"
              name="venue"
              value={editedEvent?.venue || ""}
              onChange={handleInputChange}
            />

            <label>Description:</label>
            <textarea
              name="description"
              value={editedEvent?.description || ""}
              onChange={handleInputChange}
            ></textarea>

            <div className="modal-buttons">
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Event</h2>

            <label>Event Name:</label>
            <input
              type="text"
              name="eventName"
              value={newEvent.eventName}
              onChange={(e) => setNewEvent({ ...newEvent, eventName: e.target.value })}
            />
            <div className='dateEvent'>
              <div>
                <label>Start Date:</label>
                <DatePicker
                  name="endDate"
                  dateFormat="MM-dd-yyyy"
                  selected={newEvent.startDate} // Use 'selected' instead of 'value'
                  onChange={(date) => setNewEvent({ ...newEvent, startDate: date })} // 'date' is the selected Date object
                />
              </div>
              <div>
                <label>End Date:</label>
                <DatePicker
                  name="endDate"
                  dateFormat="MM-dd-yyyy"
                  selected={newEvent.endDate} // Use 'selected' instead of 'value'
                  onChange={(date) => setNewEvent({ ...newEvent, endDate: date })} // 'date' is the selected Date object
                />
              </div>
            </div>

            <label>Venue:</label>
            <input
              type="text"
              name="venue"
              value={newEvent.venue}
              onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
            />

            <label>Description:</label>
            <textarea
              name="description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            ></textarea>

            <label>Status:</label>
            <select
              name="status"
              value={newEvent.status}
              onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <label>Latitude:</label>
            <input
              type="text"
              name="latitude"
              value={newEvent.latitude}
              onChange={(e) => setNewEvent({ ...newEvent, latitude: e.target.value })}
            />

            <label>Longitude:</label>
            <input
              type="text"
              name="longitude"
              value={newEvent.longitude}
              onChange={(e) => setNewEvent({ ...newEvent, longitude: e.target.value })}
            />

            <label>URL:</label>
            <input
              type="text"
              name="url"
              value={newEvent.url}
              onChange={(e) => setNewEvent({ ...newEvent, url: e.target.value })}
            />

            <div className="modal-buttons">
              <button className="save" onClick={handleSaveEvent}>Save Event</button>
              <button className="cancel" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {isEyeModalOpen && showEvent && (
        <div className="event-modal">
          <div className="event-modal-content">
            <FaTimes className="event-modal-close" onClick={() => setIsEyeModalOpen(false)} />
            <h2 className="event-modal-title">Event Details</h2>
            <div className="event-modal-body">
              <p><strong>Name:</strong> {showEvent.name}</p>
              <p><strong>Start Date:</strong> {showEvent.startDate}</p>
              <p><strong>End Date:</strong> {showEvent.endDate}</p>
              <p><strong>Venue:</strong> {showEvent.venue}</p>
              <p><strong>Description:</strong> {showEvent.description}</p>
            </div>
          </div>
        </div>
      )}



      <ToastContainer position="top-right" autoClose={1500} />
    </Wrapper>
  );
};

export default EventTable;