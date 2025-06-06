import axios from "../AxiosInstance";
import { useCallback, useEffect, useRef, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaEdit, FaEye, FaSearch, FaTimes } from "react-icons/fa";
import { MdAddCircle, MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "../../modules/loading";
import Wrapper from "./style";

const EventManagement = () => {
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
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [loading, setLoading] = useState(true);
  const tableRef = useRef(null);
  const isFirstLoad = useRef(true);

  const [events, setEvents] = useState([]);

  const [newEvent, setNewEvent] = useState({
    name: "",
    start_date_time: null,
    end_date_time: null,
    venue: "",
    description: "",
    status: "enable",
    latitude: "",
    longitude: "",
    web_page_url: "",
    banner: null,
  });

  const handleSaveEvent = useCallback(async () => {
    const {
      name,
      start_date_time,
      end_date_time,
      venue,
      description,
      latitude,
      longitude,
      web_page_url,
      status,
      banner,
    } = newEvent;

    if (
      !name.trim() ||
      !start_date_time ||
      !(start_date_time instanceof Date) ||
      isNaN(start_date_time.getTime()) ||
      !end_date_time ||
      !(end_date_time instanceof Date) ||
      isNaN(end_date_time.getTime()) ||
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

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("start_date_time", start_date_time.toISOString());
    formData.append("end_date_time", end_date_time.toISOString());
    formData.append("venue", venue);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("web_page_url", web_page_url);
    formData.append("status", status.trim());

    if (banner) {
      formData.append("banner", banner);
    }

    try {
      const response = await axios.post(`/events/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setRefreshFlag((prev) => !prev);

      if (response.data && response.data.message) {
        toast.success("Event added successfully!");
      }

      setEvents((prevEvents) => [...prevEvents, response.data]);

      setIsAddModalOpen(false);

      setNewEvent({
        name: "",
        start_date_time: null,
        end_date_time: null,
        venue: "",
        description: "",
        status: "enable",
        latitude: "",
        longitude: "",
        web_page_url: "",
        banner: null,
      });
    } catch (error) {
      toast.error("Failed to add event. Please try again.");
    }
  }, [newEvent, setRefreshFlag, setEvents, setIsAddModalOpen, setNewEvent]);

  useEffect(() => {
    const fetchData = async () => {
      if (isFirstLoad.current) {
        setLoading(true); // Show loading only on first mount
      }
      try {
        const response = await axios.get(`/events/all`);
        const data = response.data;

        const eventList = Array.isArray(data) ? data : data.events || [];

        setEvents(eventList);
      } catch (error) {
        console.log(`Error fetching data: ${error}`);
      } finally {
        if (isFirstLoad.current) {
          setLoading(false);
          isFirstLoad.current = false; // Mark initial load done
        }
      }
    };
    fetchData();
  }, [refreshFlag]);

  const handleScroll = useCallback(() => {
    const tableElement = tableRef.current;
    if (!tableElement) return;

    const { scrollTop, scrollHeight, clientHeight } = tableElement;

    // Load more entries when user is near the bottom
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setVisibleEntries((prev) => Math.min(prev + 10, events.length));
    }
  }, [events.length]);

  const handleEditSave = useCallback(async () => {
    const {
      id,
      name,
      start_date_time,
      end_date_time,
      venue,
      description,
      latitude,
      longitude,
      web_page_url,
      status,
      banner,
    } = editedEvent;

    if (!name?.trim()) {
      toast.warning("Event name is required");
      return;
    }
    if (!start_date_time || !end_date_time) {
      toast.warning("Start and End Date/Time are required");
      return;
    }
    if (!venue?.trim()) {
      toast.warning("Venue is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append(
        "start_date_time",
        new Date(start_date_time).toISOString()
      );
      formData.append("end_date_time", new Date(end_date_time).toISOString());
      formData.append("venue", venue);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("web_page_url", web_page_url);
      formData.append("status", status);

      if (banner instanceof File) {
        formData.append("banner", banner);
      }

      const response = await axios.put(`/events/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedEvent = response.data?.id ? response.data : editedEvent;

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === id ? { ...event, ...updatedEvent } : event
        )
      );

      setIsModalOpen(false);
      setEditedEvent(null);
      setRefreshFlag((prev) => !prev);
      toast.success("Successfully Edited!");
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update event");
    }
  }, [editedEvent, setEvents, setEditedEvent, setIsModalOpen]);

  const isEventChanged = (original, edited) => {
    if (!original || !edited) return false;

    const keysToCheck = [
      "name",
      "venue",
      "description",
      "latitude",
      "longitude",
      "web_page_url",
      "status",
    ];

    for (const key of keysToCheck) {
      const origVal = (original[key] ?? "").toString().trim();
      const editVal = (edited[key] ?? "").toString().trim();
      if (origVal !== editVal) return true;
    }

    // Compare dates
    const dateChanged = (a, b) => {
      const aTime = new Date(a).getTime();
      const bTime = new Date(b).getTime();
      return !isNaN(aTime) && !isNaN(bTime) && aTime !== bTime;
    };

    if (dateChanged(original.start_date_time, edited.start_date_time))
      return true;
    if (dateChanged(original.end_date_time, edited.end_date_time)) return true;

    // Updated banner comparison
    const bannerChanged =
      edited.banner instanceof File ||
      (typeof original.banner === "string" &&
        typeof edited.banner === "string" &&
        original.banner !== edited.banner);

    if (bannerChanged) return true;

    return false; // No changes detected
  };

  useEffect(() => {
    const tableElement = tableRef.current;

    // Scroll handling
    if (tableElement) {
      tableElement.addEventListener("scroll", handleScroll);
    }

    // Keydown handling
    const handleKeyDown = (e) => {
      const isTextarea = e.target.tagName === "TEXTAREA";

      if (e.key === "Enter" && !isTextarea) {
        if (isAddModalOpen) {
          handleSaveEvent();
        } else if (isModalOpen) {
          handleEditSave();
        }
      }

      if (e.key === "Escape") {
        if (isAddModalOpen) {
          setIsAddModalOpen(false);
        } else if (isModalOpen) {
          setIsModalOpen(false);
        } else if (isEyeModalOpen) {
          setIsEyeModalOpen(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup function
    return () => {
      if (tableElement) {
        tableElement.removeEventListener("scroll", handleScroll);
      }
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    visibleEntries,
    handleScroll,
    isAddModalOpen,
    isModalOpen,
    isEyeModalOpen,
    editedEvent,
    newEvent,
    handleEditSave,
    handleSaveEvent,
  ]);

  const handleToggle = async (id) => {
    const eventToUpdate = events.find((e) => e.id === id);
    if (!eventToUpdate) return;

    const updatedStatus =
      eventToUpdate.status === "enable" ? "disable" : "enable";

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id
          ? { ...event, status: updatedStatus, isLoading: true }
          : event
      )
    );

    try {
      const response = await axios.put(
        `/events/toggle/${id}`,
        { status: updatedStatus },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Toggle response:", response.data);

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === id
            ? { ...event, ...response.data, isLoading: false }
            : event
        )
      );

      setToggleMessage({ id, message: `Event ${updatedStatus}!` });
      setTimeout(() => setToggleMessage(null), 2000);
      toast.success(`Event ${updatedStatus} Successfully.`);
    } catch (error) {
      console.error("Failed to update event status:", error);
      toast.error("Failed to update event status");

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === id
            ? { ...event, status: eventToUpdate.status, isLoading: false }
            : event
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
          className={`toggle-switch ${isActive ? "enabled" : "disabled"} ${
            isLoading ? "loading" : ""
          }`}
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
      prev.includes(id)
        ? prev.filter((eventId) => eventId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedEvents.length === events.length) {
      setSelectedEvents([]);
    } else {
      setSelectedEvents(events.map((event) => event.id));
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
              // Backend deletion
              const response = await axios.delete(`/events/${id}`);

              // Optional: show success toast
              if (response.data?.message) {
                toast.success("Event deleted successfully!");
              }

              // Update local state
              setEvents((prev) => prev.filter((event) => event.id !== id));
              setSelectedEvents((prev) =>
                prev.filter((eventId) => eventId !== id)
              );

              // Trigger re-fetch if needed (optional)
              setRefreshFlag((prev) => !prev);
            } catch (error) {
              console.error("Error deleting event:", error);
              toast.error("Error deleting event. Please try again.");
            }
          },
        },
        { label: "No" },
      ],
    });
  };

  const handleMassDelete = async () => {
    if (selectedEvents.length === 0) {
      toast.warn("No events selected for deletion!");
      return;
    }

    confirmAlert({
      title: "Confirm Deletion",
      message: `Are you sure you want to delete ${selectedEvents.length} event(s)?`,
      buttons: [
        {
          label: "Yes",
          autoFocus: true,
          onClick: async () => {
            try {
              await axios.post(`/events/deletemass`, { ids: selectedEvents });

              const updatedEvents = events.filter(
                (event) => !selectedEvents.includes(event.id)
              );
              setEvents(updatedEvents);
              setSelectedEvents([]); // Clear selected
              toast.success(
                `${selectedEvents.length} event(s) deleted successfully!`
              );
            } catch (error) {
              console.error(
                "Mass delete error:",
                error.response?.data || error.message
              );
              toast.error("Failed to delete events.");
            }
          },
        },
        { label: "No" },
      ],
    });
  };

  const handleEdit = (id) => {
    const eventToEdit = events.find((event) => event.id === id);
    setEditEvent(eventToEdit);
    setEditedEvent({ ...eventToEdit }); // Create a copy for editing
    setIsModalOpen(true); // Open modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prev) => ({
      ...prev,
      [name]:
        name === "start_date_time" || name === "end_date_time"
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

  const handleCancel = () => {
    setIsModalOpen(false); // Close modal without saving
  };

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
      web_page_url: "",
      banner: null,
    });

    // Open the modal by setting isAddModalOpen to true
    setIsAddModalOpen(true);
  };

  const handleDetails = (id) => {
    const eventToShow = events.find((event) => event.id === id);
    if (eventToShow) {
      setShowEvent(eventToShow); // Store event details in state
      setIsEyeModalOpen(true); // Open the modal
    } else {
      console.error("Event not found");
    }
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;

    const words = query.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return text;

    const regex = new RegExp(`(${words.join("|")})`, "gi");
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          words.some((word) => part.toLowerCase() === word.toLowerCase()) ? (
            <strong key={index}>{part}</strong>
          ) : (
            part
          )
        )}
      </>
    );
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Wrapper>
      <section className="events">
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
        <div className="button-wrapper">
          <div className="button-placeholder">
            {selectedEvents.length > 1 ? (
              <button className="mass-delete" onClick={handleMassDelete}>
                Delete <MdDelete size={26} />
              </button>
            ) : (
              <div className="mass-delete-placeholder" /> // preserves space
            )}
            <button className="add-btn" onClick={handleAddEvent}>
              Add <MdAddCircle size={26} />
            </button>
          </div>
        </div>
      </section>
      <section className="table-container" ref={tableRef}>
        <table>
          <thead className="table-header">
            <tr>
              <th className="column checkbox">
                <input
                  type="checkbox"
                  checked={
                    selectedEvents.length > 0 &&
                    selectedEvents.length === events.length
                  }
                  disabled={events.length === 0}
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
              (event?.name?.toLowerCase() ?? "").includes(
                searchQuery?.toLowerCase() ?? ""
              )
            ).length === 0 ? (
              <tr key="no-event">
                <td colSpan="9" className="no-data-message">
                  No Event Found!!
                </td>
              </tr>
            ) : (
              events
                .filter((event) =>
                  event.name?.toLowerCase().includes(searchQuery.toLowerCase())
                ) // Filter events by name
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
                    <td className="column date">
                      {" "}
                      {new Date(event.start_date_time).toLocaleDateString()}
                    </td>
                    <td className="column date">
                      {" "}
                      {new Date(event.end_date_time).toLocaleDateString()}
                    </td>
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
                    <td className="column actions buttons">
                      <p
                        className="eye-btn"
                        onClick={() => handleDetails(event.id)}
                      >
                        <FaEye />
                      </p>
                      <p
                        className="edit-btn"
                        onClick={() => handleEdit(event.id)}
                      >
                        <FaEdit />
                      </p>
                      <p
                        className="delete-btn"
                        onClick={() => handleDelete(event.id)}
                      >
                        <MdDelete />
                      </p>
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
              autoFocus="true"
              value={editedEvent?.name || ""}
              onChange={handleInputChange}
            />
            <div className="dateEvent">
              <div>
                <label>Start Date:</label>
                <DatePicker
                  name="start_date_time"
                  dateFormat="MM-dd-yyyy"
                  selected={
                    editedEvent?.start_date_time
                      ? new Date(editedEvent.start_date_time)
                      : null
                  }
                  onChange={(date) =>
                    handleInputChange({
                      target: { name: "start_date_time", value: date },
                    })
                  }
                />
              </div>
              <div>
                <label>End Date:</label>
                <DatePicker
                  name="end_date_time"
                  dateFormat="MM-dd-yyyy"
                  selected={
                    editedEvent?.end_date_time
                      ? new Date(editedEvent.end_date_time)
                      : null
                  }
                  onChange={(date) =>
                    handleInputChange({
                      target: { name: "end_date_time", value: date },
                    })
                  }
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
            <div className="eventLocation">
              <div>
                <label>Latitude:</label>
                <input
                  type="text"
                  name="latitude"
                  value={editedEvent.latitude}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Longitude:</label>
                <input
                  type="text"
                  name="longitude"
                  value={editedEvent.longitude}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <label>Description:</label>
            <textarea
              name="description"
              value={editedEvent?.description || ""}
              onChange={handleInputChange}
            ></textarea>
            <label>Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  if (file.size > 5 * 1024 * 1024) {
                    // 5MB limit
                    toast.warning(
                      "Image size must be less than 5MB. Please upload a smaller image."
                    );
                    e.target.value = null;
                    setEditedEvent({ ...editedEvent, banner: null }); // Assuming you want to reset editedEvent banner
                  } else {
                    setEditedEvent({ ...editedEvent, banner: file });
                  }
                }
              }}
            />
            <div className="image-container">
              {editedEvent?.banner instanceof File ? (
                <img
                  src={URL.createObjectURL(editedEvent.banner)}
                  alt="Preview"
                  className="event-image"
                />
              ) : editedEvent?.banner ? (
                <img
                  src={editedEvent.banner}
                  alt="Existing Banner"
                  className="event-image"
                />
              ) : (
                <div className="event-initials">
                  {editedEvent.name
                    ?.split(" ")
                    .map((word) => word[0]?.toUpperCase())
                    .join("")
                    .slice(0, 2)}
                </div>
              )}
            </div>
            <div className="modal-buttons">
              <button
                onClick={handleEditSave}
                disabled={!isEventChanged(editEvent, editedEvent)}
                className={
                  !isEventChanged(editEvent, editedEvent)
                    ? "disabled-button"
                    : ""
                }
                autoFocus
              >
                Save
              </button>

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
              name="name"
              value={newEvent.name}
              autoFocus="true"
              onChange={(e) =>
                setNewEvent({ ...newEvent, name: e.target.value || "" })
              }
            />
            <div className="dateEvent">
              <div>
                <label>Start Date:</label>
                <DatePicker
                  name="start_date_time"
                  dateFormat="MM-dd-yyyy"
                  selected={newEvent.start_date_time} // Use 'selected' instead of 'value'
                  onChange={(date) =>
                    setNewEvent({ ...newEvent, start_date_time: date })
                  } // 'date' is the selected Date object
                />
              </div>
              <div>
                <label>End Date:</label>
                <DatePicker
                  name="end_date_time"
                  dateFormat="MM-dd-yyyy"
                  selected={newEvent.end_date_time} // Use 'selected' instead of 'value'
                  onChange={(date) =>
                    setNewEvent({ ...newEvent, end_date_time: date })
                  } // 'date' is the selected Date object
                />
              </div>
            </div>

            <label>Venue:</label>
            <input
              type="text"
              name="venue"
              value={newEvent.venue}
              onChange={(e) =>
                setNewEvent({ ...newEvent, venue: e.target.value || "" })
              }
            />

            <label>Status:</label>
            <select
              name="status"
              value={newEvent.status}
              onChange={(e) =>
                setNewEvent({ ...newEvent, status: e.target.value })
              }
            >
              <option value="enable">Enable</option>
              <option value="disable">Disable</option>
            </select>

            <div className="eventLocation">
              <div>
                <label>Latitude:</label>
                <input
                  type="text"
                  name="latitude"
                  value={newEvent.latitude}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, latitude: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Longitude:</label>
                <input
                  type="text"
                  name="longitude"
                  value={newEvent.longitude}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, longitude: e.target.value })
                  }
                />
              </div>
            </div>

            <label>URL:</label>
            <input
              type="text"
              name="url"
              value={newEvent.web_page_url}
              onChange={(e) =>
                setNewEvent({ ...newEvent, web_page_url: e.target.value || "" })
              }
            />
            <label>Description:</label>
            <textarea
              name="description"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value || "" })
              }
            ></textarea>
            <div className="image-Container">
              <div>
                <label>Upload Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      if (file.size > 5 * 1024 * 1024) {
                        // 5MB limit
                        toast.warning(
                          "Image size must be less than 5MB. Please upload a smaller image."
                        );
                        e.target.value = null;
                        setNewEvent({ ...newEvent, banner: null });
                      } else {
                        setNewEvent({ ...newEvent, banner: file });
                      }
                    }
                  }}
                />
              </div>
              <div className="image-container">
                {newEvent.banner ? (
                  <>
                    <img
                      src={URL.createObjectURL(newEvent.banner)}
                      alt="Preview"
                      className="event-image"
                    />
                  </>
                ) : (
                  <div className="event-initials">
                    {newEvent.name
                      .split(" ")
                      .map((word) => word[0]?.toUpperCase())
                      .join("")
                      .slice(0, 2)}
                  </div>
                )}
              </div>
            </div>
            <div className="modal-buttons">
              <button className="save" onClick={handleSaveEvent}>
                Save Event
              </button>
              <button
                className="cancel"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isEyeModalOpen && showEvent && (
        <div className="event-modal">
          <div className="event-modal-content">
            <div className="eye-header">
              <h2 className="event-modal-title">Event Details</h2>
              <FaTimes
                className="event-modal-close"
                onClick={() => setIsEyeModalOpen(false)}
              />
            </div>
            <div className="eye-details">
              <div className="event-modal-body">
                <p>
                  <strong>Name:</strong> {showEvent.name}
                </p>
                <p>
                  <strong>Start Date:</strong>{" "}
                  {new Date(showEvent.start_date_time).toLocaleDateString()}
                </p>
                <p>
                  <strong>End Date:</strong>{" "}
                  {new Date(showEvent.end_date_time).toLocaleDateString()}
                </p>
                <p>
                  <strong>Venue:</strong> {showEvent.venue}
                </p>
                <p>
                  <strong>Description:</strong> {showEvent.description}
                </p>
              </div>
              <div className="eye-banner">
                {showEvent.banner ? (
                  <img
                    src={showEvent.banner}
                    alt={`${showEvent.name} Banner`}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                ) : (
                  <div className="event-initials">
                    {showEvent.name
                      .split(" ")
                      .map((word) => word[0]?.toUpperCase())
                      .join("")
                      .slice(0, 2)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={1500} />
    </Wrapper>
  );
};

export default EventManagement;
