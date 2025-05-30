
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Wrapper from "./ProfilePagecss.js";
import AttendeeManagement from "./index.jsx"



// Dummy Attendees Data
const attendees = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Speaker",
    events: 3,
    connections: 5,
    preference: "Tech Talks",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    linkedIn: "https://www.linkedin.com/in/johndoe",
    eventList: [
      {
        name: "AI Summit 2024",
        users: [
          { id: 101, name: "Alice Johnson", email: "alice@example.com" },
          { id: 102, name: "Bob Brown", email: "bob@example.com" }
        
          
        ]
      },
      {   
        name: "Tech Innovations",
        users: [
          { id: 103, name: "Charlie Green", email: "charlie@example.com" }
        ]
      },
      {
        name: "Cloud Computing Expo",
        users: [
          { id: 104, name: "David White", email: "david@example.com" },
          { id: 105, name: "Emma Black", email: "emma@example.com" }
        ]
      }
    ]
  
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Attendee",
    events: 3,
    connections: 7,
    preference: "Networking",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
    linkedIn: "https://www.linkedin.com/in/johndoe",
    eventList: ["Startup Fest", "Women in Tech", "Business Growth Summit"]
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael@example.com",
    role: "Panelist",
    events: 4,
    connections: 12,
    preference: "Cybersecurity",
    profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
    linkedIn: "https://www.linkedin.com/in/johndoe",
    eventList: ["Cybersecurity Conference", "Ethical Hacking Bootcamp", "Secure Cloud Summit", "Dark Web Analysis"]
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "Moderator",
    events: 6,
    connections: 15,
    preference: "Software Development",
    profileImage: "https://randomuser.me/api/portraits/women/3.jpg",
    linkedIn: "https://www.linkedin.com/in/johndoe",
    eventList: ["JavaScript World 2024", "Python Developer Summit", "ReactJS Global Meetup", "KotlinCon", "Android Dev Conf"]
  },
  {
    id: 5,
    name: "David Lee",
    email: "david@example.com",
    role: "Speaker",
    events: 5,
    connections: 9,
    preference: "Blockchain",
    profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
    linkedIn: "https://www.linkedin.com/in/johndoe",
    eventList: ["Blockchain Summit", "Crypto Trends 2025", "NFTs & Metaverse", "Smart Contracts Workshop", "Ethereum DevCon"]
  }
];



const ProfilePage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get attendee ID from URL

  // Find attendee by ID
  const attendee = attendees.find((a) => a.id === parseInt(id));
  
 
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
   
  

  if (!attendee) {
    return (
      <p style={{ textAlign: "center", marginTop: "20px", fontSize: "20px" }}>
        No attendee data available.
      </p>
    );
  }

  return (
    <Wrapper>
          <div className="toggle-buttons">
        <button className="toggle-btn" onClick={() => setShowProfile(!showProfile)}>
          {showProfile ? "Hide Profile Details" : "View Profile Details"}
        </button>
        <button className="toggle-btn" onClick={() => setShowEvents(!showEvents)}>
          {showEvents ? "Hide Event Details" : "View Event Details"}
        </button>
      </div>

      {/* Profile Details Section */}
      {showProfile && (
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
            rel="noopener noreferrer"y
            className="linkedin-button"
          >
            View LinkedIn Profile
          </a>
          </div>
          <div> <h2 className="profile-header">Attendee Profile</h2></div>
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
      )}
      
      {/* Event List Section */}
      {showEvents && (
      <div className="event-list-container">
        <h3 className="event-list-title">Events Attended</h3>
        {attendee.eventList && attendee.eventList.length > 0 ? (
        <table className="event-table">
          <thead>
            <tr>
              <th>S.N.</th>
              <th>Event Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendee.eventList.map((event, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{event.name}</td>
                <td>
                  <button className="view-connection-btn" onClick={() => setSelectedEvent(event)}>
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
      )}

      {/* Modal for User Connections */}
      {selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedEvent.name} - Connections: {selectedEvent.users.length}</h2>
            {selectedEvent.users.length > 0 ? (
              <ul>
                {selectedEvent.users.map((user) => (
                  <li key={user.id}>
                    <strong>User ID:</strong> {user.id} | <strong>Name:</strong> {user.name} | <strong>Email:</strong> {user.email}
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
