import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Button } from "@mui/material";
import Wrapper from "./style";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const AttendeeManagement = () => {

  // const REACT_APP_BACKEND_URL = "http://192.168.0.87:5000/api"

  const [attendees, setAttendees] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/stats`)

        const formattedAttendees = response.data.data.map(user => ({
          id: user.user_id,
          name: `${user.first_name} ${user.last_name}`,
          events: user.total_attended_events,
          connections: user.total_connections
        }))

        setAttendees(formattedAttendees);
      }
      catch (error) {
        console.log(`Error in fetching ${error}`)
      }
    }
    fetchData()
  }, [])

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredAttendees = attendees.filter((attendee) =>
    attendee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Wrapper>
      {/* Table Heading */}
      <div className="heading">
        <h2>Attendee Management</h2>
      </div>
      {/* Search Box */}
      <div className="header-container">
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
                      onClick={() => navigate(`/attendeeManagement/profile/${attendee.id}`, {state : {attendee}})}>
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