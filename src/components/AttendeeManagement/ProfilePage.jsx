import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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


  const [activeTab, setActiveTab] = useState(null);

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
        setLoading(true);
        const response = await axios.get(`/users/attended-events/${id}`);
        const data = response.data;
        console.log("Fetched Events:", data.events);
        setEventList(response.data.events);

      } catch (error) {
        console.error("Error fetching attended events:", error);
      }

      finally {
        setLoading(false);
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
      <button className="back-button" onClick={() => navigate(-1)}>←</button>
      <div> <h2 className="profile-header">Attendee Profile</h2></div>
      
      <div className="wholeprofile">
        <div className="profile-header-section">
          <img
            src={attendee.photo || "https://imgs.search.brave.com/sHfS5WDNtJlI9C_CT2YL2723HttEALNRtpekulPAD9Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2LzMzLzU0Lzc4/LzM2MF9GXzYzMzU0/Nzg0Ml9BdWdZemV4/VHBNSjl6MVljcFRL/VUJvcUJGMENVQ2sx/MC5qcGc"}
            alt="attendee"
            className="profile-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-profile.png";
            }}
          />
          <a
            href={attendee.linkedin_url || "https://www.linkedin.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-button-start"
          >
            View LinkedIn Profile
          </a>
        </div>

        <div className="toggle-buttons">
          <button
            className={`toggle-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab(activeTab === 'profile' ? null : 'profile')}
          >
            View Profile Details
            <span className={`dropdown-icon ${activeTab === 'profile' ? 'rotated' : ''}`}>▼</span>
          </button>

          <button
            className={`toggle-btn ${activeTab === 'event' ? 'active' : ''}`}
            onClick={() => setActiveTab(activeTab === 'event' ? null : 'event')}
          >
            View Event Details

            <span className={`dropdown-icon ${activeTab === 'event' ? 'rotated' : ''}`}>▼</span>
          </button>
        </div>

        {/* Profile Details Section */}
        {activeTab === 'profile' && (

          <div className="profile-container">
            {/* Profile Image */}
            <div className="profile-image-container">
              <img
                src={attendee.photo || "https://imgs.search.brave.com/sHfS5WDNtJlI9C_CT2YL2723HttEALNRtpekulPAD9Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2LzMzLzU0Lzc4/LzM2MF9GXzYzMzU0/Nzg0Ml9BdWdZemV4/VHBNSjl6MVljcFRL/VUJvcUJGMENVQ2sx/MC5qcGc"}
                alt="profile"
                className="profile-image"
                onError={(e) => {
                  e.target.onerror = null; // Prevents infinite loop
                  e.target.src = "/default-profile.png";
                }}
              />
              <a
                href={attendee.linkedin_url || "https://www.linkedin.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin-button"
              >
                View LinkedIn Profile
              </a>
            </div>

            {/* Profile Details */}
            <div className="profile-details">
              <table className="attendee-table">
                <tbody>
                  <tr>
                    <th>ID</th>
                    <td>{attendee.id}</td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td>{attendee.name}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{attendee.email || "Not provided"}</td>
                  </tr>
                  <tr>
                    <th>Role</th>
                    <td>{attendee.attendees_role || "Attendee"}</td>
                  </tr>
                  <tr>
                    <th>Preference</th>
                    <td>{attendee.preference || "None"}</td>
                  </tr>
                  <tr>
                    <th>Total Events</th>
                    <td>{attendee.events}</td>
                  </tr>
                  <tr>
                    <th>Total Connections</th>
                    <td>{attendee.connections}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}






        {/* Event List Section */}
        {activeTab === 'event' && (
          <div className="event-list-container">
            <h3 className="event-list-title">Events Attended</h3>
            {eventList && eventList.length > 0 ? (
              <div className="event-table-container">
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
              </div>
            ) : (
              <p className="no-events">No events available</p>
            )}
          </div>
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
