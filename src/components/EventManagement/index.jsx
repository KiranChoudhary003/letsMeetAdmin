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
import axios from 'axios';

const EventManagement = () => {

  // const REACT_APP_BACKEND_URL = "http://192.168.0.87:5000/api"

  const [events, setEvents] = useState([])

  useEffect(() => {
    const fectchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/events/all`)
        setEvents(response.data)
      }
      catch (error) {
        console.log(`Error is fectching ${error}`)
      }
    }
    fectchData()
  }, [])

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [showEvent, setShowEvent] = useState(null);
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


  const handleToggle = async (id) => {
    const eventToUpdate = events.find(e => e.id === id);
    if (!eventToUpdate) return;

    // Toggle the status
    const updatedStatus = eventToUpdate.status === "enable" ? "disable" : "enable";
    const updatedEvent = { ...eventToUpdate, status: updatedStatus }; // Include all fields

    // Optimistically update UI (Instant toggle effect)
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === id ? { ...event, status: updatedStatus, isLoading: true } : event
      )
    );

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/events/${id}`,
        updatedEvent,  // Send full event details
        { headers: { "Content-Type": "application/json" } }
      );

      // Confirm backend response and update UI
      setEvents(prevEvents =>
        prevEvents.map(event =>
          event.id === id ? { ...event, ...response.data, isLoading: false } : event
        )
      );

      setToggleMessage({ id, message: `Event ${updatedStatus}!` });

      // Hide the message after 2 seconds
      setTimeout(() => setToggleMessage(null), 2000);

      toast.success(`Event ${updatedStatus}!`);
    } catch (error) {
      console.error("Error updating event status:", error);
      toast.error("Failed to update event status");

      // Revert to previous state on error
      setEvents(prevEvents =>
        prevEvents.map(event =>
          event.id === id ? { ...event, status: eventToUpdate.status, isLoading: false } : event
        )
      );
    }
  };
  const ToggleSlider = ({ id, isActive, onToggle, isLoading }) => {
    return (
      <div className="toggle-wrapper">
        {toggleMessage?.id === id && (
          <div className="toggle-message">{toggleMessage.message}</div>
        )}
        <div
          className={`toggle-switch ${isActive ? "enabled" : "disabled"} ${isLoading ? "loading" : ""}`}
          onClick={!isLoading ? () => onToggle(id) : null} // Prevent click when loading
          style={{ cursor: isLoading ? "not-allowed" : "pointer" }} // Visual feedback
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
      message: "Are you sure you want to delete this event?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              // Call the backend API to delete the event
              const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/events/${id}`);

              // Show confirmation message from API or fallback message
              if (response.data && response.data.message) {
                toast.success(response.data.message);
              } else {
                toast.success("Event deleted successfully!");
              }

              // Update local state by filtering out the deleted event
              const updatedEvents = events.filter((event) => event.id !== id);
              setEvents(updatedEvents);
              setSelectedEvents((prev) => prev.filter((eventId) => eventId !== id));
            } catch (error) {
              console.error("Error deleting event:", error);
              toast.error("Error deleting event. Please try again.");
            }
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

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const mm = String(d.getMonth() + 1).padStart(2, "0"); // Month (01-12)
    const dd = String(d.getDate()).padStart(2, "0"); // Day (01-31)
    const yyyy = d.getFullYear(); // Year (YYYY)
    return `${mm}-${dd}-${yyyy}`;
  };


  const handleSave = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/events/${editedEvent.id}`, editedEvent, {
        headers: {
          "Content-Type": "application/json",
        }
      })

      setEvents(prevEvents =>
        prevEvents.map(event => (event.id === editedEvent.id ? response.data : event))
      );

      setIsModalOpen(false); // Close modal after saving
      toast.success("Successfully Edited!");
    }
    catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update event");
    }

  };


  const handleCancel = () => {
    setIsModalOpen(false); // Close modal without saving
  };


  const [newEvent, setNewEvent] = useState({
    name: "",
    start_date_time: "",
    end_date_time: "",
    venue: "",
    description: "",
    status: "enable",
    latitude: "",
    longitude: "",
    web_page_url: ""
  });


  const handleAddEvent = () => {
    // Clear the newEvent state
    setNewEvent({
      name: "",
      start_date_time: null,
      end_date_time: null,
      venue: "",
      description: "",
      status: "enable",
      latitude: "",
      longitude: "",
      web_page_url: ""
    });

    // Open the modal by setting isAddModalOpen to true
    setIsAddModalOpen(true);
  };

  const handleSaveEvent = async () => {
    const { name, start_date_time, end_date_time, venue, description, latitude, longitude, web_page_url } = newEvent;

    if (
      !name.trim() ||
      !start_date_time ||
      !(start_date_time instanceof Date) || isNaN(start_date_time.getTime()) ||
      !end_date_time ||
      !(end_date_time instanceof Date) || isNaN(end_date_time.getTime()) ||
      !venue.trim() ||
      !description.trim() ||
      !latitude.trim() ||
      !longitude.trim() ||
      !web_page_url.trim()
    ) {
      toast.error("All fields are required!");
      setIsAddModalOpen(true);
      return;
    }

    const eventPayload = {
      name: name,
      description: description,
      start_date_time: start_date_time.toISOString(),
      end_date_time: end_date_time.toISOString(),
      venue: venue,
      latitude: latitude,
      longitude: longitude,
      web_page_url: web_page_url,
      status: newEvent.status.trim()
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/events/create`,
        eventPayload,
        { headers: { "Content-Type": "application/json" } }
      );

      // Show success message
      if (response.data && response.data.message) {
        toast.success(response.data.message);
      } else {
        toast.success("Event added successfully!");
      }

      setEvents((prevEvents) => [...prevEvents, response.data]);

      setIsAddModalOpen(false);

      setNewEvent({
        name: "",
        start_date_time: new Date(),
        end_date_time: new Date(),
        venue: "",
        description: "",
        status: "enable",
        latitude: "",
        longitude: "",
        web_page_url: ""
      });

    } catch (error) {
      console.error("Error adding event:", error.response ? error.response.data : error.message);
      toast.error("Failed to add event. Please try again.");
    }
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
              (event?.name?.toLowerCase() ?? "").includes((searchQuery?.toLowerCase() ?? ""))
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
                    <td className="column name">
                      {highlightMatch(event.name, searchQuery)}
                    </td>
                    <td className="column date"> {new Date(event.start_date_time).toLocaleString()}</td>
                    <td className="column date"> {new Date(event.end_date_time).toLocaleString()}</td>
                    <td className="column venue">{event.venue}</td>
                    <td className="column description">{event.description}</td>
                    <td className="column status">
                      <ToggleSlider
                        id={event.id}
                        isActive={event.status === "enable"}
                        onToggle={handleToggle}
                        isLoading={event.isLoading}

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
                  selected={editedEvent?.start_date_time ? new Date(editedEvent.start_date_time) : null}
                  onChange={(date) => handleInputChange({ target: { name: "startDate", value: date } })}
                />
              </div>
              <div>
                <label>End Date:</label>
                <DatePicker
                  name="endDate"
                  dateFormat="MM-dd-yyyy"
                  selected={editedEvent?.end_date_time ? new Date(editedEvent.end_date_time) : null}
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
              value={newEvent.name}
              onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value.toLowerCase() || '' })}
            />
            <div className='dateEvent'>
              <div>
                <label>Start Date:</label>
                <DatePicker
                  name="endDate"
                  dateFormat="MM-dd-yyyy"
                  selected={newEvent.start_date_time} // Use 'selected' instead of 'value'
                  onChange={(date) => setNewEvent({ ...newEvent, start_date_time: date })} // 'date' is the selected Date object
                />
              </div>
              <div>
                <label>End Date:</label>
                <DatePicker
                  name="endDate"
                  dateFormat="MM-dd-yyyy"
                  selected={newEvent.end_date_time} // Use 'selected' instead of 'value'
                  onChange={(date) => setNewEvent({ ...newEvent, end_date_time: date })} // 'date' is the selected Date object
                />
              </div>
            </div>

            <label>Venue:</label>
            <input
              type="text"
              name="venue"
              value={newEvent.venue}
              onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value.toLowerCase() || '' })}
            />

            <label>Description:</label>
            <textarea
              name="description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value.toLowerCase() || '' })}
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
              value={newEvent.web_page_url}
              onChange={(e) => setNewEvent({ ...newEvent, web_page_url: e.target.value.toLowerCase() || '' })}
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
              <p><strong>Start Date:</strong> {new Date(showEvent.start_date_time).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(showEvent.end_date_time).toLocaleDateString()}</p>
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

export default EventManagement;