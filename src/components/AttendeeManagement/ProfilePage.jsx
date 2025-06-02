import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Wrapper from "./ProfilePagecss.js";
// import { constructNow } from "date-fns";
import axios from '../AxiosInstance';
import LoadingScreen from "../loading"; // ✅ Importing the LoadingScreen component

const ProfilePage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get attendee ID from URL
  const location = useLocation();
  const [attendee, setAttendee] = useState(location.state?.attendee || null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Track loading state
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (!attendee) {
      const fetchAttendee = async () => {
        if (isFirstLoad.current) {
          setLoading(true); // Show loading only on first mount
        }
        try {
          const response = await axios.get(`/users/${id}`);
          const data = response.data;
          setAttendee(data);
        } catch (error) {
          console.error("Error fetching attendee details:", error);
        } finally {
          if (isFirstLoad.current) {
            setLoading(false); // Stop loading only on initial fetch
            isFirstLoad.current = false; // Mark initial fetch complete
          }
        }
      };
      fetchAttendee();
    } else {
      setLoading(false); // Stop loading if attendee is already available
    }
  }, [id, attendee]);


  useEffect(() => {
    if (!id) return;

    const fetchEventList = async () => {
      try {
        const response = await axios.get(`/users/attended-events/${id}`);
        const data = response.data;
        console.log("Fetched Events:", data.events);
        setEventList(data.events);
      } catch (error) {
        console.error("Error fetching attended events:", error);
      }
    };

    fetchEventList();
  }, [id]);

  // ✅ Show loading screen while fetching data
  if (loading) {
    return <LoadingScreen />;
  }

  if (!attendee) {
    return (
      <p style={{ textAlign: "center", marginTop: "20px", fontSize: "20px" }}>
        No attendee data available.
      </p>
    );
  }

  const handleViewConnection = async (event) => {
    try {
      const response = await axios.get(`/users/${id}/${event.id}/connections`);
      const data = response.data;

      const updatedEvent = {
        ...event,
        connections: data.connections || [],
      };

      setSelectedEvent(updatedEvent);
    } catch (error) {
      console.error("Error fetching event connections:", error);
    }
  };

  return (
    <Wrapper>
      <div className="profile-container">
        <div className="profile-content">
          {/* Profile Image */}
          <div className="profile-image-container">
            <img
              src={attendee.profileImage || "/default-profile.png"}
              alt="Profile"
              className="profile-image"
            />
            <a
              href={attendee.linkedIn || "https://www.linkedin.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin-button"
            >
              View LinkedIn Profile
            </a>
          </div>
          <div>
            <h2 className="profile-header">Attendee Profile</h2>
          </div>
          {/* Profile Details */}
          <div className="profile-details">
            <div className="profile-info"><strong>ID:</strong> {attendee.id}</div>
            <div className="profile-info"><strong>Name:</strong> {attendee.name}</div>
            <div className="profile-info"><strong>Email:</strong> {attendee.email || "Not provided"}</div>
            <div className="profile-info"><strong>Role:</strong> {attendee.role || "Attendee"}</div>
            <div className="profile-info"><strong>Preference:</strong> {attendee.preference || "None"}</div>
            <div className="profile-info"><strong>Total Events:</strong> {attendee.events}</div>
            <div className="profile-info"><strong>Total Connections:</strong> {attendee.connections}</div>

            <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
          </div>
        </div>
      </div>

      <div className="event-list-container">
        <h3 className="event-list-title">Events Attended</h3>
        {eventList && eventList.length > 0 ? (
          <table className="event-table">
            <thead>
              <tr>
                <th>S.N.</th>
                <th>Event Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {eventList.map((event, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{event.name}</td>
                  <td>
                    <button
                      className="view-connection-btn"
                      onClick={() => handleViewConnection(event)}
                    >
                      View Connection
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-events">No events available</p>
        )}
      </div>

      {/* Modal for User Connections */}
      {selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedEvent.name} - Connections: {selectedEvent.connections.length}</h2>
            {selectedEvent.connections.length > 0 ? (
              <ul>
                {selectedEvent.connections.map((conn, index) => (
                  <li key={index}>
                    <strong>User ID:</strong> {conn.user_id} |
                    <strong> Name:</strong> {conn.first_name} {conn.last_name} |
                    <strong> Role:</strong> {conn.role} |
                    <strong> Status:</strong> {conn.status} |
                    <strong> Joined:</strong> {new Date(conn.created_at).toLocaleString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No Connections Available</p>
            )}
            <button className="close-modal-btn" onClick={() => setSelectedEvent(null)}>❌</button>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default ProfilePage;
