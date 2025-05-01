
// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Wrapper from "./ProfilePagecss.js";
// import AttendeeManagement from "./index.jsx"

// const ProfilePage = () => {
//   const navigate = useNavigate();
//   const { id } = useParams(); // Get attendee ID from URL

//   // Find attendee by ID
//   const attendee = attendees.find((a) => a.id === parseInt(id));
  
//   const [selectedEvent, setSelectedEvent] = useState(null);
  
   
  

//   if (!attendee) {
//     return (
//       <p style={{ textAlign: "center", marginTop: "20px", fontSize: "20px" }}>
//         No attendee data available.
//       </p>
//     );
//   }

//   return (
//     <Wrapper>
//       <div className="profile-container">
//         <div className="profile-content">
//           {/* Profile Image */}
//           <div className="profile-image-container">
//             <img
//               src={attendee.profileImage || "/default-profile.png"}
//               alt="Profile"
//               className="profile-image"
//             />
//              <a
//             href={attendee.linkedIn || "https://www.linkedin.com"}
//             target="_blank"
//             rel="noopener noreferrer"y
//             className="linkedin-button"
//           >
//             View LinkedIn Profile
//           </a>
//           </div>
//           <div> <h2 className="profile-header">Attendee Profile</h2></div>
//           {/* Profile Details */}
//           <div className="profile-details">
         

//             <div className="profile-info"><strong>ID:</strong> {attendee.id}</div>
//             <div className="profile-info"><strong>Name:</strong> {attendee.name}</div>
//             <div className="profile-info"><strong>Email:</strong> {attendee.email || "Not provided"}</div>
//             <div className="profile-info"><strong>Role:</strong> {attendee.role || "Attendee"}</div>
//             <div className="profile-info"><strong>Preference:</strong> {attendee.preference || "None"}</div>
//             <div className="profile-info"><strong>Total Events:</strong> {attendee.events}</div>
//             <div className="profile-info"><strong>Total Connections:</strong> {attendee.connections}</div>
           
//             <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
//           </div>
//         </div>
//       </div>
//       <div className="event-list-container">
//         <h3 className="event-list-title">Events Attended</h3>
//         {attendee.eventList && attendee.eventList.length > 0 ? (
//         <table className="event-table">
//           <thead>
//             <tr>
//               <th>S.N.</th>
//               <th>Event Name</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {attendee.eventList.map((event, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>{event.name}</td>
//                 <td>
//                   <button className="view-connection-btn" onClick={() => setSelectedEvent(event)}>
//                     View Connection
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//            ) : (
//           <p className="no-events">No events available</p>
//         )}
//       </div>

//       {/* Modal for User Connections */}
//       {selectedEvent && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h2>{selectedEvent.name} - Connections: {selectedEvent.users.length}</h2>
//             {selectedEvent.users.length > 0 ? (
//               <ul>
//                 {selectedEvent.users.map((user) => (
//                   <li key={user.id}>
//                     <strong>User ID:</strong> {user.id} | <strong>Name:</strong> {user.name} | <strong>Email:</strong> {user.email}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No Connections Available</p>
//             )}
//             <button className="close-modal-btn" onClick={() => setSelectedEvent(null)}>❌</button>
            
//           </div>
          
//         </div>
        
//       )}
//     </Wrapper>
//   );
// };

// export default ProfilePage;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Wrapper from "./ProfilePagecss.js";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get attendee ID from URL
  const location = useLocation();
  const [attendee, setAttendee] = useState(location.state?.attendee || null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    if (!attendee) {
      const fetchAttendee = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`);
          const data = await response.json();
          setAttendee(data);
        } catch (error) {
          console.error("Error fetching attendee details:", error);
        }
      };
      fetchAttendee();
    }
  }, [id, attendee]);

  if (!attendee) {
    return (
      <p style={{ textAlign: "center", marginTop: "20px", fontSize: "20px" }}>
        No attendee data available.
      </p>
    );
  }

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
