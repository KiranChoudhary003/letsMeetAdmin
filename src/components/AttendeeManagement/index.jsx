import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Button } from "@mui/material";
import Wrapper from "./style";
import { useNavigate } from "react-router-dom";



const attendees = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Speaker",
    events: 5,
    connections: 10,
    preference: "Tech Talks",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Attendee",
    events: 3,
    connections: 7,
    preference: "Networking",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    id: 3,
    name: "John Doe",
    email: "john@example.com",
    role: "Speaker",
    events: 5,
    connections: 10,
    preference: "Tech Talks",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 4,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Attendee",
    events: 3,
    connections: 7,
    preference: "Networking",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    id: 5,
    name: "John Doe",
    email: "john@example.com",
    role: "Speaker",
    events: 5,
    connections: 10,
    preference: "Tech Talks",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 6,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Attendee",
    events: 3,
    connections: 7,
    preference: "Networking",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    id: 7,
    name: "John Doe",
    email: "john@example.com",
    role: "Speaker",
    events: 5,
    connections: 10,
    preference: "Tech Talks",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 8,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Attendee",
    events: 3,
    connections: 7,
    preference: "Networking",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    id: 9,
    name: "John Doe",
    email: "john@example.com",
    role: "Speaker",
    events: 5,
    connections: 10,
    preference: "Tech Talks",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 10,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Attendee",
    events: 3,
    connections: 7,
    preference: "Networking",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Speaker",
    events: 5,
    connections: 10,
    preference: "Tech Talks",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Attendee",
    events: 3,
    connections: 7,
    preference: "Networking",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    id: 3,
    name: "John Doe",
    email: "john@example.com",
    role: "Speaker",
    events: 5,
    connections: 10,
    preference: "Tech Talks",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 4,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Attendee",
    events: 3,
    connections: 7,
    preference: "Networking",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    id: 5,
    name: "John Doe",
    email: "john@example.com",
    role: "Speaker",
    events: 5,
    connections: 10,
    preference: "Tech Talks",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 6,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Attendee",
    events: 3,
    connections: 7,
    preference: "Networking",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    id: 7,
    name: "John Doe",
    email: "john@example.com",
    role: "Speaker",
    events: 5,
    connections: 10,
    preference: "Tech Talks",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 8,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Attendee",
    events: 3,
    connections: 7,
    preference: "Networking",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    id: 9,
    name: "John Doe",
    email: "john@example.com",
    role: "Speaker",
    events: 5,
    connections: 10,
    preference: "Tech Talks",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 10,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Attendee",
    events: 3,
    connections: 7,
    preference: "Networking",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg"
  },
 
];
const AttendeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredAttendees = attendees.filter((attendee) =>
    attendee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Wrapper>
     {/* Header Section (Flex Container) */}
<div className="header-container">
  <h2 className="heading">Attendee Management</h2>
  <div className="search-container">
  <div className="search-box">
    <FaSearch className="search-icon" />
    <input
      type="text"
      placeholder="Search attendees..."
      className="search-input"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
  </div>
</div>


      

      {/* Table */}
      <div className="table-container">
        <table className="attendee-table">
          <thead>
            <tr>
              <th>Attendee ID</th>
              <th>Name</th>
              <th>Total Events</th>
              <th>Total Connections</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendees.length > 0 ? (
              filteredAttendees.map((attendee) => (
                <tr key={attendee.id}>
                  <td>{attendee.id}</td>
                  <td>{attendee.name}</td>
                  <td>{attendee.events}</td>
                  <td>{attendee.connections}</td>
                  <td>
                    <Button className="view-profile"
                      onClick={() => navigate(`/profile/${attendee.id}`)}>
                        View Profile</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "14px", color: "#888" }}>
                  No attendees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default AttendeeManagement;
