import React, { useState, useEffect } from "react";
import Wrapper from "./style";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const UserEngagement = ({ users, events }) => {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("this month");
  const [selectedEvent, setSelectedEvent] = useState("");

  // Function to filter events based on selected time period
  const filterByTimePeriod = (event) => {
    const eventDate = new Date(event.date);
    const currentDate = new Date();

    switch (selectedTimePeriod) {
      case "this month":
        return (
          eventDate.getFullYear() === currentDate.getFullYear() &&
          eventDate.getMonth() === currentDate.getMonth()
        );
      case "last month":
        const lastMonth = new Date();
        lastMonth.setMonth(currentDate.getMonth() - 1);
        return (
          eventDate.getFullYear() === lastMonth.getFullYear() &&
          eventDate.getMonth() === lastMonth.getMonth()
        );
      case "last year":
        return eventDate.getFullYear() === currentDate.getFullYear() - 1;
      default:
        return true;
    }
  };

  // Filter events based on the selected time period
  const filteredEvents = events.filter(filterByTimePeriod);

  // Auto-select the first available event whenever the filteredEvents change
  useEffect(() => {
    if (filteredEvents.length > 0) {
      setSelectedEvent(filteredEvents[0].eventName);
    } else {
      setSelectedEvent(""); // Reset if no events available
    }
  }, [filteredEvents]);

  // Find selected event data
  const selectedEventData = filteredEvents.find(e => e.eventName === selectedEvent);
  const selectedEventID = selectedEventData?.id;

  // Filter users who attended events in the selected time period
  const filteredUsers = selectedEventID
    ? users.filter(user => user.attendEventIDs.includes(selectedEventID))
    : [];

  // Process user engagement data for the graph
  const data = filteredUsers
    .map(user => ({
      name: user.userName,
      connections: user.connection[selectedEventID] || 0,
    }))
    .sort((a, b) => b.connections - a.connections)
    .slice(0, 5)

    const navigate = useNavigate()

    const handleChange = () => {
      navigate(-1)
    }

  return (
    <Wrapper>
      <IoMdArrowRoundBack className='backArrow' onClick={handleChange}/>
      <h2>User Engagement</h2>

      {/* Time Period Filter */}
      <label>Time Period:</label>
      <select value={selectedTimePeriod} onChange={(e) => setSelectedTimePeriod(e.target.value)}>
        <option value="this month">This Month</option>
        <option value="last month">Last Month</option>
        <option value="last year">Last Year</option>
      </select>

      {/* Event Filter (Only events from the selected time period) */}
      <label>Event:</label>
      <select
        value={selectedEvent}
        onChange={(e) => setSelectedEvent(e.target.value)}
        disabled={filteredEvents.length === 0}
      >
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <option key={event.id} value={event.eventName}>
              {event.eventName}
            </option>
          ))
        ) : (
          <option>No Events Available</option>
        )}
      </select>

      {/* Display Graph or No Data Message */}
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" type="category" />
            <YAxis type="number" />
            <Tooltip />
            <Legend />
            <Bar dataKey="connections" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No user engagement data available for the selected event and time period.</p>
      )}
    </Wrapper>
  );
};

export default UserEngagement;
