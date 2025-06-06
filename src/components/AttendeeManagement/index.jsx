import React, { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { Button } from "@mui/material";
import Wrapper from "./style";
import { useNavigate } from "react-router-dom";
import axios from '../AxiosInstance';
import LoadingScreen from "../../modules/loading";

const AttendeeManagement = () => {

  const [attendees, setAttendees] = useState([])
  const [loading, setLoading] = useState(true);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      if (isFirstLoad.current) {
        setLoading(true); // Show loading only on first mount
      }

      try {
        const response = await axios.get(`/users/stats`);

        const formattedAttendees = response.data.data.map(user => ({
          id: user.user_id,
          name: `${user.first_name} ${user.last_name}`,
          events: user.total_attended_events,
          connections: user.total_connections
        }));

        setAttendees(formattedAttendees);
      } catch (error) {
        console.log(`Error in fetching ${error}`);
      } finally {
        if (isFirstLoad.current) {
          setLoading(false);
          isFirstLoad.current = false; // Mark first load complete
        }
      }
    };

    fetchData();
  }, []);


  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredAttendees = attendees.filter((attendee) =>
    attendee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingScreen />;

  return (
    <Wrapper>
      <section className="header-container">
        <h2 className="heading">Attendee Management</h2>
        <div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search attendees..."

              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <FaSearch className="search-icon" />
          </div>
        </div>
      </section>
      <section className="table-container">
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
                      onClick={() => navigate(`/attendeeManagement/profile/${attendee.id}`, { state: { attendee } })}>
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
      </section>
    </Wrapper>
  );
};

export default AttendeeManagement;